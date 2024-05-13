import React from 'react';
import {Text, View, GestureResponderEvent} from 'react-native';
import moment from 'moment';

import styles from './styles';
import {useAppSelector} from '@/redux/hooks';
import Colors from '@/constants/Colors';
import Icons from '@/assets/icons';

export type IMessageAudioItem = {
  userId: string;
  senderName: string;
  content: string;
  createdAt: string;
  showName?: boolean;
  onStop: (event: GestureResponderEvent) => void;
  onPlay: (event: GestureResponderEvent) => void;
  isPlaying: boolean;
  duration: number;
};

const MessageAudioItem = ({
  senderName,
  content,
  createdAt,
  showName,
  userId,
  onStop,
  onPlay,
  isPlaying,
  duration,
}: IMessageAudioItem) => {
  const myId = useAppSelector(state => state.account.data.user.id);

  return (
    <View
      style={[
        styles.container,
        myId !== userId ? styles.chatPositionLeft : styles.chatPositionRight,
        myId === userId && {
          backgroundColor: Colors.primary400,
        },
      ]}>
      <View style={styles.textWrapper}>
        {showName && (
          <Text numberOfLines={1} style={styles.name}>
            {senderName}
          </Text>
        )}

        <View style={styles.contentWrapper}>
          <Icons.MicrophoneOutline
            stroke={Colors.base600}
            fill={Colors.base600}
            width={12}
            height={12}
          />
          <View style={styles.iconWrapper} />
          {isPlaying ? (
            <Icons.StopFilled
              onPress={onStop}
              fill={Colors.base600}
              width={16}
              height={16}
            />
          ) : (
            <Icons.Play
              onPress={onPlay}
              fill={Colors.base600}
              width={16}
              height={16}
            />
          )}
        </View>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.time}>
          {moment.utc(duration * 1000).format('mm:ss')}
        </Text>
        <Text style={styles.time}>
          {createdAt && moment(createdAt).fromNow()}
        </Text>
      </View>
    </View>
  );
};

export default MessageAudioItem;
