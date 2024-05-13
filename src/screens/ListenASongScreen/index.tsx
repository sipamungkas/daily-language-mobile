import {
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DatePicker from 'react-native-date-picker';

import Header from '@components/Header';
import Card from '@components/Card';
import {StackParamList} from '@navigators/stackNavigators';
import styles from './styles';
import {Listening, Quest, Reading} from '@/services/api';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import moment from 'moment';
import {ShowToast} from '@/helpers';
import {IBodyCreateNS} from '@/services/api/reading';
import {IProgressBody} from '@/services/api/quest';
import {EProgress} from '@/types';
import {IBodyCreateListeningData} from '@/services/api/listening';

type ListenASongScreenProps = NativeStackScreenProps<
  StackParamList,
  'ListenASongScreen'
>;

const ListenASongScreen = (props: ListenASongScreenProps) => {
  const {navigation} = props;
  const [quoteList, setQuoteList] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({page: 0, totalPage: 0});
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showTimePickerStart, setShowTimePickerStart] = useState(false);
  const [showTimePickerEnd, setShowTimePickerEnd] = useState(false);

  const updateProgress = async () => {
    try {
      const body: IProgressBody = {
        type: EProgress.AudioListening,
      };
      await Quest.updateProgress(body);
    } catch (error) {}
  };

  const getSongList = useCallback(async (page: number, isRefresh = false) => {
    try {
      const res: any = await Listening.getAudioList();
      if (res.code === 200) {
        if (isRefresh) {
          setQuoteList(res.data);
        } else {
          setQuoteList(prev => {
            const newState = [...prev, ...res.data];
            return newState;
          });
        }
        setMeta(res.meta);
      }
    } catch (error) {
      console.log({error});
    }
  }, []);

  useEffect(() => {
    getSongList(1, true);
  }, [getSongList]);

  const handleLoadMore = useCallback(() => {
    if (meta.page < meta.totalPage && !isLoading) {
      getSongList(meta.page + 1);
    }
  }, [getSongList, isLoading, meta.page, meta.totalPage]);

  const handleSubmit = useCallback(async () => {
    const start = moment(startTime);
    const end = moment(endTime);
    if (url.length <= 1) {
      return ShowToast.Danger('Url can not empty!');
    }
    if (start >= end) {
      return ShowToast.Danger('End Time must be greater than start time!');
    }

    try {
      setIsLoading(true);
      const body: IBodyCreateListeningData = {
        url,
        startTime: moment(startTime).format('HH:mm'),
        endTime: moment(endTime).format('HH:mm'),
        type: 'audio',
      };
      const res: any = await Listening.createListeningData(body);
      if (res.code === 201) {
        ShowToast.Success('Data has been saved!');
        setUrl('');
        setStartTime(new Date());
        setEndTime(new Date());
        updateProgress();
      }
      getSongList(1, true);
    } catch (error: any) {
      console.log({error});
      ShowToast.Danger(
        error.response?.data?.message || 'Something went wrong!',
      );
    } finally {
      setIsLoading(false);
    }
  }, [endTime, getSongList, startTime, url]);

  return (
    <SafeAreaView>
      <Header showBack title="Listen A Song" />
      <View style={styles.card}>
        <View>
          <Text style={[styles.label, styles.mrb12]}>URL</Text>
          <TextInput
            style={styles.textInput}
            value={url}
            onChangeText={e => setUrl(e)}
            keyboardType="default"
            placeholder="Plese Input Url"
            editable={quoteList.length === 0}
          />
        </View>
        <View style={{gap: 12, marginTop: 16}}>
          <TouchableOpacity
            disabled={quoteList.length > 0}
            onPress={() => {
              setShowTimePickerStart(true);
            }}>
            <View style={styles.timeWrapper}>
              <Text style={[styles.label, styles.w20]}>Start Time</Text>
              <Text style={styles.timeInput}>
                {moment(startTime).format('HH:mm')}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={quoteList.length > 0}
            onPress={() => {
              setShowTimePickerEnd(true);
            }}>
            <View style={styles.timeWrapper}>
              <Text style={[styles.label, styles.w20]}>End Time</Text>
              <Text style={styles.timeInput}>
                {moment(endTime).format('HH:mm')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnWrapper}>
        <Button
          disabled={isLoading || url.length < 1 || quoteList.length > 0}
          isLoading={isLoading}
          title="Submit"
          onPress={handleSubmit}
        />
      </View>

      <FlatList
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary500} />
          ) : (
            <View />
          )
        }
        onEndReachedThreshold={0.3}
        onEndReached={handleLoadMore}
        contentContainerStyle={styles.scrollViewContent}
        data={quoteList}
        renderItem={({item}) => (
          <Card onPress={() => {}}>
            <View style={styles.timeWrapper}>
              <Text style={[styles.label, styles.w20]}>Url</Text>
              <Text style={styles.url}>{item.url}</Text>
            </View>

            <View style={styles.timeWrapper}>
              <Text style={[styles.label, styles.w20]}>Start Time</Text>
              <Text style={styles.timeInput}>{item.startTime}</Text>
            </View>
            <View style={styles.timeWrapper}>
              <Text style={[styles.label, styles.w20]}>End Time</Text>
              <Text style={styles.timeInput}>{item.endTime}</Text>
            </View>
          </Card>
        )}
      />

      <DatePicker
        onConfirm={date => {
          setStartTime(date);
          setShowTimePickerStart(false);
        }}
        onCancel={() => {
          setShowTimePickerStart(false);
        }}
        title="Start Time"
        modal
        open={showTimePickerStart}
        textColor="black"
        mode="time"
        locale="id"
        date={startTime}
        onDateChange={setStartTime}
      />

      <DatePicker
        onConfirm={date => {
          setEndTime(date);
          setShowTimePickerEnd(false);
        }}
        onCancel={() => {
          setShowTimePickerEnd(false);
        }}
        title="End Time"
        modal
        open={showTimePickerEnd}
        textColor="black"
        mode="time"
        locale="id"
        date={startTime}
        onDateChange={setStartTime}
      />
    </SafeAreaView>
  );
};

export default ListenASongScreen;
