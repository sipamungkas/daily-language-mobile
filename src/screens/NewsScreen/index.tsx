import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import NewsItem from '@components/NewsItem';
import styles from './styles';
import Header from '@components/Header';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '@navigators/stackNavigators';
import {Reading} from '@/services/api';
import Colors from '@/constants/Colors';

type NewsScreenProps = NativeStackScreenProps<StackParamList, 'NewsScreen'>;

const NewsScreen = ({navigation}: NewsScreenProps) => {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({page: 0, totalPage: 0});
  const [isLoading, setIsLoading] = useState(false);

  const getNewsList = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const res: any = await Reading.newsList(page);
      if (res?.data?.length > 0) {
        if (page === 1) {
          setNewsList(res.data);
        } else {
          setNewsList(prev => {
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
    getNewsList(1);
  }, [getNewsList]);

  const handleLoadMore = useCallback(() => {
    if (meta.page < meta.totalPage && !isLoading) {
      getNewsList(meta.page + 1);
    }
  }, [getNewsList, isLoading, meta.page, meta.totalPage]);

  return (
    <SafeAreaView>
      <Header showBack title="News List" />
      <FlatList
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary500} />
          ) : (
            <View />
          )
        }
        ListEmptyComponent={
          <Text style={{textAlign: 'center'}}>No News/Article for today</Text>
        }
        onEndReachedThreshold={0.3}
        onEndReached={handleLoadMore}
        data={newsList}
        contentContainerStyle={styles.flatlistContent}
        renderItem={({item}) => (
          <NewsItem
            id={item.id}
            onPress={() =>
              navigation.navigate('NewsDetailScreen', {
                imageUri: item.url,
                id: item.id,
                title: item.title,
                description: item.description,
              })
            }
            title={item.title}
            image={item.url}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default NewsScreen;
