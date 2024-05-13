import {SafeAreaView, Image, ScrollView, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Header from '@components/Header';
import {StackParamList} from '@navigators/stackNavigators';
import styles from './styles';
import {IProgressBody} from '@/services/api/quest';
import {EProgress} from '@/types';
import {Quest} from '@/services/api';

type QuoteDetailScreenProps = NativeStackScreenProps<
  StackParamList,
  'QuoteDetailScreen'
>;

const screen = Dimensions.get('screen');

const QuoteDetailScreen = (props: QuoteDetailScreenProps) => {
  const {route} = props;
  const {quote, header} = route.params;

  const updateProgress = async () => {
    try {
      const body: IProgressBody = {
        type: EProgress.Quote,
      };
      await Quest.updateProgress(body);
    } catch (error) {}
  };

  useEffect(() => {
    updateProgress();
  }, []);
  return (
    <SafeAreaView>
      <Header showBack title={header} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={{uri: quote.urlImage}}
          height={screen.height - 100}
          width={screen.width - 32}
          resizeMode="contain"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuoteDetailScreen;
