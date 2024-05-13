import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import HomeScreen from '../screens/Home';
import AddParticipantsScreen from '@screens/ChatServices/AddParticipantsScreen';
import AudioScreen from '@screens/AudioScreen';
import ChatDetailScreen from '@screens/ChatServices/ChatDetailScreen';
import ChatlistScreen from '@screens/ChatServices/ChatlistScreen';
import HomeNavigators from './homeNavigators';
import LoginScreen from '@screens/LoginScreen';
import MiniDiaryScreen from '@screens/MiniDiaryScreen';
import NewsScreen from '@screens/NewsScreen';
import NewsDetailScreen from '@screens/NewsDetailScreen';
import QuotesScreen from '@screens/QuotesScreen';
import QuoteDetailScreen from '@screens/QuoteDetaillScreen';
import RegisterScreen from '@screens/RegisterServices/RegisterScreen';
import SplashScreen from '@screens/SplashScreen';
import TaskListScreen from '@screens/TaskListScreen';
import VideoScreen from '@screens/VideoScreen';
import VoiceRecorderScreen from '@screens/VoiceRecorderScreen';
import YouTubePlayerScreen from '@screens/YouTubePlayerScreen';
import EditProfileScreen from '@/screens/EditProfileScreen';
import GroupNameScreen from '@/screens/ChatServices/GroupNameScreen';
import VideoV2Screen from '@/screens/VideoV2Screen';
import NewsV2Screen from '@/screens/NewsV2Screen';
import ListenASongScreen from '@/screens/ListenASongScreen';

export type StackParamList = {
  AddParticipantsScreen: undefined;
  AudioScreen: undefined;
  ChatDetailScreen: undefined;
  ChatlistScreen: {type: 'private' | 'group' | 'private-voice' | 'group-voice'};
  EditProfileScreen: undefined;
  GroupNameScreen: {
    type: 'private' | 'group' | 'private-voice' | 'group-voice';
    maxUser: number | null;
  };
  HomeNavigators: undefined;
  ListenASongScreen: undefined;
  LoginScreen: undefined;
  MiniDiaryScreen: undefined;
  NewsScreen: undefined;
  NewsV2Screen: undefined;
  NewsDetailScreen: {
    id: string;
    imageUri: string;
    title: string;
    description: string;
  };
  ProfileScreen: {};
  QuotesScreen: undefined;
  QuoteDetailScreen: {
    quote: {id: number | string; urlImage: string};
    header: string;
  };
  RegisterScreen: undefined;
  SplashScreen: undefined;
  TaskListScreen: {
    module: 'writing' | 'speaking' | 'listening' | 'reading';
  };
  TextPrivateChatScreen: undefined;
  TextGruopChatScreen: undefined;
  VideoScreen: undefined;
  VideoV2Screen: undefined;
  VoiceRecorderScreen: undefined;
  VoicePrivateChatScreen: undefined;
  VoiceGroupChatScreen: undefined;
  YouTubePlayerScreen: {title: string; uri: string};
};

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigators = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SplashScreen">
      <Stack.Screen
        name="AddParticipantsScreen"
        component={AddParticipantsScreen}
      />
      <Stack.Screen name="AudioScreen" component={AudioScreen} />
      <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
      <Stack.Screen name="ChatlistScreen" component={ChatlistScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="GroupNameScreen" component={GroupNameScreen} />
      <Stack.Screen name="HomeNavigators" component={HomeNavigators} />
      <Stack.Screen name="ListenASongScreen" component={ListenASongScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MiniDiaryScreen" component={MiniDiaryScreen} />
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
      <Stack.Screen name="NewsV2Screen" component={NewsV2Screen} />
      <Stack.Screen name="NewsDetailScreen" component={NewsDetailScreen} />
      <Stack.Screen name="QuotesScreen" component={QuotesScreen} />
      <Stack.Screen name="QuoteDetailScreen" component={QuoteDetailScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
      <Stack.Screen name="VideoScreen" component={VideoScreen} />
      <Stack.Screen name="VideoV2Screen" component={VideoV2Screen} />
      <Stack.Screen
        name="VoiceRecorderScreen"
        component={VoiceRecorderScreen}
      />
      <Stack.Screen
        name="YouTubePlayerScreen"
        component={YouTubePlayerScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigators;
