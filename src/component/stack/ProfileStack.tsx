import 'react-native-gesture-handler';
import React from "react";
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList } from '../navigation/ManageNavigation';
import { ProfileRootStackEnum, ProfileRootStackParams, ProfileRootStackScreens } from './ProfileRootStackParams';


const Stack =createStackNavigator<ProfileRootStackParams>();
export type navigationType = StackNavigationProp<RootStackParamList>
export default function ProfileStack():React.JSX.Element{
    return (
        <Stack.Navigator
            screenOptions={{
            }}
            initialRouteName={ProfileRootStackEnum.MenuScreen}
        >
            {
                ProfileRootStackScreens.map((item,index)=>{
                    return <Stack.Screen
                        key={index.toString()}
                        component={item.component}
                        name={item.name}
                        options={item.options}
                    />
                })
            }
        </Stack.Navigator>
    )
}