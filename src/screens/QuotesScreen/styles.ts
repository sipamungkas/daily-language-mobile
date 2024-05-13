import Colors from '@/constants/Colors';
import {StyleSheet, Dimensions} from 'react-native';

const dimensions = Dimensions.get('screen');
export default StyleSheet.create({
  scrollViewContent: {
    padding: 16,
    gap: 8,
    paddingBottom: 600,
  },
  card: {borderRadius: 8, padding: 24, backgroundColor: Colors.white100},
  textInput: {
    backgroundColor: Colors.white100,
    borderWidth: 1,
    borderColor: Colors.base300,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  textCounter: {
    textAlign: 'left',
    marginTop: 8,
    fontSize: 12,
  },
  btnWrapper: {
    marginTop: 12,
  },
  label: {
    color: Colors.base700,

    paddingLeft: 2,
  },
  mrb12: {marginBottom: 12},
  timeWrapper: {flexDirection: 'row', gap: 16},
  w20: {
    maxWidth: 200,
    width: (dimensions.width * 20) / 100,
  },
  url: {
    color: Colors.base700,
    fontWeight: '600',
    marginBottom: 12,
    width: dimensions.width / 1.6,
  },
  timeInput: {
    color: Colors.base600,
  },
});
