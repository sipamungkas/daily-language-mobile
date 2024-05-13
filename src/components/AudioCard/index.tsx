import {
  View,
  Text,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import styles from './styles';

import Icons from '@assets/icons';
import Colors from '@constants/Colors';
import {secondsToHHMMSS} from '@helpers/datetime';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

type AudioCardProps = {
  title: string;
  duration: number;
  isPlaying: boolean;
  onPlay: ((event: GestureResponderEvent) => void) | undefined;
  onPause: ((event: GestureResponderEvent) => void) | undefined;
  onStop: ((event: GestureResponderEvent) => void) | undefined;
};

const AudioCard = ({
  title,
  duration = 0,
  isPlaying,
  onPlay,
  onPause,
}: AudioCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <Text style={styles.audioTitle}>{title}</Text>
        <Text style={styles.duration}>
          Duration {secondsToHHMMSS(duration)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {isPlaying ? (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPause}>
              <Icons.Pause fill={Colors.base800} height={24} width={24} />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPlay}>
              <Icons.Play fill={Colors.base800} height={24} width={24} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default AudioCard;
