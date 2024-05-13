import Colors from '@constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 1,
  },
  addButton: {
    gap: 5,
    alignItems: 'center',
    padding: 2,
    borderRadius: 100,
    backgroundColor: Colors.primary800,
    marginTop: -6,
    shadowColor: Colors.base800,
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  menuContainer: {gap: 5, alignItems: 'center', width: 59},
  menuTitle: {fontSize: 11, fontWeight: '500'},
  menuActiveColor: {color: Colors.primary800},
  menuInActiveColor: {color: Colors.base100},
});
