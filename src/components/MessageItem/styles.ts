import Colors from '@/constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white100,
    // flexDirection: 'row',
    // gap: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    width: '80%',
  },
  chatPositionRight: {
    alignSelf: 'flex-end',
  },
  chatPositionLeft: {
    alignSelf: 'flex-start',
  },
  textWrapper: {
    justifyContent: 'space-between',
    // paddingVertical: 4,
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.base800,
    maxWidth: '80%',
    marginBottom: 4,
  },
  content: {color: Colors.base700, maxWidth: '80%'},
  time: {fontSize: 10, maxWidth: '80%', alignSelf: 'flex-end'},
  avatarText: {
    fontSize: 24,
    padding: 0,
    textTransform: 'capitalize',
  },
  avatarWrapper: {
    backgroundColor: Colors.primary100,
    height: 52,
    width: 52,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLine: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
});
