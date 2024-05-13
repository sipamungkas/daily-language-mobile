import Header from '@components/Header';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text, ScrollView, Platform} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';

import Button from '@components/Button';
import styles from './styles';
import RNFetchBlob from 'rn-fetch-blob';
import {Voice} from '@/services/api';
import {ShowToast} from '@/helpers';
import {updateProgress} from '@/services/api/quest';
import {EProgress} from '@/types';

const audioRecorderPlayer = new AudioRecorderPlayer();

const VoiceRecorderScreen = () => {
  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: 'vn.m4a',
    android: `${dirs.DocumentDir}/vn.mp3`,
  });
  const [isPaused, setIsPaused] = useState(false);
  const [recordSecs, setRecordSecs] = useState<number>(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [isLoading, setIsLoading] = useState(false);
  const [uri, setUri] = useState('');
  //   const audioRecorderPlayer = useMemo(() => {
  //     const arp = new AudioRecorderPlayer();
  //     return arp;
  //   }, []);

  useEffect(() => {
    audioRecorderPlayer.setSubscriptionDuration(0.09);

    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);

  const onStartRecord = async () => {
    setRecordSecs(0);
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
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      // if(e.currentPosition > )
    });
    setUri(generatedUri);
  };

  const onPauseRecord = async () => {
    setIsPaused(true);
    await audioRecorderPlayer.pauseRecorder();
  };

  const onResumeRecord = async () => {
    setIsPaused(false);
    await audioRecorderPlayer.resumeRecorder();
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    // setRecordSecs(0);
    // setUri(result);
    console.log({result});
  };

  const onStartPlay = async e => {
    console.log('onStartPlay');

    const msg = await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.setVolume(1.0);

    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.currentPosition === e.duration) {
        console.log('finished');
        audioRecorderPlayer.stopPlayer();
      }

      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      console.log({duration: e.duration});
    });
  };

  const onPausePlay = async e => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async e => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const handleSendVN = useCallback(async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', {
        uri: uri.replace('file:////', 'file:///'), //harusnya file:/// bukan file:////
        name: 'vn.mp3',
        type: 'audio/mpeg',
      });
      formData.append('duration', Math.round(recordSecs / 1000));
      const res: any = await Voice.sendAudio(formData);

      updateProgress({type: EProgress.VoiceNote});

      ShowToast.Success('Voice note has been sent');
      setRecordSecs(0);
      setRecordTime('00:00:00');
      setPlayTime('00:00:00');
      setDuration('00:00:00');
      setCurrentPositionSec(0);
      setCurrentDurationSec(0);
      setUri('');
      setIsLoading(false);
    } catch (error: any) {
      console.log({error});
      ShowToast.Success(
        error?.response?.data?.message || 'Something went wrong',
      );
      setIsLoading(false);
    }
  }, [recordSecs, uri]);

  return (
    <SafeAreaView style={styles.screen}>
      <Header showBack title={'Real Speak'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={{textAlign: 'center'}}>{recordTime}</Text>
        <Button title="Start Record" onPress={onStartRecord} />
        <Button
          title={`${isPaused ? 'Resume' : 'Pause'} Record`}
          onPress={isPaused ? onResumeRecord : onPauseRecord}
        />
        <Button title="Stop Record" onPress={onStopRecord} />
        <Text style={{textAlign: 'center'}}>
          {playTime}/{duration}
        </Text>

        <Button title="Start Play" onPress={onStartPlay} />
        <Button title="Pause Play" onPress={onPausePlay} />
        <Button title="Stop Play" onPress={onStopPlay} />
        <Text style={{textAlign: 'center'}}>
          Send voice note with more than 15 minutes to complete your daily task
        </Text>
        <Button
          title="Send"
          onPress={handleSendVN}
          disabled={isLoading || recordSecs <= 300000 * 3}
          isLoading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default VoiceRecorderScreen;
