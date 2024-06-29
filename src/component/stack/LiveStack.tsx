import 'react-native-gesture-handler';
import React from "react";

import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LiveRootStackParams, LiveRootStackScreens } from './LiveRootStackParams';

const Stack = createNativeStackNavigator<LiveRootStackParams>();

export default function LiveStack(): React.JSX.Element {
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

const styles = StyleSheet.create({
    
    
})