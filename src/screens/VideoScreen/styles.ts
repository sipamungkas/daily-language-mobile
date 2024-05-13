import Colors from '@constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.white100,
  },
  flatlistContent: {padding: 16, gap: 8, paddingBottom: 250},
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.base700,
  },
});
