import Colors from '@/constants/Colors';
import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  screen: {flex: 1},
  scrollViewContent: {
    padding: 16,
    gap: 8,
    paddingBottom: 250,
  },
  fabContainer: {
    backgroundColor: Colors.primary800,
    position: 'absolute',
    bottom: 40,
    right: 30,
    elevation: 1,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
  },
  createText: {
    color: Colors.primary800,
    fontWeight: '600',
  },
  msgContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Colors.base300,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  msgWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    gap: 6,
  },
  textInput: {
    backgroundColor: Colors.white100,
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 4,
    maxHeight: 64,
  },
  textEmptyChat: {
    textAlign: 'center',
  },
  recordInput: {
    backgroundColor: Colors.white100,
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 8,
    maxHeight: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
