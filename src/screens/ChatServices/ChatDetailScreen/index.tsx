import {
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Text,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import Header from '@components/Header';
import styles from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icons from '@/assets/icons';
import Colors from '@/constants/Colors';
import {Chat, Quest} from '@/services/api';
import {IBodySendMsg, IBodySendVoiceMsg} from '@/services/api/chats';

import {ShowToast} from '@/helpers';
import socket from '@/services/socket';
import MessageItem, {IMessageItem} from '@/components/MessageItem';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import SoundPlayer from 'react-native-sound-player';
import MessageAudioItem, {
  IMessageAudioItem,
} from '@/components/MessageAudioItem';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {EProgress} from '@/types';
import moment from 'moment';
import {setCount} from '@/redux/slices/progressSlice';
import {IProgressBody} from '@/services/api/quest';

export type IUser = {
  id: string;
  name: string;
  email: string;
  photoProfile: string;
};

const audioRecorderPlayer = new AudioRecorderPlayer();
const ChatDetailScreen = (props: any) => {
  const {title, roomId, type} = props.route.params;
  const navigation = useNavigation<any>();

  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: 'vn.m4a',
    android: `${dirs.DocumentDir}/vn.mp3`,
  });

  const [messages, setMessages] = useState<
    IMessageItem[] | IMessageAudioItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [meta, setMeta] = useState<any>({page: 0, totalPage: 0});
  const [isSending, setIsSending] = useState(false);
  const [text, setText] = useState('');

  // voice
  const [recordSecs, setRecordSecs] = useState<number>(0);
  const [recordTime, setRecordTime] = useState('00:00');
  const [isRecording, setIsRecording] = useState(false);
  const [uri, setUri] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalVnDuration, setTotalVnDuration] = useState<number>();
  const [activeAudio, setActiveAudio] = useState<string>('');

  // pogress
  const count = useAppSelector(state => state.progress.count);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.connect();
    socket.on(`trigger-new-message-mobile:${roomId}`, ({data, message}) => {
      console.log({data, message});
      setMessages(prev => {
        const newState = [data, ...prev];
        return newState;
      });
    });

    return () => {
      socket.off(`trigger-new-message-mobile:${roomId}`);
    };
  }, [roomId]);

  const updateProgress = useCallback(async (key: EProgress) => {
    try {
      console.log('update');
      const body: IProgressBody = {
        type: key,
      };
      await Quest.updateProgress(body);
    } catch (error) {}
  }, []);

  const getMessages = useCallback(
    async (page: number = 1) => {
      const params = {
        page,
        roomId,
      };
      try {
        setIsLoading(true);
        const res: any = await Chat.getMessages(params);
        if (res?.data?.length > 0) {
          if (page === 1) {
            setMessages(res.data);
          } else {
            setMessages(prev => {
              const newState = [...prev, ...res.data];
              return newState;
            });
          }
          setMeta(res.meta);
        }

        setIsLoading(false);
      } catch (error: any) {
        console.log({error});
        setIsLoading(false);
        if (error.response.data.code === 400) {
          ShowToast.Danger('Chat room not found!');
          return navigation.goBack();
        }
      }
    },
    [navigation, roomId],
  );

  const isFocused = useIsFocused();

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getMessages(1);
    setIsRefreshing(false);
  };

  const handleLoadMore = useCallback(() => {
    if (meta.page < meta.totalPage && !isLoading) {
      getMessages(meta.page + 1);
    }
  }, [getMessages, isLoading, meta.page, meta.totalPage]);

  useEffect(() => {
    if (isFocused) {
      getMessages(1);
    }
  }, [getMessages, isFocused]);

  const handleSendChat = useCallback(async () => {
    try {
      if (text.trim().length === 0) {
        ShowToast.Danger('Content can not empty');
        return;
      }
      setIsSending(true);
      const body: IBodySendMsg = {
        roomId,
        content: text.trim(),
      };
      const res: any = await Chat.sendTextMsg(body);

      if (res.code === 201) {
        const newCount = {...(count as any)};
        console.log({newCount1: newCount});
        const date = moment().format('YYYY-MM-DD');
        let key: EProgress = EProgress.ChatMember;
        if (type === 'private') {
          key = EProgress.ChatMember;
        } else if (type === 'group') {
          key = EProgress.ChatGroup;
        } else if (type === 'private-voice') {
          key = EProgress.VoiceMember;
        } else {
          key = EProgress.VoiceGroup;
        }
        console.log({key});
        if (newCount[key] >= 4 && newCount.date === date) {
          newCount[key] = 0;
          updateProgress(key);
        } else if (newCount.date !== date) {
          newCount.date = date;
          newCount[key] = 1;
        } else {
          newCount[key] = newCount[key] + 1;
        }
        dispatch(setCount(newCount));
      }

      setIsSending(false);
      setText('');
    } catch (error: any) {
      ShowToast.Danger(
        error?.response?.data?.message ||
          'Something went wrong, please try again',
      );
      setIsSending(false);
    }
  }, [count, dispatch, roomId, text, type, updateProgress]);

  // voice note func
  useEffect(() => {
    audioRecorderPlayer.setSubscriptionDuration(1);

    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);

  const onStartRecord = async () => {
    setRecordSecs(0);
    setIsRecording(true);
    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };
    const generatedUri = await audioRecorderPlayer.startRecorder(
      path,
      audioSet,
    );
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition / 1000);
      setRecordTime(
        audioRecorderPlayer.mmss(Math.floor(e.currentPosition / 1000)),
      );
      if (e.currentPosition / 1000 > 300) {
        audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();

        // setRecordSecs(0);
        // setUri(result);
        setIsRecording(false);
      }
      // if(e.currentPosition > )
    });
    setUri(generatedUri);
  };
  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    // setRecordSecs(0);
    // setUri(result);
    setIsRecording(false);
    console.log({result});
  };

  const handleSendVN = useCallback(async () => {
    try {
      if (recordSecs === 0) {
        return ShowToast.Danger('Please record a voice!');
      }
      setIsSending(true);
      const formData = new FormData();
      formData.append('file', {
        uri: uri.replace('file:////', 'file:///'), //harusnya file:/// bukan file:////
        name: 'chat-vn.mp3',
        type: 'audio/mpeg',
      });
      formData.append('duration', recordSecs);
      formData.append('roomId', roomId);
      const res: any = await Chat.sendVoiceMsg(formData as IBodySendVoiceMsg);
      if (res.code === 201) {
        const newCount = {...(count as any)};
        console.log({newCount1: newCount});
        const date = moment().format('YYYY-MM-DD');
        let key: EProgress = EProgress.ChatMember;
        if (type === 'private') {
          key = EProgress.ChatMember;
        } else if (type === 'group') {
          key = EProgress.ChatGroup;
        } else if (type === 'private-voice') {
          key = EProgress.VoiceMember;
        } else {
          key = EProgress.VoiceGroup;
        }
        console.log({key});
        if (newCount[key] >= 4 && newCount.date === date) {
          newCount[key] = 0;
          updateProgress(key);
        } else if (newCount.date !== date) {
          newCount.date = date;
          newCount[key] = 1;
        } else {
          newCount[key] = newCount[key] + 1;
        }
        dispatch(setCount(newCount));
      }
      // if (res && recordSecs >= 300000) {
      //   updateProgress({type: EProgress.VoiceNote});
      // }
      console.log({vnRESSS: res});
      // ShowToast.Success('Voice note has been sent');
      setRecordSecs(0);
      setRecordTime('00:00');
      setUri('');
      setIsSending(false);
    } catch (error: any) {
      console.log({error});
      ShowToast.Success(
        error?.response?.data?.message || 'Something went wrong',
      );
      setIsSending(false);
    }
  }, [count, dispatch, recordSecs, roomId, type, updateProgress, uri]);

  const clearPlaying = () => {
    setActiveAudio('');
    setTotalVnDuration(0);
    setIsPlaying(false);
  };

  const playAudio = async (newAudioUrl: string) => {
    if (activeAudio === newAudioUrl) {
      try {
        if (isPlaying) {
          await SoundPlayer.pause(); // Pause the audio if already playing
          setIsPlaying(false);
        } else {
          await SoundPlayer.resume(); // Resume playing the audio if paused
          setIsPlaying(true);
        }
      } catch (error) {
        console.log(
          'Oh no! An error occurred while pausing/resuming audio:',
          error,
        );
      }
    } else {
      try {
        if (isPlaying) {
          await SoundPlayer.stop(); // Stop the currently playing audio
        }
        setActiveAudio(newAudioUrl); // Set the new audio URL
        setIsPlaying(true);
        const soundData = await SoundPlayer.getInfo();
        console.log({soundData});
        setTotalVnDuration(soundData?.duration);
        SoundPlayer.addEventListener('FinishedPlaying', () => {
          setIsPlaying(false); // Reset the playing state when audio finishes playing
          clearPlaying();
        });
        await SoundPlayer.playUrl(newAudioUrl); // Play the new audio
        const audio = await SoundPlayer.getInfo();
        setTotalVnDuration(audio?.duration);
      } catch (error) {
        console.log('Oops! An error occurred while playing audio:', error);
      }
    }
  };

  const stopAudio = async () => {
    try {
      await SoundPlayer.stop();
      setActiveAudio('');
      setIsPlaying(false);
      clearPlaying();
    } catch (error) {
      clearPlaying();
      console.log({stopAudioErr: error});
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header showBack title={title} />
      <FlatList
        style={{paddingTop: 40}}
        inverted
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
        ListEmptyComponent={
          !isLoading ? (
            <Text style={styles.textEmptyChat}>No Chats yet</Text>
          ) : (
            <View />
          )
        }
        data={messages}
        renderItem={({item}) =>
          item.type === 'voice' ? (
            <MessageAudioItem
              showName={type.includes('group')}
              senderName={item.senderName}
              content={item.content}
              createdAt={item.createdAt}
              userId={item.userId}
              onPlay={() => playAudio(item.content)}
              isPlaying={item.content === activeAudio}
              onStop={stopAudio}
              duration={item.duration}
            />
          ) : (
            <MessageItem
              showName={type.includes('group')}
              senderName={item.senderName}
              content={item.content}
              createdAt={item.createdAt}
              userId={item.userId}
            />
          )
        }
      />

      <View style={styles.msgContainer}>
        <View style={styles.msgWrapper}>
          {type.includes('voice') ? (
            <View style={styles.recordInput}>
              <Text>{recordTime}</Text>
              {isRecording ? (
                <Icons.StopFilled
                  onPress={onStopRecord}
                  fill={Colors.red}
                  width={22}
                  height={22}
                  disabled={isSending}
                />
              ) : (
                <Icons.MicrophoneOutline
                  onPress={onStartRecord}
                  stroke={Colors.primary800}
                  width={22}
                  height={22}
                  disabled={isSending}
                />
              )}
            </View>
          ) : (
            <TextInput
              editable={!isSending}
              style={styles.textInput}
              placeholder="Type a message"
              multiline
              onChangeText={e => setText(e)}
              value={text}
            />
          )}

          {isSending ? (
            <ActivityIndicator size="small" color={Colors.primary700} />
          ) : (
            <Icons.PaperAirplaneSolid
              onPress={type.includes('voice') ? handleSendVN : handleSendChat}
              width={24}
              height={24}
              color={Colors.primary800}
              disabled={isRecording}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatDetailScreen;
