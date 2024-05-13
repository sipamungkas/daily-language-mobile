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
  textEmptyChat: {
    textAlign: 'center',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalCalendarTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: Colors.base800,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 24,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 200,
  },
  modalDivider: {
    backgroundColor: Colors.base300,
    height: 1,
    marginVertical: 12,
  },
  modalSelectItem: {
    color: Colors.base800,
  },
  btnWrapper: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  btnDanger: {
    padding: 8,
    // backgroundColor: Colors.primary800,
    borderRadius: 100,
    width: 120,
    borderWidth: 1,
    borderColor: Colors.red,
  },
  btnTextDanger: {
    color: Colors.red,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
  },
  btnOutline: {
    padding: 8,
    backgroundColor: Colors.white100,
    borderRadius: 100,
    width: 120,
  },
  btnOutlineText: {
    color: Colors.base600,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
  },
  modalSubtitle: {fontSize: 14, color: Colors.base600},
});
