import {io} from 'socket.io-client';

const socket = io('http://192.168.0.102:5000');

export default socket;
