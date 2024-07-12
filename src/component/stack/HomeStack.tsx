import 'react-native-gesture-handler';
import React from "react";

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLOR } from '../../constant/color';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeRootStackParams, HomeRootStackScreens } from './HomeRootStackParams';

const Stack = createNativeStackNavigator<HomeRootStackParams>();

export default function HomeStack(): React.JSX.Element {
    return (
        <Stack.Navigator
            screenOptions={{
            }}
          
        >
            {
                HomeRootStackScreens.map((item, index) => {
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