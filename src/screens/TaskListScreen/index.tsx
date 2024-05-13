import {SafeAreaView, ScrollView} from 'react-native';
import React, {useMemo} from 'react';

import Header from '@components/Header';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '@navigators/stackNavigators';
import TaskItem from '@components/TaskItem';

type TaskListScreenProps = NativeStackScreenProps<
  StackParamList,
  'TaskListScreen'
>;

const TaskListScreen = (props: TaskListScreenProps) => {
  const {module} = props.route.params;
  const {navigation} = props;

  const taskList = useMemo(
    () => [
      {
        module: 'writing',
        name: 'Mini Diary',
        onPress: () => navigation.navigate('MiniDiaryScreen'),
      },
      {
        module: 'writing',
        name: 'Chatting Group',
        onPress: () => navigation.navigate('ChatlistScreen', {type: 'group'}),
      },
      {
        module: 'writing',
        name: 'Chatting Member',
        onPress: () => navigation.navigate('ChatlistScreen', {type: 'private'}),
      },
      {
        module: 'listening',
        name: 'Listen A Song',
        onPress: () => navigation.navigate('ListenASongScreen'),
      },
      {
        module: 'listening',
        name: 'Watching Youtube',
        onPress: () => navigation.navigate('VideoV2Screen'),
      },
      {
        module: 'speaking',
        name: 'Real Speak',
        onPress: () => navigation.navigate('VoiceRecorderScreen'),
      },
      {
        module: 'speaking',
        name: 'Speaking at Group',
        onPress: () =>
          navigation.navigate('ChatlistScreen', {type: 'group-voice'}),
      },
      {
        module: 'speaking',
        name: 'Speaking Member',
        onPress: () =>
          navigation.navigate('ChatlistScreen', {type: 'private-voice'}),
      },
      {
        module: 'reading',
        name: 'News/Article',
        onPress: () => navigation.navigate('NewsV2Screen'),
      },
      {
        module: 'reading',
        name: 'Native Socmed',
        onPress: () => navigation.navigate('QuotesScreen'),
      },
      // {
      //   module: 'reading',
      //   name: 'Quote',
      //   onPress: () => navigation.navigate('QuotesScreen'),
      // },
    ],
    [navigation],
  );
  return (
    <SafeAreaView style={styles.screen}>
      <Header showBack title={module} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {taskList
          .filter(task => task.module === module)
          .map(item => (
            <TaskItem key={item.name} name={item.name} onPress={item.onPress} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskListScreen;
