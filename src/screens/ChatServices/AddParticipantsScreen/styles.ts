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
  inputBox: {
    elevation: 2,
    zIndex: 2,
    marginHorizontal: 16,
    paddingHorizontal: 8,
    marginBottom: 8,
    marginTop: 16,
    backgroundColor: Colors.white100,
    borderRadius: 8,
  },
  groupName: {
    paddingHorizontal: 16,
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.base800,
  },
  groupNameInput: {
    fontSize: 14,
  },
});
