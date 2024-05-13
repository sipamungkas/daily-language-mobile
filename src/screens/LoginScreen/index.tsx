import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './styles';
import Icons from '@assets/icons';
import Colors from '@constants/Colors';
import {StackParamList} from '@navigators/stackNavigators';
import {Auth, Profile} from '@/services/api';
import {ILoginBody} from '@/services/api/auth';
import {Storage} from '@/services/storage';
import {EStorage} from '@/types';
import {useAppDispatch} from '@/redux/hooks';
import {setToken, setUser} from '@/redux/slices/accountSlice';
import Button from '@/components/Button';
import {ShowToast} from '@helpers/index';

type LoginScreenProps = NativeStackScreenProps<StackParamList, 'LoginScreen'>;

const LoginScreen = (props: LoginScreenProps) => {
  const {navigation} = props;
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [isLoding, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleGetUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const res: any = await Profile.user();
      if (res.code === 200) {
        Storage.set(EStorage.USER, JSON.stringify(res.data));
        dispatch(setUser(res.data));
        navigation.navigate('HomeNavigators');
      }
      ShowToast.Success('Login Success');
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log({error});
      Storage.delete(EStorage.TOKEN);
      if (error?.response?.data?.code === 401) {
        ShowToast.Danger('Your account need to be approved by Admin');
      } else {
        ShowToast.Danger(
          error?.response?.data?.message ||
            'Something went wrong, please try again',
        );
      }
    }
  }, [dispatch, navigation]);

  const handleLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      const body: ILoginBody = {
        email,
        password: pass,
        role: 'user',
      };
      const res: any = await Auth.login(body);
      if (res) {
        Storage.set(EStorage.TOKEN, res.data?.token);
        dispatch(setToken(res.data?.token));
        handleGetUser();
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log({error});
      setIsLoading(false);
      Storage.delete(EStorage.TOKEN);
      ShowToast.Danger(
        error?.response?.data?.message ||
          'Something went wrong, please try again',
      );
    }
  }, [dispatch, email, handleGetUser, pass]);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login in to Daily Language</Text>
          <Text style={styles.subtitle}>
            Please enter your information to login
          </Text>
        </View>
        <View style={styles.formContainer}>
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
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={pass}
                onChangeText={e => setPass(e)}
                secureTextEntry={true}
                style={pass ? styles.input : styles.inputEmpty}
                placeholder="Input your password"
                placeholderTextColor={Colors.base400}
              />
            </View>
            <Icons.LockClose />
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            isLoading={isLoding}
            title="Login now"
            onPress={handleLogin}
          />

          <View style={styles.registerWrapper}>
            <Text style={styles.dontHaveAccountText}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
