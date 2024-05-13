import React from 'react';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';

import styles from './styles';
import Icons from '@/assets/icons';
import Colors from '@/constants/Colors';

export type Props = {
  datetime?: string;
  name: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  handleDelete: ((event: GestureResponderEvent) => void) | undefined;
};

const ChatItem = (props: Props) => {
  const {name, datetime, onPress, handleDelete} = props;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.userWrapper}>
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatarText}>{name[0]}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text numberOfLines={1} style={styles.title}>
              {name}
            </Text>
            <Text style={styles.time}>
              {datetime && moment(datetime).fromNow()}
            </Text>
          </View>
        </View>
        <Icons.Trash
          onPress={handleDelete}
          width={24}
          height={24}
          color={Colors.red}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
