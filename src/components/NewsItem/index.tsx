import {View, Text, GestureResponderEvent, Pressable} from 'react-native';
import React from 'react';
import styles from './styles';
import Animated from 'react-native-reanimated';

type NewsItemProps = {
  id: string;
  image: string;
  title: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

const NewsItem = ({image, title, onPress, id}: NewsItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Animated.Image
          sharedTransitionTag={id}
          style={styles.image}
          source={{uri: image}}
          resizeMode="cover"
        />
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export default NewsItem;
