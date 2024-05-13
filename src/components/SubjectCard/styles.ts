import Colors from '@constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: Colors.white100,
    padding: 12,
    flex: 1,
  },
  cardTitle: {
    color: Colors.base800,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  cardSubtitle: {
    color: Colors.base500,
    marginBottom: 8,
    fontSize: 12,
  },
  progressBarBackground: {
    width: '100%',
    backgroundColor: Colors.base300,
    height: 8,
    borderRadius: 8,
  },
  progressBar: {height: 8, borderRadius: 8},
});
