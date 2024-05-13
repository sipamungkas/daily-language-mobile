import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {GestureResponderEvent} from 'react-native-modal';
import styles from './styles';
import Colors from '@/constants/Colors';

type ButtonProps = {
  title: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  disabled?: boolean;
  isLoading?: boolean;
};

const Button = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.btn, disabled && styles.btnDisabled]}>
      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.primary500} />
      ) : (
        <Text style={styles.btnText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
