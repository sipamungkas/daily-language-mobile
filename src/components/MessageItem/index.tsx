import React from 'react';
import {Text, View} from 'react-native';
import moment from 'moment';

import styles from './styles';
import {useAppSelector} from '@/redux/hooks';
import Colors from '@/constants/Colors';

export type IMessageItem = {
  userId: string;
  senderName: string;
  content: string;
  createdAt: string;
  showName?: boolean;
  type?: 'voice' | 'text';
};

const MessageItem = ({
  senderName,
  content,
  createdAt,
  showName,
  userId,
}: IMessageItem) => {
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
        <Text style={styles.content}>{content}</Text>
      </View>
      <Text style={styles.time}>
        {createdAt && moment(createdAt).fromNow()}
      </Text>
    </View>
  );
};

export default MessageItem;
