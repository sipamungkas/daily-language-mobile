import {
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import Header from '@components/Header';
import styles from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import Colors from '@/constants/Colors';
import {Chat} from '@/services/api';
import {ICreateGroupChat, ICreatePrivateChat} from '@/services/api/chats';
import UserItem from '@/components/UserItem';
import {ShowToast} from '@/helpers';

export type IUser = {
  id: string;
  name: string;
  email: string;
  photoProfile: string;
};

const AddParticipantsScreen = (props: any) => {
  const {maxUser, type, groupName} = props.route.params;
  const navigation = useNavigation<any>();
  const [userList, setUserList] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [meta, setMeta] = useState<any>({page: 0, totalPage: 0});
  const [selectedUser, setSelectedUser] = useState<string[]>([]);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const getUserList = useCallback(
    async (page: number = 1, search: string, isRefresh = false) => {
      const params = {
        page,
        search,
      };
      try {
        setIsLoading(true);
        const res: any = await Chat.getUserList(params);
        console.log({res});
        if (isRefresh) {
          setUserList(res.data);
        } else {
          setUserList(prev => {
            const newState = [...prev, ...res.data];
            return newState;
          });
        }
        setMeta(res.meta);
      } catch (error) {
        console.log({error});
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const isFocused = useIsFocused();

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getUserList(1, '');
    setIsRefreshing(false);
  };

  const handleLoadMore = useCallback(() => {
    if (meta.page < meta.totalPage && !isLoading) {
      getUserList(meta.page + 1, searchText);
    }
  }, [getUserList, isLoading, meta.page, meta.totalPage, searchText]);

  const handleAddUser = useCallback(
    (id: string) => {
      if (!selectedUser.includes(id)) {
        if (maxUser && selectedUser.length >= maxUser) {
          return;
        }
        setSelectedUser(prev => {
          const newState = [...prev, id];
          return newState;
        });
      } else {
        setSelectedUser(prev => {
          const newState = prev.filter(_id => _id !== id);
          return newState;
        });
      }
    },
    [maxUser, selectedUser],
  );

  useEffect(() => {
    const timeInterval = setTimeout(() => {
      if (isFocused) {
        getUserList(1, searchText, true);
      }
    }, 500);

    return () => {
      clearInterval(timeInterval);
    };
    // getUserList(1, '');
  }, [getUserList, isFocused, searchText]);

  const handleCreateChatRoom = useCallback(async () => {
    try {
      if (type.includes('group') && !groupName) {
        return ShowToast.Danger('Group name can not empty!');
      }
      if (selectedUser.length < 1) {
        return ShowToast.Danger('Please select at least 1 user');
      }
      setIsCreateLoading(true);
      let body: ICreatePrivateChat | ICreateGroupChat;
      if (type.includes('private')) {
        body = {
          type,
          memberId: selectedUser[0],
        };
      } else {
        body = {
          type,
          memberId: selectedUser.join(','),
          name: groupName,
        };
      }

      const res: any = await Chat.createChatRoom(body);
      if (res) {
      }
      ShowToast.Success('Success Create Chat');
      setTimeout(() => {
        navigation.pop(2);
      }, 1000);
      setIsCreateLoading(false);
    } catch (error: any) {
      ShowToast.Danger(
        error?.response?.data?.message ||
          'Something went wrong, please try again',
      );
      setIsCreateLoading(false);
    }
  }, [groupName, navigation, selectedUser, type]);

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        showBack
        title="List User"
        rightIcon={
          <TouchableOpacity
            onPress={handleCreateChatRoom}
            disabled={isCreateLoading}>
            {isCreateLoading ? (
              <ActivityIndicator size="small" color={Colors.primary800} />
            ) : (
              <Text style={styles.createText}>Create</Text>
            )}
          </TouchableOpacity>
        }
      />
      {type.includes('group') && (
        <Text style={styles.groupName}>Group name: {groupName}</Text>
      )}
      <View style={[styles.inputBox, {elevation: 1}]}>
        <TextInput
          autoFocus={true}
          style={styles.groupNameInput}
          placeholder="Search user"
          value={searchText}
          onChangeText={e => setSearchText(e)}
        />
      </View>
      <FlatList
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
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
        contentContainerStyle={styles.scrollViewContent}
        data={userList}
        renderItem={({item}) => (
          <UserItem
            name={item.name}
            isChecked={selectedUser.includes(item.id)}
            handleAddUser={() => handleAddUser(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={{textAlign: 'center'}}>No User found</Text>
        }
      />

      {/* <View style={styles.fabContainer}>
        <Pressable onPress={() => alert('tes')}>
          <Icons.ChatBubblesBottomCenter
            fill={Colors.white70}
            width={28}
            height={28}
          />
        </Pressable>
      </View> */}
    </SafeAreaView>
  );
};

export default AddParticipantsScreen;
