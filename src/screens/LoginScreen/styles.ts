import Colors from '@constants/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white100,
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 56,
    // justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    color: Colors.base800,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.base500,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
  },
  titleContainer: {},
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
  },
  inputEmpty: {
    fontWeight: 'normal',
    marginTop: 8,
    padding: 0,
  },
  divider: {
    backgroundColor: Colors.base300,
    height: 1,
    marginVertical: 24,
  },
  footer: {
    gap: 24,
    // position: 'absolute',
    // bottom: 48,
    width: '100%',
    // backgroundColor: 'blue',
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
  registerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  dontHaveAccountText: {
    color: Colors.base800,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  registerText: {
    color: Colors.primary800,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
});
