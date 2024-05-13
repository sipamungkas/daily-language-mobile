import {
  Text,
  FlatList,
  ActivityIndicator,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import Header from '@components/Header';
import styles from './styles';
import {Auth} from '@/services/api';
import Colors from '@/constants/Colors';
// import {HomeTabParamsList} from '@/navigators/homeNavigators';
import Icons from '@/assets/icons';
import {Storage} from '@/services/storage';
import {EStorage} from '@/types';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ShowToast} from '@/helpers';
import {useAppSelector} from '@/redux/hooks';
import ReactNativeModal from 'react-native-modal';
import {IBodyChangePass} from '@/services/api/auth';

// type ProfileScreenProps = BottomTabNavigationProp<
//   HomeTabParamsList,
//   'ProfileScreen'
// >;

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [modalChangePass, setModalChangePass] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [reNewPass, setReNewPass] = useState('');

  const user = useAppSelector(state => state.account.data.user);

  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      const res: any = await Auth.logout();
      if (res?.code === 200) {
        Storage.clearAll();
      }
      setIsLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        }),
      );
      ShowToast.Success('Logout success');
    } catch (error) {
      setIsLoading(false);
      console.log({error});
      Storage.delete(EStorage.TOKEN);
      Storage.delete(EStorage.USER);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        }),
      );
      ShowToast.Success('Logout success');
    }
  }, [navigation]);

  const handleChangePass = useCallback(async () => {
    try {
      if (!oldPass || !newPass || !reNewPass) {
        return ShowToast.Danger('Please fill all input field');
      }

      if (reNewPass !== newPass) {
        return ShowToast.Danger(
          "New password and confirm password didn't match!",
        );
      }

      setIsLoading(true);
      const body: IBodyChangePass = {
        oldPassword: oldPass,
        newPassword: newPass,
      };
      const res: any = await Auth.changePassword(body);
      console.log({res});

      setIsLoading(false);

      ShowToast.Success('Change Password Success');
      setModalChangePass(false);
    } catch (error: any) {
      if (error?.response?.data?.code === 500) {
        return ShowToast.Danger('Server under maintenance!');
      }
      console.log({error});
      setIsLoading(false);
      ShowToast.Danger(
        error?.response?.data?.message || 'Something went wrong!',
      );
    }
  }, [newPass, oldPass, reNewPass]);

  const handleHideModal = () => {
    setOldPass('');
    setNewPass('');
    setModalChangePass(false);
  };

  return (
    <SafeAreaView>
      <Header
        title="Profile"
        rightIcon={
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfileScreen')}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.avatarLine}>
          <View style={styles.avatarWrapper}>
            {user.photoProfile ? (
              <Image
                style={styles.avatarImage}
                source={{
                  uri: user.photoProfile,
                }}
              />
            ) : (
              <Text style={styles.avatarText}>{user.name[0]}</Text>
            )}
          </View>
        </View>
        <View>
          <View style={styles.itemChild}>
            <Text style={styles.textItem}>Name</Text>
            <Text style={styles.texTitemLeft}>{user.name}</Text>
          </View>

          <View style={styles.itemChild}>
            <Text style={styles.textItem}>Email</Text>
            <Text style={styles.texTitemLeft}>{user.email}</Text>
          </View>

          <View style={styles.itemChild}>
            <Text style={styles.textItem}>Date of birth</Text>
            <Text style={styles.texTitemLeft}>
              {user.dateOfBirth.split('T')[0]}
            </Text>
          </View>

          <View style={styles.itemChild}>
            <Text style={styles.textItem}>Gender</Text>
            <Text style={styles.texTitemLeft}>{user.gender}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setModalChangePass(true)}
          disabled={isLoading}>
          <View style={styles.item}>
            <Icons.LockCircleClose
              width={24}
              height={24}
              fill={Colors.base600}
            />
            <Text style={styles.textItem}>Change Password</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.divider} /> */}
        <TouchableOpacity onPress={handleLogout} disabled={isLoading}>
          <View style={styles.item}>
            <Icons.Logout width={24} height={24} color={Colors.red} />
            <Text style={styles.textItemRed}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <ReactNativeModal
        backdropOpacity={0.3}
        onBackdropPress={handleHideModal}
        onBackButtonPress={handleHideModal}
        onSwipeComplete={handleHideModal}
        swipeDirection="down"
        style={styles.modalContainer}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        isVisible={modalChangePass}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Change Password</Text>
          <TextInput
            secureTextEntry
            style={styles.textInput}
            placeholder="Input current password"
            value={oldPass}
            onChangeText={e => setOldPass(e)}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            placeholder="Input new password"
            value={newPass}
            onChangeText={e => setNewPass(e)}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            placeholder="Confirm your new password"
            value={reNewPass}
            onChangeText={e => setReNewPass(e)}
          />
          <TouchableOpacity style={styles.btn} onPress={handleChangePass}>
            <Text style={styles.btnText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default ProfileScreen;
