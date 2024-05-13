import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';

import Header from '@components/Header';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

import {ShowToast} from '@/helpers';

export type IUser = {
  id: string;
  name: string;
  email: string;
  photoProfile: string;
};

const GroupNameScreen = (props: any) => {
  const {type} = props.route.params;
  const navigation = useNavigation<any>();

  const [groupName, setGroupName] = useState('');

  const handleNextScreen = useCallback(() => {
    if (!groupName) {
      return ShowToast.Danger('Group name can not empty!');
    }
    return navigation.navigate('AddParticipantsScreen', {
      maxUser: type.includes('private') ? 1 : null,
      type,
      groupName,
    });
  }, [groupName, navigation, type]);

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        showBack
        title="Create Group"
        rightIcon={
          <TouchableOpacity onPress={handleNextScreen}>
            <Text style={styles.createText}>Next</Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.inputBox}>
        <TextInput
          autoFocus={true}
          style={styles.groupNameInput}
          placeholder="Input group name"
          value={groupName}
          onChangeText={e => setGroupName(e)}
        />
      </View>
    </SafeAreaView>
  );
};

export default GroupNameScreen;
