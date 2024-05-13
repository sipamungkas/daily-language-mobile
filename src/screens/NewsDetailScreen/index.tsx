import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {FadeIn} from 'react-native-reanimated';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '@navigators/stackNavigators';
import styles from './styles';
import Icons from '@assets/icons';
import Colors from '@constants/Colors';
import {Quest} from '@/services/api';
import {IProgressBody} from '@/services/api/quest';
import {EProgress} from '@/types';

type NewsDetailScreenProps = NativeStackScreenProps<
  StackParamList,
  'NewsDetailScreen'
>;

const NewsDetailScreen = ({route, navigation}: NewsDetailScreenProps) => {
  const {id, imageUri, title, description} = route.params;

  const updateProgress = async () => {
    try {
      const body: IProgressBody = {
        type: EProgress.News,
      };
      await Quest.updateProgress(body);
    } catch (error) {}
  };

  useEffect(() => {
    updateProgress();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Animated.Image
          style={styles.image}
          source={{uri: imageUri}}
          sharedTransitionTag={id}
        />
        <Animated.View
          entering={FadeIn.delay(200).duration(1000)}
          style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons.CaretLeft fill={Colors.white100} />
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text>{description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetailScreen;
