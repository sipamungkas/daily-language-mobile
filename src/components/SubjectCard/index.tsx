import {View, Text, Animated, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '@navigators/stackNavigators';

type SubjectCardProps = {
  title: string;
  color: string;
  progress: number;
};

type NavigationProps = NativeStackScreenProps<
  StackParamList,
  'HomeNavigators'
>['navigation'];

const SubjectCard = ({title, color, progress}: SubjectCardProps) => {
  const navigation: NavigationProps = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('TaskListScreen', {module: title as any})
      }>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>You completed {progress}%</Text>
        <Animated.View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: `${progress}%`,
                backgroundColor: color,
              },
            ]}
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default SubjectCard;
