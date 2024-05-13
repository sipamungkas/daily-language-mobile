import {Image, Platform, SafeAreaView, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import RNPermissions, {
  PERMISSIONS,
  check,
  RESULTS,
  request,
} from 'react-native-permissions';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {StackParamList} from '@navigators/stackNavigators';

import images from '@assets/images';
import styles from './styles';
import {Storage} from '@/services/storage';
import {EStorage} from '@/types';
import {useAppDispatch} from '@/redux/hooks';
import {setToken, setUser} from '@/redux/slices/accountSlice';
import {setCount} from '@/redux/slices/progressSlice';

export type SplashScreenProps = NativeStackScreenProps<
  StackParamList,
  'SplashScreen'
>;

const SplashScreen = (props: SplashScreenProps) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();

  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        ]);

        RNPermissions.check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO)
          .then(s => console.log({s}))
          .catch(e => console.log({e}));

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_MEDIA_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');

          return;
        }
      } catch (err) {
        console.warn(err);

        return;
      }
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  useEffect(() => {
    const token = Storage.getString(EStorage.TOKEN);
    const user = Storage.getString(EStorage.USER);
    const count = Storage.getString(EStorage.COUNT);
    if (token && user) {
      dispatch(setToken(token));
      dispatch(setUser(JSON.parse(user)));
      if (count) {
        dispatch(setCount(JSON.parse(count)));
      }
      return navigation.replace('HomeNavigators');
    }
    navigation.replace('LoginScreen');
  }, [dispatch, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={images.logo} />
    </SafeAreaView>
  );
};

export default SplashScreen;
