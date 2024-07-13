import 'react-native-gesture-handler';
import React, { useEffect } from "react";

import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LiveRootStackParams, LiveRootStackScreens } from './LiveRootStackParams';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator<LiveRootStackParams>();

export default function LiveStack(): React.JSX.Element {
     const navigation = useNavigation();
    const isFocused = useIsFocused();
    
    useEffect(() => {
        if (isFocused) {
            navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
        } 
        // else {
        //     navigation.getParent()?.setOptions({
        //         tabBarStyle: { 
        //             position: 'absolute',
        //             backgroundColor:'#1F1F2F',
        //             margin:20,
        //             borderRadius:15,
        //         },
        //     });
        // }
    }, [isFocused]);

    return (
        <Stack.Navigator
            screenOptions={{
            }}
            initialRouteName={"LiveWithZego"}
        >
            {
                LiveRootStackScreens.map((item, index) => {
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
