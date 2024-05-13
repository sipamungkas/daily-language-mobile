import Colors from '@/constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  scrollViewContent: {
    // padding: 16,
    gap: 8,
    paddingBottom: 250,
  },
  item: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  itemChild: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.base300,
    marginBottom: 1,
    borderBottomWidth: 1,
  },
  textItem: {color: Colors.base600},
  texTitemLeft: {color: Colors.base500, maxWidth: '75%'},
  textItemRed: {
    color: Colors.red,
  },
  divider: {
    height: 4,
    width: '100%',
  },
  divider8: {
    height: 8,
    width: '100%',
  },
  avatarText: {
    fontSize: 52,
    padding: 0,
    textTransform: 'capitalize',
  },
  avatarWrapper: {
    backgroundColor: 'white',
    height: 100,
    width: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  avatarLine: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  editText: {
    color: Colors.base600,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 4,
    borderColor: Colors.base500,
    padding: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  btn: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.primary800,
    borderRadius: 100,
    // width: 200,
  },
  btnText: {
    color: Colors.white100,
    textAlign: 'center',
  },
});
