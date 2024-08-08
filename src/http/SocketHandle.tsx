import SocketIOClient from 'socket.io-client'
import { url } from '../constant/url';
import { useSelector } from 'react-redux';
import { RootState } from '../component/store/store';

export type SendNotification = {
  to: number,
  content?: string
}
export const socket = SocketIOClient(url)

export function SocketConnect() {
  socket.on('connect', () => {
    console.log('Connected to server');
    const user=useSelector((state:RootState)=>state.user.value)
    console.log('id',user.id);
    
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
    const user=useSelector((state:RootState)=>state.user.value)
    console.log('id',user.id);
  });

}