import 'react-native-gesture-handler';
import React, { useEffect } from "react";

import { AppState, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NetworkRootStackParams, NetworkRootStackScreens } from './NetworkRootStackParams';
import MessageScreen from '../../screens/message/MessageScreen';
// @ts-ignore
import {
    ZegoUIKitPrebuiltCallWaitingScreen,
    ZegoUIKitPrebuiltCallInCallScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { socket, SocketConnect } from '../../http/SocketHandle';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { updateStatusOnline } from '../../http/ChienHTTP';
const Stack = createNativeStackNavigator<NetworkRootStackParams>();

export default function NetworkStack(): React.JSX.Element {
    const user=useSelector((state:RootState)=>state.user.value)
    useEffect(() => {

        if (socket.disconnected) {
            socket.connect()
        }
        socket.on('connect', async () => {
            console.log('Connected to server');
            if(user?.id){
                await updateStatusOnline(user.id,1)
            }
            
          });
        
          socket.on('disconnect', async () => {
            console.log('Disconnected from server');
            if(user?.id){
                await updateStatusOnline(user.id,0)
            }
          });

          return ()=>{
            socket.off('connect')
            socket.off('disconnect')

          }
    }, [])

    //sự kiện tắt app
  useEffect(() => {
    const handleAppStateChange =async (nextAppState) => {
      if (nextAppState === 'background') {
        console.log('App is in background mode');
        if(user?.id){
            await updateStatusOnline(user.id,0)
        }
        // Code để xử lý khi app bị tắt hoặc chuyển sang chế độ background
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

    return (
        <Stack.Navigator
            screenOptions={{

            }}
            
        >
            {
                NetworkRootStackScreens.map((item, index) => {
                    return <Stack.Screen
                        key={item.id}
                        component={item.component}
                        name={item.name}
                        options={item.options}
                        

                    />
                })
            }
            <Stack.Screen name='MessageScreen' component={MessageScreen} options={{ headerShown: false }} />

            <Stack.Screen name='ZegoUIKitPrebuiltCallWaitingScreen' component={ZegoUIKitPrebuiltCallWaitingScreen} options={{ headerShown: false }} />
            <Stack.Screen name='ZegoUIKitPrebuiltCallInCallScreen' component={ZegoUIKitPrebuiltCallInCallScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({


})