import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useCallback} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import styles from './styles';
import Icons from '@assets/icons';
import Colors from '@constants/Colors';
import {useNavigation} from '@react-navigation/native';

const BottomTab = ({state}: BottomTabBarProps) => {
  const navigation = useNavigation<any>();
  const isIndex = useCallback(
    (index: number) => {
      return state.index === index;
    },
    [state.index],
  );
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <View style={styles.menuContainer}>
          {isIndex(0) ? (
            <Icons.Home
              fill={Colors.primary800}
              fontSize={24}
              width={24}
              height={24}
            />
          ) : (
            <Icons.HomeOutline
              fill={Colors.base400}
              fontSize={24}
              width={24}
              height={24}
            />
          )}

          <Text
            style={[
              styles.menuTitle,
              {color: isIndex(0) ? Colors.primary800 : Colors.base400},
            ]}>
            Dashboard
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('HistoryScreen')}>
        <View style={styles.menuContainer}>
          {isIndex(1) ? (
            <Icons.Reader
              fill={Colors.primary800}
              fontSize={24}
              width={24}
              height={24}
            />
          ) : (
            <Icons.ReaderOutline
              fill={Colors.base400}
              fontSize={24}
              width={24}
              height={24}
            />
          )}

          <Text
            style={[
              styles.menuTitle,
              {color: isIndex(1) ? Colors.primary800 : Colors.base400},
            ]}>
            History
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ChatSelectionScreen')}>
        <View style={styles.menuContainer}>
          {isIndex(2) ? (
            <Icons.ChatBubbles
              fill={Colors.primary800}
              fontSize={24}
              width={24}
              height={24}
            />
          ) : (
            <Icons.ChatBubblesOutline
              fill={Colors.base400}
              fontSize={24}
              width={24}
              height={24}
            />
          )}

          <Text
            style={[
              styles.menuTitle,
              {color: isIndex(2) ? Colors.primary800 : Colors.base400},
            ]}>
            Chat
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <View style={styles.menuContainer}>
          {isIndex(3) ? (
            <Icons.PersonFilled
              fill={Colors.primary800}
              fontSize={24}
              width={24}
              height={24}
            />
          ) : (
            <Icons.PersonOutline
              fill={Colors.base400}
              fontSize={24}
              width={24}
              height={24}
            />
          )}
          {/* <Icon
            name={`settings${isIndex(4) ? '' : '-outline'}`}
            size={24}
            color={isIndex(4) ? Colors.primary800 : Colors.base400}
          /> */}
          <Text
            style={[
              styles.menuTitle,
              {color: isIndex(3) ? Colors.primary800 : Colors.base400},
            ]}>
            Profile
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BottomTab;
