import {Dimensions} from 'react-native';
import React, {useEffect, useRef, memo} from 'react';

import * as echarts from 'echarts/core';
import {BarChart} from 'echarts/charts';
import {
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from 'echarts/components';
import {SVGRenderer, SkiaChart} from '@wuba/react-native-echarts';
import {EChartsOption} from 'echarts/types/dist/shared';
// import styles from './styles';
import Colors from '@constants/Colors';

echarts.use([
  SVGRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  TitleComponent,
]);
const E_HEIGHT = 300;
const E_WIDTH = Dimensions.get('screen').width;

const BarCharts = (props: any) => {
  const chartInstance = useRef<any>(null);
  const {data, title} = props;
  const skiaRef = useRef<any>(null);

  useEffect(() => {
    const option: EChartsOption = {
      title: {
        text: title || 'Last 7 Days Progress',
        textStyle: {
          color: Colors.base800,
          fontWeight: 'bold',
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'line',
          label: {
            backgroundColor: '#283b56',
          },
        },
        valueFormatter(value) {
          return `${value}%`;
        },
      },

      xAxis: {
        type: 'category',
        data: [...data?.date],
        // name: 'Date',
        // nameLocation: 'middle',
        // nameTextStyle: {
        //   padding: [8, 0, 0, 0],
        //   color: Colors.primary800,
        // },
        axisLabel: {
          formatter(value, _) {
            return `${new Date(value).getDate()}`;
          },
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        type: 'value',
        axisLabel: {
          formatter(value, _) {
            return `${value}%`;
          },
        },
      },
      series: [
        {
          data: [...data?.value],
          type: 'bar',
        },
      ],
    };
    // let chart: any;
    // if (skiaRef.current) {
    // chart = echarts.init(skiaRef.current, 'light', {
    //   renderer: 'canvas',
    //   width: E_WIDTH - 40,
    //   height: E_HEIGHT,
    // });
    //   chart =
    //     echarts.getInstanceByDom(chartRef.current) ||
    //     echarts.init(chartRef.current, 'light', {
    //       height: E_HEIGHT,
    //       width: E_WIDTH - 40,
    //       renderer: 'svg',
    //     });
    //   chart.setOption(option);
    // }
    // return () => chart?.dispose();
    if (skiaRef.current) {
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(skiaRef.current, 'light', {
          renderer: 'svg',
          width: E_WIDTH - 40,
          height: E_HEIGHT,
        });
        chartInstance.current.setOption(option);
      }

      chartInstance.current.setOption(option);
    }
  }, [data?.date, data?.value]);

  return <SkiaChart ref={skiaRef} />;
};

export default memo(BarCharts);
