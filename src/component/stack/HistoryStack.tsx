import 'react-native-gesture-handler';
import React from "react";
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList } from '../navigation/ManageNavigation';
import {HistoryRootStackParams, HistoryRootStackScreens} from './HistoryStackParams'


const Stack =createStackNavigator<HistoryRootStackParams>();
export type navigationType = StackNavigationProp<RootStackParamList>
export default function HistoryStack():React.JSX.Element{
    return (
        <Stack.Navigator
            screenOptions={{
            }}
            initialRouteName='HistorySceen'
        >
            {
                HistoryRootStackScreens.map((item,index)=>{
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