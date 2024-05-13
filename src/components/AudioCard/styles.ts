import Colors from '@constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: Colors.white100,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    gap: 8,
  },
  audioTitle: {
    fontWeight: '700',
    color: Colors.base800,
  },
  duration: {
    fontSize: 12,
    color: Colors.base400,
  },
  playerContainer: {
    marginTop: 12,
    borderTopColor: Colors.base300,
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
