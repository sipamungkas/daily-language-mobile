import Colors from '@constants/Colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.white100,
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
  },
});

export default styles;
