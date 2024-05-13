import Colors from '@constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  btn: {
    alignSelf: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: Colors.primary800,
    borderRadius: 100,
    width: 200,
  },
  btnDisabled: {
    backgroundColor: Colors.base400,
  },
  btnText: {
    color: Colors.white100,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
  },
});
