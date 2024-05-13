import Colors from '@constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  scrollViewContent: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
  },
  quoteWrapper: {gap: 12, padding: 8},
  quoteText: {
    color: Colors.base700,
    fontWeight: '500',
    lineHeight: 16,
  },
  author: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: Colors.base500,
  },
});
