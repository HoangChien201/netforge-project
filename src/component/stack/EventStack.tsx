import 'react-native-gesture-handler';
import React from "react";

import { EventRootStackParams, EventRootStackScreens } from "./EventRootStackParams";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLOR } from '../../constant/color';

const Drawer = createDrawerNavigator<EventRootStackParams>();

export default function EventStack(): React.JSX.Element {
    return (
        <Drawer.Navigator
            screenOptions={{

            }}
        >
            {
                EventRootStackScreens.map((item, index) => {
                    return <Drawer.Screen
                        key={item.id}
                        component={item.component}
                        name={item.name}
                        options={item.options}

                    />
                })
            }
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    
    
})