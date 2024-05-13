import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import styles from './styles';
import Icons from '@assets/icons';
import Colors from '@constants/Colors';

type TaskItemProps = {
  name: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

const TaskItem = ({name, onPress}: TaskItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.name}>{name}</Text>
        <Icons.CaretRight fill={Colors.base800} />
      </View>
    </TouchableOpacity>
  );
};

export default TaskItem;
