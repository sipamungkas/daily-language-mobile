import {
  View,
  Text,
  // TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';

import Header from '@components/Header';
// import Icons from '@assets/icons';
import styles from './styles';
import Colors from '@constants/Colors';
import SubjectCard from '@components/SubjectCard';
import {Quest} from '@/services/api';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {IRangeDate} from '@/services/api/quest';
import BarCharts from '@/components/BarCharts';
import {useAppSelector} from '@/redux/hooks';

// type HomeScreenProps = BottomTabScreenProps<HomeTabParamsList, 'HomeScreen'>;

const data = [
  {
    title: 'writing',
    progress: 80,
    color: Colors.secondary500,
  },
  {title: 'speaking', progress: 20, color: Colors.yellow},
  {title: 'listening', progress: 75, color: Colors.pink},
  {title: 'reading', progress: 90, color: Colors.primary800},
];

const HomeScreen = () => {
  const width = Dimensions.get('screen').width;
  // home history chat profile
  const circularProps = {
    activeStrokeWidth: 8,
    inActiveStrokeWidth: 8,
    inActiveStrokeOpacity: 0.2,
  };

  const user = useAppSelector(state => state.account.data.user);

  const [todayStats, setTodayStats] = useState({
    total: 0,
    reading: 0,
    listening: 0,
    speaking: 0,
    writing: 0,
  });
  const [chartData, setChartData] = useState({});

  const getTodayStats = async () => {
    try {
      const date = new Date().toJSON().split('T')[0];
      const res: any = await Quest.getTodayStats(date);
      if (res) {
        setTodayStats(res.data);
      }
    } catch (error) {
      console.log({error});
    }
  };

  const getLastWeekStats = async () => {
    try {
      const endDate = moment().format('YYYY-MM-DD');
      const startDate = moment().subtract(6, 'days').format('YYYY-MM-DD');
      const params: IRangeDate = {
        endDate,
        startDate,
      };

      const res: any = await Quest.getRangeStats(params);
      if (res) {
        setChartData(res.data);
      }
    } catch (error) {
      console.log({error});
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    getTodayStats();
    getLastWeekStats();
  }, [isFocused]);

  const parsedChartData = useMemo(() => {
    const dateList = Object.keys(chartData);
    const valueList = Object.values(chartData);
    const parsedValue = valueList.map((val: any) => val.total);
    return {date: dateList, value: parsedValue};
  }, [chartData]);

  // chart
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Dashboard" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.avgProgressContainer}>
          <View>
            <Text numberOfLines={1} style={styles.sayHello}>
              Hi, {user.name}
            </Text>
            <Text style={styles.avgTitleText}>Today Average Progress</Text>
            <Text style={styles.avgPercentageText}>{todayStats.total}%</Text>
          </View>
          <CircularProgressBase
            {...circularProps}
            radius={45}
            value={todayStats.writing}
            activeStrokeColor={data[0].color}
            inActiveStrokeColor={data[0].color}>
            <CircularProgressBase
              {...circularProps}
              radius={35}
              value={todayStats.speaking}
              activeStrokeColor={data[1].color}
              inActiveStrokeColor={data[1].color}>
              <CircularProgressBase
                {...circularProps}
                radius={25}
                value={todayStats.listening}
                activeStrokeColor={data[2].color}
                inActiveStrokeColor={data[2].color}>
                <CircularProgressBase
                  {...circularProps}
                  radius={15}
                  value={todayStats.reading}
                  activeStrokeColor={data[3].color}
                  inActiveStrokeColor={data[3].color}
                />
              </CircularProgressBase>
            </CircularProgressBase>
          </CircularProgressBase>
        </View>
        <View style={styles.subjectCardContainer}>
          {data.map(item => (
            <View key={item.title} style={{width: width / 2 - 16 - 8}}>
              <SubjectCard
                title={item.title}
                progress={todayStats[item.title]}
                color={item.color}
              />
            </View>
          ))}
        </View>
        <View style={styles.barChartWrapper}>
          <BarCharts data={parsedChartData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
