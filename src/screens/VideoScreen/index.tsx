import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import styles from './styles';
import Header from '@components/Header';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '@navigators/stackNavigators';
import {Listening} from '@/services/api';
import Colors from '@/constants/Colors';

type VideoScreenProps = NativeStackScreenProps<StackParamList, 'VideoScreen'>;
const VideoScreen = (props: VideoScreenProps) => {
  const {navigation} = props;

  const [videoList, setVideoList] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({page: 0, totalPage: 0});
  const [isLoading, setIsLoading] = useState(false);

  const getVideoList = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const res: any = await Listening.getVideoList(page);
      if (res?.data?.length > 0) {
        if (page === 1) {
          setVideoList(res.data);
        } else {
          setVideoList(prev => {
            const newState = [...prev, ...res.data];
            return newState;
          });
        }
        setMeta(res.meta);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log({error});
    }
  }, []);

  useEffect(() => {
    getVideoList(1);
  }, [getVideoList]);

  const handleLoadMore = useCallback(() => {
    if (meta.page < meta.totalPage && !isLoading) {
      getVideoList(meta.page + 1);
    }
  }, [getVideoList, isLoading, meta.page, meta.totalPage]);

  return (
    <SafeAreaView>
      <Header showBack title="Listening Youtube" />
      <FlatList
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        contentContainerStyle={styles.flatlistContent}
        data={videoList}
        ListEmptyComponent={
          <Text style={{textAlign: 'center'}}>No Video for today</Text>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('YouTubePlayerScreen', {
                title: item.title,
                uri: item.url,
              })
            }>
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary500} />
          ) : (
            <View />
          )
        }
      />
    </SafeAreaView>
  );
};

export default VideoScreen;
