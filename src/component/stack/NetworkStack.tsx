import 'react-native-gesture-handler';
import React, { useEffect } from "react";

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLOR } from '../../constant/color';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NetworkRootStackParams,NetworkRootStackScreens } from './NetworkRootStackParams';
import { onUserLogin, onUserLogout } from '../../screens/call-video/Utils';
import { useMyContext } from '../navigation/UserContext';

const Stack = createNativeStackNavigator<NetworkRootStackParams>();

export default function NetworkStack(): React.JSX.Element {
    const {user} = useMyContext()

    // login zegoCloud để thực hiện cuộc gọi
    useEffect(() => {
        const initializeCallService = async () => {
            try {
                await onUserLogin(user.id, user.fullname, user.avatar);
                console.log("User logged in successfully on HomeScreen:", user.id, user.fullname);
            } catch (error) {
                console.error("Error logging in user on HomeScreen:", error);
            }
        };
        initializeCallService();
        
        return () => {
            onUserLogout();
            console.log("User logged out on HomeScreen");
        };
    }, [user.id, user.fullname]);
    // //end zegoCloud

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
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    
    
})