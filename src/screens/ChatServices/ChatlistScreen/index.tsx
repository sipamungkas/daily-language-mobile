import {
  SafeAreaView,
  FlatList,
  View,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import Header from '@components/Header';
import styles from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ChatItem from '@/components/ChatItem';
import Icons from '@/assets/icons';
import Colors from '@/constants/Colors';
import {Chat} from '@/services/api';
import {IBodyDeleteRoom, IListChatParams} from '@/services/api/chats';
import ReactNativeModal from 'react-native-modal';
import {ShowToast} from '@/helpers';

export type ChatItemProps = {
  id: string;
  name: string;
  updatedAt: string;
  member: [
    {
      userId: string;
      user: {
        name: string;
      };
    },
  ];
};

const ChatlistScreen = (props: any) => {
  const {type} = props.route.params;

  const navigation = useNavigation<any>();
  const [chatList, setChatList] = useState<ChatItemProps[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [roomId, setRoomId] = useState('');

  const getListChat = useCallback(async (params: IListChatParams) => {
    try {
      setIsLoading(true);
      const res: any = await Chat.getListchat(params);
      if (res.code === 200) {
        setChatList(res.data);
      }

      setIsLoading(false);
    } catch (error) {
      console.log({error});
      setIsLoading(false);
    }
  }, []);

  const isFocused = useIsFocused();

  const onRefresh = async () => {
    const params: IListChatParams = {
      search: '',
      type,
    };
    setIsRefreshing(true);
    await getListChat(params);
    setIsRefreshing(false);
  };

  useEffect(() => {
    console.log({isFocused});
    if (isFocused) {
      const params: IListChatParams = {
        search: '',
        type,
      };
      getListChat(params);
    }
  }, [getListChat, isFocused, type]);

  const getName = useCallback((member: any[]) => {
    if (member?.length === 1) {
      const nameList = [];
      nameList.push(member[0].user.name);
      return nameList.join();
    } else {
      const membersName = member?.map((item: any) => item.user.name);
      return (
        membersName?.map((item: any) => item.split(' ')[0]).join(', ') || ''
      );
    }
  }, []);

  const handleGoToChatRoom = (_roomId: string, title: string) => {
    navigation.navigate('ChatDetailScreen', {roomId: _roomId, title, type});
  };

  const handleDeleteChat = async (_roomId: string) => {
    try {
      const body: IBodyDeleteRoom = {
        roomId: _roomId,
      };

      const res: any = await Chat.deleteRoom(body);
      if (res.code === 200) {
        ShowToast.Success('Delete chat success!');
        onRefresh();
      }
    } catch (error: any) {
      console.log({error});
      ShowToast.Danger('Failed to delete chat!');
    } finally {
      setModalDelete(false);
    }
  };

  const handleShowDeleteModal = (_roomId: string) => {
    setRoomId(_roomId);
    setModalDelete(true);
  };

  const handleHideDeleteModal = () => {
    setModalDelete(false);
    setRoomId('');
  };

  const handleAddParticipantScreen = useCallback(() => {
    if (type.includes('group')) {
      return navigation.navigate('GroupNameScreen', {
        maxUser: type.includes('private') ? 1 : null,
        type,
      });
    }
    navigation.navigate('AddParticipantsScreen', {
      maxUser: type.includes('private') ? 1 : null,
      type,
    });
  }, [navigation, type]);

  return (
    <SafeAreaView style={styles.screen}>
      <Header showBack title="Chats" />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          isLoading && !isRefreshing ? (
            <ActivityIndicator size="large" color={Colors.primary800} />
          ) : (
            <View />
          )
        }
        ListEmptyComponent={
          !isLoading ? (
            <Text style={styles.textEmptyChat}>No Chats yet</Text>
          ) : (
            <View />
          )
        }
        contentContainerStyle={styles.scrollViewContent}
        data={chatList}
        renderItem={({item}) => (
          <ChatItem
            handleDelete={() => handleShowDeleteModal(item.id)}
            name={type.includes('group') ? item.name : getName(item.member)}
            datetime={item.updatedAt}
            onPress={() =>
              handleGoToChatRoom(
                item.id,
                type.includes('group') ? item.name : getName(item.member),
              )
            }
          />
        )}
      />

      <View style={styles.fabContainer}>
        <Pressable onPress={handleAddParticipantScreen}>
          <Icons.ChatBubblesBottomCenter
            fill={Colors.white70}
            width={28}
            height={28}
          />
        </Pressable>
      </View>
      <ReactNativeModal
        backdropOpacity={0.3}
        onBackdropPress={handleHideDeleteModal}
        onBackButtonPress={handleHideDeleteModal}
        onSwipeComplete={handleHideDeleteModal}
        swipeDirection="down"
        style={styles.modalContainer}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        isVisible={modalDelete}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Chat</Text>
          <Text style={styles.modalSubtitle}>
            Are you sure you want to delete this chat?
          </Text>
          <Text style={styles.modalSubtitle}>
            All chat will be deleted from all user in this chat.
          </Text>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              style={styles.btnDanger}
              onPress={() => handleDeleteChat(roomId)}>
              <Text style={styles.btnTextDanger}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnOutline}
              onPress={handleHideDeleteModal}>
              <Text style={styles.btnOutlineText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default ChatlistScreen;
