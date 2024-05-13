import Colors from '@constants/Colors';
import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('screen').width;

export default StyleSheet.create({
  card: {borderRadius: 8, padding: 8, backgroundColor: Colors.white100, gap: 8},
  title: {
    fontSize: 16,
    color: Colors.base800,
    fontWeight: '600',
  },
  image: {
    width: width - 32 - 16,
    height: ((width - 32) * 2) / 5,
    borderRadius: 16,
  },
});
