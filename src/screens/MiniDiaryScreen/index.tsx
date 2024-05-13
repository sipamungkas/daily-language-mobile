import {SafeAreaView, ScrollView, Text, TextInput, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Toast, ALERT_TYPE} from 'react-native-alert-notification';
import Header from '@components/Header';
import styles from './styles';
import Button from '@components/Button';
import {Quest, Writing} from '@/services/api';
import {IMDBody} from '@/services/api/reading';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '@/navigators/stackNavigators';
import {EProgress} from '@/types';
import {IProgressBody} from '@/services/api/quest';
import Colors from '@/constants/Colors';
import moment from 'moment';

export type MiniDiaryProps = NativeStackScreenProps<
  StackParamList,
  'MiniDiaryScreen'
>;

export type MDItem = {
  id: string;
  text: string;
  createdAt: string;
};
const MiniDiaryScreen = (props: MiniDiaryProps) => {
  const {navigation} = props;
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [mdList, setMdList] = useState<MDItem[]>([]);

  const countWords = useMemo(() => {
    if (text !== '') {
      const arrayOfText = text.split(' ');
      const filterEmptyString = arrayOfText.filter(word => word !== '');
      return filterEmptyString.length;
    }
    return 0;
  }, [text]);

  const updateProgress = async () => {
    try {
      const body: IProgressBody = {
        type: EProgress.Minidiary,
      };
      await Quest.updateProgress(body);
    } catch (error) {}
  };

  const handleCreateMD = async () => {
    try {
      setIsLoading(true);
      const body: IMDBody = {
        text,
      };
      const res: any = await Writing.createMD(body);
      if (res) {
        setText('');
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Mini diary has been created',
        });
        updateProgress();
        // navigation.goBack();
      }
      setIsLoading(false);
      setTimeout(() => {
        handleGetMD();
      }, 500);
    } catch (error: any) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error.response?.data?.message,
      });
      console.log({error});
      setIsLoading(false);
    }
  };

  const handleGetMD = async () => {
    try {
      const res: any = await Writing.getMD();
      if (res) {
        setMdList(res.data);
      }
    } catch (error) {
      console.log({error});
    }
  };

  useEffect(() => {
    handleGetMD();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Header showBack title="Mini Diary" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.card}>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={e => setText(e)}
            keyboardType="default"
            multiline
            placeholder="Write your diary minimum 100 words"
            editable={mdList.length === 0}
          />
          <Text style={styles.textCounter}>Total Words: {countWords}/100</Text>
        </View>
        <View style={styles.btnWrapper}>
          <Button
            disabled={countWords <= 100 || isLoading || mdList.length > 0}
            isLoading={isLoading}
            title="Submit"
            onPress={handleCreateMD}
          />
        </View>

        <View style={{gap: 8}}>
          {mdList.map(item => (
            <View style={styles.card}>
              <Text style={{color: Colors.base600}} key={item.id}>
                {item.text}
              </Text>
              <Text style={{fontSize: 12, marginTop: 4}}>
                {moment(item.createdAt).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MiniDiaryScreen;
