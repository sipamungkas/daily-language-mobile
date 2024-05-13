import Colors from '@constants/Colors';
import {Dimensions, StyleSheet} from 'react-native';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white100,
    elevation: 2,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.base800,
    textTransform: 'capitalize',
    maxWidth: screen.width - 32 - 80,
  },
  arrowAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
