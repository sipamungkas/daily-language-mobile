import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Modal from 'react-native-modal';

import styles from './styles';
import Icons from '@assets/icons';
import Colors from '@constants/Colors';
import {StackParamList} from '@navigators/stackNavigators';
import DatePicker from 'react-native-date-picker';
import {ShowToast} from '@/helpers';
import {Auth} from '@/services/api';
import {IRegisterBody} from '@/services/api/auth';
import Button from '@/components/Button';
import {Storage} from '@/services/storage';
import {EStorage} from '@/types';

export type RegisterScreenProps = NativeStackScreenProps<
  StackParamList,
  'RegisterScreen'
>;

const RegisterScreen = (props: RegisterScreenProps) => {
  const {navigation} = props;
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [dob, setDob] = useState(new Date('2000'));
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [modalGender, setModalGender] = useState<boolean>(false);
  const [modalCalendar, setModalCalendar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectGender = (_gender: typeof gender) => {
    setModalGender(false);
    setGender(_gender);
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const body: IRegisterBody = {
        name,
        email,
        password: pass,
        dateOfBirth: dob.toJSON().split('T')[0],
        gender,
      };
      const res: any = await Auth.register(body);
      console.log({res});
      ShowToast.Success(
        'Register Success \nPlease wait until your account is approved by the admin',
      );
      navigation.goBack();
      // ShowToast.Success('Login Success');
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log({error});
      if (Storage.getString(EStorage.TOKEN)) {
        Storage.delete(EStorage.TOKEN);
      }
      ShowToast.Danger(
        error?.response?.data?.message ||
          'Something went wrong, please try again',
      );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <Icons.LockCircleCloseFilled fill={Colors.primary800} />
          <TouchableOpacity
            style={styles.btnToLogin}
            onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.btnToLoginText}>Login</Text>
            <Icons.CaretRight
              width={16}
              height={16}
              color={Colors.primary800}
              fill={Colors.primary800}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Registration</Text>
        <Text style={styles.subtitle}>
          Please fill your information to register
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Your name</Text>
              <TextInput
                value={name}
                onChangeText={e => setName(e)}
                style={name ? styles.input : styles.inputEmpty}
                keyboardType="email-address"
                placeholder="Input your name address"
                placeholderTextColor={Colors.base400}
              />
            </View>
            <Icons.PersonOutline fill={Colors.base800} />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={e => setEmail(e)}
                style={email ? styles.input : styles.inputEmpty}
                keyboardType="email-address"
                placeholder="Input your email address"
                placeholderTextColor={Colors.base400}
              />
            </View>
            <Icons.Envelope />
          </View>
          <View style={styles.divider} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.row}
            onPress={() => setModalCalendar(true)}>
            <View>
              <Text style={styles.label}>Date of birth</Text>
              <Text
                style={[
                  styles.notTextInput,
                  dob ? styles.input : styles.inputEmpty,
                ]}>
                {dob.toLocaleString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                }) || 'Choose your date of birth'}
              </Text>
            </View>
            <Icons.CaretRight fill={Colors.base800} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            onPress={() => setModalGender(true)}
            activeOpacity={0.8}
            style={styles.row}>
            <View>
              <Text style={styles.label}>Gender</Text>
              <Text
                style={[
                  styles.notTextInput,
                  gender ? styles.input : styles.inputEmpty,
                ]}>
                {gender || 'Choose your gender'}
              </Text>
            </View>
            <Icons.CaretRight fill={Colors.base800} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={pass}
                onChangeText={e => setPass(e)}
                style={pass ? styles.input : styles.inputEmpty}
                placeholder="Input your password"
                placeholderTextColor={Colors.base400}
                secureTextEntry={true}
              />
            </View>
            <Icons.LockClose />
          </View>
        </View>
        <Button
          isLoading={isLoading}
          onPress={handleRegister}
          title="Register now"
          disabled={!name || !email || !dob || !gender || !pass || isLoading}
        />
      </ScrollView>
      <Modal
        backdropOpacity={0.3}
        onBackdropPress={() => setModalGender(false)}
        onBackButtonPress={() => setModalGender(false)}
        onSwipeComplete={() => setModalGender(false)}
        swipeDirection="down"
        style={styles.modalContainer}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        isVisible={modalGender}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select your gender</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.row}
            onPress={() => selectGender('male')}>
            <Text style={styles.modalSelectItem}>Male</Text>
            <Icons.CaretRight fill={Colors.base800} />
          </TouchableOpacity>
          <View style={styles.modalDivider} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.row}
            onPress={() => selectGender('female')}>
            <Text style={styles.modalSelectItem}>Female</Text>
            <Icons.CaretRight fill={Colors.base800} />
          </TouchableOpacity>
          <View style={styles.modalDivider} />
        </View>
      </Modal>
      <Modal
        backdropOpacity={0.3}
        onBackdropPress={() => setModalCalendar(false)}
        onBackButtonPress={() => setModalCalendar(false)}
        onSwipeComplete={() => setModalCalendar(false)}
        swipeDirection="down"
        style={styles.modalContainer}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        isVisible={modalCalendar}>
        <View style={styles.modalContent}>
          <View style={styles.modalCalendarTitleWrapper}>
            <Text style={styles.modalTitle}>Date of birth</Text>
            <TouchableOpacity onPress={() => setModalCalendar(false)}>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            textColor="black"
            mode="date"
            date={dob}
            onDateChange={setDob}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RegisterScreen;
