import {
  Text,
  ActivityIndicator,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import Header from '@components/Header';
import styles from './styles';
import {Quest} from '@/services/api';
import Colors from '@/constants/Colors';
// import {HomeTabParamsList} from '@/navigators/homeNavigators';
import Icons from '@/assets/icons';

import {useIsFocused} from '@react-navigation/native';

import moment from 'moment';
import {IRangeDate} from '@/services/api/quest';
import BarCharts from '@/components/BarCharts';
import Modal from 'react-native-modal';

const months = moment.months();
const year = moment().format('YYYY');
const monthsAndYear = months.map((m, i) => {
  return {
    value: `${year}-${i + 1}`,
    date: `${m} ${year}`,
  };
});

const HistoryScreen = () => {
  // const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(monthsAndYear[0]);

  const [chartData, setChartData] = useState({});

  const [modalFilter, setModalFilter] = useState(false);

  const getLastWeekStats = useCallback(async () => {
    try {
      setIsLoading(true);

      let _endDate = moment().endOf('D').format('YYYY-MM-DD');
      if (
        moment(filter.value).format('YYYY-MM') !== moment().format('YYYY-MM')
      ) {
        _endDate = moment(filter.value).endOf('month').format('YYYY-MM-DD');
      }
      const _startDate = moment(filter.value)
        .startOf('month')
        .format('YYYY-MM-DD');
      const params: IRangeDate = {
        endDate: _endDate,
        startDate: _startDate,
      };

      console.info({params, val: filter.value});

      const res: any = await Quest.getRangeStats(params);
      console.log({res});
      if (res) {
        setChartData(res.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log({error});
      setIsLoading(false);
    }
  }, [filter.value]);

  const isFocused = useIsFocused();

  useEffect(() => {
    // getTodayStats();
    getLastWeekStats();
  }, [getLastWeekStats, isFocused]);

  const parsedChartData = useMemo(() => {
    const dateList = Object.keys(chartData);
    const valueList = Object.values(chartData);
    const parsedValue = valueList.map((val: any) => val.total);
    return {date: dateList, value: parsedValue};
  }, [chartData]);

  const onSelectFilter = (item: any) => {
    setFilter(item);
    setModalFilter(false);
  };

  const percentage = useMemo(() => {
    const data = Object.values(chartData).map((val: any) => val.total);
    const keys = Object.keys(chartData);
    let sum = 0;
    for (let e of data) {
      sum += e as number;
    }
    let length = data.length;
    if (moment(keys[0]).format('YYYY-MM') === moment().format('YYYY-MM')) {
      length = Number(moment().endOf('D').format('D'));
    }
    return !sum ? sum : (sum / length).toFixed(2);
  }, [chartData]);

  return (
    <SafeAreaView>
      <Header title="History Stats" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.subTitleWrapper}>
          <Text style={styles.subTitle}>Filter: {filter.date}</Text>
          <TouchableOpacity
            style={styles.btnSm}
            onPress={() => setModalFilter(true)}>
            <Text style={styles.btnTextSm}>Select Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.subTitle}>{filter.date} Progress</Text>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>
        <View style={styles.barChartWrapper}>
          <BarCharts data={parsedChartData} title="One Month Progress" />
        </View>
        {isLoading && (
          <ActivityIndicator size="large" color={Colors.primary800} />
        )}
      </ScrollView>

      <Modal
        backdropOpacity={0.3}
        onBackdropPress={() => setModalFilter(false)}
        onBackButtonPress={() => setModalFilter(false)}
        onSwipeComplete={() => setModalFilter(false)}
        swipeDirection="down"
        style={styles.modalContainer}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        isVisible={modalFilter}>
        <View style={styles.modalContent}>
          <View style={styles.modalCalendarTitleWrapper}>
            <Text style={styles.modalTitle}>Select Filter</Text>
            <TouchableOpacity onPress={() => setModalFilter(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View>
            {/* {dateFilter.map(item => (
              <TouchableOpacity
                key={item.text}
                style={styles.filterWrapper}
                onPress={() => onSelectFilter(item)}>
                <Text style={styles.filterTitem}>{item.text}</Text>
                <View
                  style={[
                    styles.box,
                    {
                      backgroundColor:
                        item.startDate === filter.startDate
                          ? Colors.primary800
                          : Colors.white100,
                    },
                  ]}>
                  {item.startDate === filter.startDate && (
                    <Icons.Check
                      color={Colors.white100}
                      width={16}
                      height={16}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))} */}
            {monthsAndYear.map(item => (
              <TouchableOpacity
                key={item.value}
                style={styles.filterWrapper}
                onPress={() => onSelectFilter(item)}
                disabled={moment(item.value) > moment()}>
                <Text
                  style={[
                    styles.filterTitem,
                    moment(item.value) > moment() && {color: Colors.base400},
                  ]}>
                  {item.date}
                </Text>
                <View
                  style={[
                    styles.box,
                    {
                      backgroundColor:
                        item.value === filter.value
                          ? Colors.primary800
                          : Colors.white100,
                    },
                  ]}>
                  {item.value === filter.value && (
                    <Icons.Check
                      color={Colors.white100}
                      width={16}
                      height={16}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HistoryScreen;
