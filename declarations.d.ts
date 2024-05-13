declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '@env' {
  export const API_URL: string;
  export const BASIC_AUTH_USER: string;
  export const BASIC_AUTH_PASSWORD: string;
  export const SOCKET_URL: string;
}
