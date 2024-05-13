import {View, TouchableOpacity, GestureResponderEvent} from 'react-native';
import React, {PropsWithChildren} from 'react';
import styles from './styles';

type CardProps = PropsWithChildren<{
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  elevation?: number;
}>;

const Card = (props: CardProps) => {
  const {children, onPress, elevation = 0} = props;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.card, {elevation}]}>{children}</View>
    </TouchableOpacity>
  );
};

export default Card;
