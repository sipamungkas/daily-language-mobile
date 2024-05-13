import {View, Text} from 'react-native';
import React, {ReactNode} from 'react';
import styles from './styles';
import Icons from '@assets/icons';
import Colors from '@constants/Colors';
import {useNavigation} from '@react-navigation/native';

type HeaderProps = {
  showBack?: boolean;
  title: string;
  rightIcon?: ReactNode;
};

const Header = (props: HeaderProps) => {
  const {showBack = false, title, rightIcon} = props;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.arrowAndTitle}>
        {showBack && (
          <Icons.CaretLeft
            fill={Colors.base800}
            onPress={() => navigation.goBack()}
          />
        )}
        <Text numberOfLines={1} style={styles.headerTitle}>
          {title}
        </Text>
      </View>
      {rightIcon}
    </View>
  );
};

export default Header;
