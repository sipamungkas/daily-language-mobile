import Colors from '@constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  screen: {flex: 1},
  scrollViewContent: {
    padding: 16,
    gap: 8,
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
});
