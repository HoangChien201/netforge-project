import 'react-native-gesture-handler';
import React, { } from "react";

import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NetworkRootStackParams, NetworkRootStackScreens } from './NetworkRootStackParams';
import MessageScreen from '../../screens/message/MessageScreen';
// @ts-ignore
import {
    ZegoUIKitPrebuiltCallWaitingScreen,
    ZegoUIKitPrebuiltCallInCallScreen,
  } from '@zegocloud/zego-uikit-prebuilt-call-rn';
const Stack = createNativeStackNavigator<NetworkRootStackParams>();

export default function NetworkStack(): React.JSX.Element {
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