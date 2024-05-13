import Colors from '@constants/Colors';
import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('screen').width;

export default StyleSheet.create({
  container: {backgroundColor: Colors.white100, flex: 1},
  image: {
    width: width,
    height: (width * 2) / 5,
    resizeMode: 'cover',
  },
  header: {
    width: '100%',
    position: 'absolute',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 16,
    paddingLeft: 16,
    // backgroundColor: Colors.base600,
    // w-full absolute flex-row justify-between items-center pt-14
  },
  content: {
    padding: 16,
    gap: 16,
  },
  title: {color: Colors.base800, fontSize: 16, fontWeight: '600'},
});
