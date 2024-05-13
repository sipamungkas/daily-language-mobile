import Colors from '@/constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  scrollViewContent: {
    padding: 16,
    gap: 8,
    paddingBottom: 250,
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
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalCalendarTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: Colors.base800,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 24,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 200,
  },
  modalDivider: {
    backgroundColor: Colors.base300,
    height: 1,
    marginVertical: 12,
  },
  modalSelectItem: {
    color: Colors.base800,
  },
  filterWrapper: {
    padding: 8,
    borderBottomColor: Colors.base300,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterTitem: {color: Colors.base600},
  box: {
    borderRadius: 24,
    width: 24,
    height: 24,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitleWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSm: {
    backgroundColor: Colors.primary800,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  btnTextSm: {
    fontSize: 12,
    color: Colors.white100,
  },
  subTitle: {
    fontWeight: '500',
    color: Colors.base800,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white100,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  percentage: {
    color: Colors.base800,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
