import {SafeAreaView, ScrollView} from 'react-native';
import React from 'react';

import Header from '@components/Header';
import styles from './styles';
import TaskItem from '@components/TaskItem';
import {useNavigation} from '@react-navigation/native';

const chatList = [
  {name: 'Text Private Chat', screen: 'TextPrivateChatScreen'},
  {name: 'Text Group Chat', screen: 'TextPrivateChatScreen'},
  {name: 'Voice Private Chat', screen: 'TextPrivateChatScreen'},
  {name: 'Voice Group Chat', screen: 'TextPrivateChatScreen'},
];

const ChatSelectionScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.screen}>
      <Header showBack title={'Chat Category'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {chatList.map(item => (
          <TaskItem
            key={item.name}
            name={item.name}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatSelectionScreen;
