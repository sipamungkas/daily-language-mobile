import {SOCKET_URL} from '@env';
import {io} from 'socket.io-client';

const socket = io(SOCKET_URL, {
  // path: '/',
  transports: ['websocket', 'polling'],
  forceNew: true,
  reconnectionAttempts: Infinity,
  timeout: 10000,
});

export default socket;
