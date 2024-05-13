import {
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import {useFocusEffect} from '@react-navigation/native';

import Header from '@components/Header';
import styles from './styles';
import {musiclibrary} from '@constants/data';
import {QueueInitialTracksService, SetupService} from '../../services';
import AudioCard from '@components/AudioCard';
import {Listening, Quest} from '@/services/api';
import {IProgressBody} from '@/services/api/quest';
import {EProgress} from '@/types';

function useSetupPlayer() {
  const [playerReady, setPlayerReady] = useState<boolean>(false);
  const [audioList, setAudioList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAudiolist = useCallback(async () => {
    try {
      setIsLoading(true);
      const res: any = await Listening.getAudioList();
      console.log({res});
      if (res) {
        setAudioList(res.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log({error});
    }
  }, []);

  useEffect(() => {
    getAudiolist();
  }, [getAudiolist]);

  useEffect(() => {
    let unmounted = false;
    if (audioList.length > 0) {
      (async () => {
        await SetupService();
        if (unmounted) return;
        setPlayerReady(true);
        const queue = await TrackPlayer.getQueue();
        if (unmounted) return;
        if (queue.length <= 0) {
          await QueueInitialTracksService(audioList);
        }
      })();
    } else {
      setPlayerReady(false);
    }
    console.log({audioList});
    return () => {
      unmounted = true;
    };
  }, [audioList]);
  return {playerReady, audioList};
}

const AudioScreen = () => {
  const audioPlayer = useSetupPlayer();
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const _currentTrack = await TrackPlayer.getCurrentTrack();

      setCurrentTrack(_currentTrack);
      const {title, duration} = track || {};
      console.log({track, currentTrack, title, duration});
    }
  });

  useTrackPlayerEvents([Event.PlaybackState], async event => {
    console.log({event: event.state});
    if (event.state === ('playing' as any)) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  });

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        stop();
      };
    }, []),
  );

  const updateProgress = async () => {
    try {
      const body: IProgressBody = {
        type: EProgress.AudioListening,
      };
      await Quest.updateProgress(body);
    } catch (error) {}
  };

  const playIndex = async (index: number) => {
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
    updateProgress();
  };
  const stop = async () => await TrackPlayer.reset();
  const pause = async () => await TrackPlayer.pause();

  // if (!audioPlayer.playerReady) {
  //   return (
  //     <SafeAreaView>
  //       <ActivityIndicator />
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView>
      <Header showBack title="Listening" />
      <View style={styles.audioListContainer}>
        {!audioPlayer.playerReady && audioPlayer.audioList.length > 0 && (
          <ActivityIndicator />
        )}
        {audioPlayer.audioList.length === 0 && (
          <Text style={{textAlign: 'center'}}>No listening for today</Text>
        )}
        {audioPlayer.playerReady && (
          <FlatList
            contentContainerStyle={styles.flatlistContent}
            data={audioPlayer.audioList}
            renderItem={({item, index}) => (
              <AudioCard
                title={item.title}
                isPlaying={index === currentTrack && isPlaying}
                onPlay={() => playIndex(index)}
                onPause={pause}
                onStop={stop}
                duration={item.duration}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AudioScreen;
