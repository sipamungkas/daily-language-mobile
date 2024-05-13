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
    alignItems: 'center',
  },
  userWrapper: {
    flex: 1,
    gap: 12,
    flexDirection: 'row',
  },
  textWrapper: {
    justifyContent: 'space-between',
    paddingVertical: 4,
    flex: 1,
  },
  title: {fontWeight: '600', color: Colors.base800, maxWidth: '80%'},
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
  avatarLine: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
});
