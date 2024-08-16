import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";

import { Linking, StyleSheet } from 'react-native';
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
import { useIsFocused, useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator<NetworkRootStackParams>();

export default function NetworkStack(): React.JSX.Element {
    const user = useSelector((state: RootState) => state.user.value)
    const isFocus=useIsFocused()
    useEffect(() => {

        if (socket.disconnected) {
            socket.connect()
        }
        socket.on('connect', async () => {
            console.log('Connected to server');
            if (user?.id) {
                await updateStatusOnline(user.id, 1)
            }

        });

        socket.on('disconnect', async () => {
            console.log('Disconnected from server');
            if (user?.id) {
                await updateStatusOnline(user.id, 0)
            }
        });



        return () => {
            socket.off('connect')
            socket.off('disconnect')

        }
    }, [])

    const navigation=useNavigation()
    useEffect(() => {
        const linkingSubscription =Linking.addEventListener('url', handleOpenURL);
        return () => {
            // Clean up the event listeners
            linkingSubscription.remove();
        };
      }, [navigation]);
      const handleOpenURL = ({ url }) => {
        const index=parseInt(url.indexOf('/app'))+5
        
        const path=url.slice(index)
        navigation.navigate('CommentsScreen')
        
        //   // Điều hướng dựa trên deeplink
        //   if (parsedURL.path === 'profile') {
        //     navigation.navigate('Profile', { id: parsedURL.queryParams.id });
        //   } else if (parsedURL.path === 'home') {
        //     navigation.navigate('Home');
        //   }

      };
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