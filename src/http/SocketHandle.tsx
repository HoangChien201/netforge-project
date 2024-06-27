import SocketIOClient from 'socket.io-client'
import { url } from '../constant/url';

export type SendNotification = {
  to: number,
  content?: string
}
export const socket = SocketIOClient(url)

export function SocketConnect() {
  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

}