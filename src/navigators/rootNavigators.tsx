import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {SOCKET_URL} from '@env';

import StackNavigators from './stackNavigators';
import socket from '@/services/socket';
import messaging from '@react-native-firebase/messaging';
import {localNotif} from '@/services/notifications/pushNotification';
import {IDeviceIDBody} from '@/services/api/auth';
import {Auth} from '@/services/api';
import {ShowToast} from '@/helpers';
import {Storage} from '@/services/storage';
import {EStorage} from '@/types';
import {useAppSelector} from '@/redux/hooks';

const RootNavigator = () => {
  const jwtToken = useAppSelector(state => state.account.data.token);

  useEffect(() => {
    // socket.connect();

    socket.on('connect', () => {
      console.log('Socket_Status', 'connected to ' + SOCKET_URL);

      // dispatch(setSocket(socket));
    });

    socket.on('connect_error', err => {
      console.log({socket_error: err}); // prints the message associated with the error
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const updateDeviceId = async (token: string) => {
    try {
      const body: IDeviceIDBody = {
        deviceId: token,
      };
      const res: any = await Auth.updateDeviceId(body);
      console.log({res});
    } catch (error) {
      console.log({error});
      ShowToast.Danger(
        'Failed to update deviceID, you might not get any notification',
      );
    }
  };

  useEffect(() => {
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   console.log({remoteMessageForeground: remoteMessage});
    //   // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //   localNotif({
    //     title: (remoteMessage.data?.title as string) || 'New Notification',
    //     message: (remoteMessage.data?.body as string) || 'New Notification',
    //   });
    // });
    // return unsubscribe;
  }, []);

  useEffect(() => {
    if (jwtToken) {
      messaging()
        .getToken()
        .then(token => {
          if (token) {
            Storage.set(EStorage.DEVICEID, token);
            updateDeviceId(token);
          }
        })
        .catch(err => console.log({err}));
      return messaging().onTokenRefresh(token => {
        updateDeviceId(token);
        console.log({newToken: token});
      });
    }
  }, [jwtToken]);
  return (
    <NavigationContainer>
      <StackNavigators />
    </NavigationContainer>
  );
};

export default RootNavigator;
