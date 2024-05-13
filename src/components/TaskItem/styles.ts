import Colors from '@constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    backgroundColor: Colors.white100,
    borderRadius: 8,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {fontSize: 14, fontWeight: '700', color: Colors.base800},
});
