import React from 'react';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';
import Icons from '@/assets/icons';
import Colors from '@/constants/Colors';

export type Props = {
  name: string;
  isChecked: boolean;
  handleAddUser: ((event: GestureResponderEvent) => void) | undefined;
};

const UserItem = (props: Props) => {
  const {name, isChecked, handleAddUser} = props;

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.container}>
        <View style={styles.avatarWrapper}>
          <Text style={styles.avatarText}>{name[0]}</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text numberOfLines={1} style={styles.title}>
            {name}
          </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={handleAddUser}>
            <View
              style={[
                styles.box,
                {
                  backgroundColor: isChecked
                    ? Colors.primary800
                    : Colors.white100,
                  borderColor: isChecked ? Colors.primary800 : Colors.base500,
                },
              ]}>
              {isChecked && (
                <Icons.Check color={Colors.white100} width={20} height={20} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserItem;
