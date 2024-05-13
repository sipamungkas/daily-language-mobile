import {Text, SafeAreaView, Dimensions, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import YoutubeIframe from 'react-native-youtube-iframe';

import Header from '@components/Header';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '@navigators/stackNavigators';
import styles from './styles';
import {IProgressBody} from '@/services/api/quest';
import {EProgress} from '@/types';
import {Quest} from '@/services/api';

type YouTubePlayerScreenProps = NativeStackScreenProps<
  StackParamList,
  'YouTubePlayerScreen'
>;

const width = Dimensions.get('screen').width;

const YouTubePlayerScreen = (props: YouTubePlayerScreenProps) => {
  const {route} = props;
  const {title, uri} = route.params;
  const frameRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const videoId = useMemo(() => {
    return uri.split('=')[1];
  }, [uri]);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      console.log('video has finished playing!');
    }
  }, []);

  const updateProgress = async () => {
    try {
      const body: IProgressBody = {
        type: EProgress.VideoListening,
      };
      await Quest.updateProgress(body);
    } catch (error) {}
  };

  useEffect(() => {
    updateProgress();
  }, []);

  // const togglePlaying = useCallback(() => {
  //   setPlaying(prev => !prev);
  // }, []);
  return (
    <SafeAreaView>
      <Header showBack title="Video Player" />
      <YoutubeIframe
        ref={frameRef}
        height={(9 / 16) * width}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
        onFullScreenChange={status => {
          console.log({status});
        }}
        forceAndroidAutoplay={true}
        onReady={() => setPlaying(true)}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>{title}</Text>
        {/* <TouchableOpacity onPress={togglePlaying}>
          <Text>{playing ? 'pause' : 'play'}</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default YouTubePlayerScreen;
