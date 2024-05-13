import Colors from '@constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  screen: {flex: 1, backgroundColor: Colors.white100},
  container: {
    // height: '100%',
    padding: 32,
    // justifyContent: 'space-between',
  },
  topContainer: {
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnToLogin: {
    padding: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  btnToLoginText: {
    color: Colors.primary800,
    fontWeight: '700',
    // lineHeight: 16,
    fontSize: 12,
    marginTop: -1,
  },
  title: {
    color: Colors.base800,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.base500,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
  },
  formContainer: {
    borderWidth: 1,
    borderColor: Colors.base300,
    padding: 24,
    borderRadius: 20,
    marginVertical: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    color: Colors.base500,
  },
  input: {
    marginTop: 8,
    fontWeight: '600',
    padding: 0,
    color: Colors.base800,
  },
  inputEmpty: {
    margin: 0,
    fontWeight: 'normal',
    marginTop: 8,
    padding: 0,
  },
  divider: {
    backgroundColor: Colors.base300,
    height: 1,
    marginVertical: 24,
  },
  notTextInput: {
    marginLeft: 0,
    color: Colors.base400,
  },
  btn: {
    alignSelf: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: Colors.primary800,
    borderRadius: 100,
    width: 200,
  },
  btnText: {
    color: Colors.white100,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
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
});
