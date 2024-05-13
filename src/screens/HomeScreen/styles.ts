import Colors from '@constants/Colors';
import {Dimensions, StyleSheet} from 'react-native';

const dimensions = Dimensions.get('screen');

export default StyleSheet.create({
  screen: {flex: 1},
  notificationWrapper: {position: 'relative'},
  bellRedCircle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: Colors.red,
    position: 'absolute',
    top: 3,
    right: 2,
  },
  scrollViewContent: {
    padding: 16,
  },
  avgProgressContainer: {
    backgroundColor: Colors.white100,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  avgTitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.base500,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    // lineHeight: 12,
    marginBottom: 12,
  },
  avgPercentageText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.base800,
    letterSpacing: -0.32,
  },
  subjectCardContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  barChartWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white100,
    borderRadius: 16,
    paddingLeft: 16,
    marginTop: 16,
    paddingTop: 16,
  },
  sayHello: {
    marginBottom: 8,
    color: Colors.base600,
    fontWeight: '500',
    maxWidth: dimensions.width / 2 - 32,
  },
});
