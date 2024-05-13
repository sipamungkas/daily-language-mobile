import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export const Success = (text: string) => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    textBody: text,
  });
};

export const Danger = (text: string) => {
  Toast.show({
    type: ALERT_TYPE.DANGER,
    textBody: text,
  });
};

export const Warning = (text: string) => {
  Toast.show({
    type: ALERT_TYPE.WARNING,
    textBody: text,
  });
};
