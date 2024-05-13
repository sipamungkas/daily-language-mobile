import Colors from '@/constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white100,
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  textWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 4,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    color: Colors.base800,
    maxWidth: '80%',
    textTransform: 'capitalize',
  },
  time: {fontSize: 12, maxWidth: '80%'},
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
  box: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
