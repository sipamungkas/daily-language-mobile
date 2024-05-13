import {
  Text,
  ActivityIndicator,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import Header from '@components/Header';
import styles from './styles';
import {Profile} from '@/services/api';
import Colors from '@/constants/Colors';
// import {HomeTabParamsList} from '@/navigators/homeNavigators';
import Icons from '@/assets/icons';
import {Storage} from '@/services/storage';
import {EStorage} from '@/types';
import {useNavigation} from '@react-navigation/native';
import {ShowToast} from '@/helpers';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import {IUpdateBody} from '@/services/api/profile';
import {setUser} from '@/redux/slices/accountSlice';
import {launchImageLibrary} from 'react-native-image-picker';

// type EditProfileScreenProps = BottomTabNavigationProp<
//   HomeTabParamsList,
//   'EditProfileScreen'
// >;

const EditProfileScreen = () => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [modalCalendar, setModalCalendar] = useState<boolean>(false);
  const [dob, setDob] = useState(new Date('2000'));
  const [gender, setGender] = useState<'male' | 'female'>('');
  const [modalGender, setModalGender] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.account.data.user);
  useEffect(() => {
    setName(user.name as string);
    setEmail(user.email as string);
    setDob(new Date(user.dateOfBirth));
    setGender(user.gender as any);
  }, [user]);

  const selectGender = (_gender: typeof gender) => {
    setModalGender(false);
    setGender(_gender);
  };

  const choosePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      e => {
        if (e.didCancel) {
          console.log({e});
          return;
        }

        setTimeout(() => {
          handleUploadPhoto(e);
        }, 400);
      },
    );
  };

  const handleUploadPhoto = async (image: any) => {
    try {
      setUploadLoading(true);
      const data = new FormData();

      data.append('file', {
        uri:
          Platform.OS === 'android'
            ? image?.assets[0]?.uri
            : image?.assets[0]?.uri.replace('file://', ''),
        name: image.assets[0]?.fileName,
        type: image.assets[0]?.type,
      });
      const res: any = await Profile.updatePhoto(data);
      if (res.message) {
        ShowToast.Success(res.message);
        await handleGetUser();
        setUploadLoading(false);
        return;
      }
      ShowToast.Success('Update Photo Success');
      setUploadLoading(false);
    } catch (error: any) {
      console.log({error});
      ShowToast.Danger(
        error?.response?.data?.message ||
          'Something went wrong, please try again',
      );
      setUploadLoading(false);
    }
  };

  const handleGetUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const res: any = await Profile.user();
      if (res.code === 200) {
        Storage.set(EStorage.USER, JSON.stringify(res.data));
        dispatch(setUser(res.data));
      }

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log({error});
      ShowToast.Danger(
        error?.response?.data?.message ||
          'Something went wrong, please try again',
      );
    }
  }, [dispatch]);

  const handleUpdateProfile = useCallback(async () => {
    try {
      const body: IUpdateBody = {
        name,
        gender,
        dateOfBirth: dob.toJSON().split('T')[0],
        email,
      };
      setIsLoading(true);
      const res: any = await Profile.updateProfile(body);
      if (res?.code === 201) {
        ShowToast.Success('Update profile success!');
        await handleGetUser();
        setIsLoading(false);
        return navigation.goBack();
      }
      setIsLoading(false);
      ShowToast.Danger(res.message);
    } catch (error) {
      setIsLoading(false);
      console.log({error});

      ShowToast.Danger('Failed to update profile!');
    }
  }, [dob, email, gender, handleGetUser, name, navigation]);

  return (
    <SafeAreaView>
      <Header
        showBack
        title="Edit Profile"
        rightIcon={
          <TouchableOpacity disabled={isLoading} onPress={handleUpdateProfile}>
            {isLoading ? (
              <ActivityIndicator color={Colors.primary800} />
            ) : (
              <Text style={styles.editText}>Save</Text>
            )}
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
          <TouchableOpacity disabled={uploadLoading} onPress={choosePhoto}>
            {uploadLoading ? (
              <ActivityIndicator color={Colors.primary800} />
            ) : (
              <Text style={{color: Colors.primary700}}>Edit Photo</Text>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.itemChild}>
            <Text style={styles.textItem}>Name</Text>
            <TextInput
              autoFocus
              value={name}
              onChangeText={e => setName(e)}
              style={styles.texTitemLeft}
              textAlign="right"
              keyboardType="email-address"
              placeholder="Input your email address"
              placeholderTextColor={Colors.base400}
            />
          </View>

          <View style={styles.itemChild}>
            <Text style={styles.textItem}>Email</Text>
            <TextInput
              textAlign="right"
              value={email}
              onChangeText={e => setEmail(e)}
              style={styles.texTitemLeft}
              keyboardType="email-address"
              placeholder="Input your email address"
              placeholderTextColor={Colors.base400}
            />
            {/* <Text style={styles.texTitemLeft}>{user.email}</Text> */}
          </View>

          <View style={styles.itemChild}>
            <Text style={styles.textItem}>Date of birth</Text>
            <TouchableOpacity
              style={styles.texTitemLeft}
              onPress={() => setModalCalendar(true)}>
              <Text>
                {dob.toLocaleString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemChild}>
            <Text style={styles.textItem}>Gender</Text>
            <TouchableOpacity onPress={() => setModalGender(true)}>
              <Text style={styles.texTitemLeft}>{gender}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
      {/* modal gender */}
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
    </SafeAreaView>
  );
};

export default EditProfileScreen;
