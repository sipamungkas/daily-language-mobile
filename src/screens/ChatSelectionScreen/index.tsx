import {SafeAreaView, ScrollView} from 'react-native';
import React from 'react';

import Header from '@components/Header';
import styles from './styles';
import TaskItem from '@components/TaskItem';
import {useNavigation} from '@react-navigation/native';

const chatList = [
  {
    name: 'Text Private Chat',
    screen: 'ChatlistScreen',
    params: {type: 'private'},
  },
  {
    name: 'Text Group Chat',
    screen: 'ChatlistScreen',
    params: {type: 'group'},
  },
  {
    name: 'Speaking Member',
    screen: 'ChatlistScreen',
    params: {type: 'private-voice'},
  },
  {
    name: 'Speak at Group',
    screen: 'ChatlistScreen',
    params: {type: 'group-voice'},
  },
];

const ChatSelectionScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={'Chat Category'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {chatList.map(item => (
          <TaskItem
            key={item.name}
            name={item.name}
            onPress={() => navigation.navigate(item.screen, item.params)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatSelectionScreen;
