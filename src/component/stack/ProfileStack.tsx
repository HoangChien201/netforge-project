import 'react-native-gesture-handler';
import React from "react";
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList } from '../navigation/ManageNavigation';
import { ProfileRootStackParams, ProfileRootStackScreens } from './ProfileRootStackParams';


const Drawer =createDrawerNavigator<ProfileRootStackParams>();
export type navigationType = StackNavigationProp<RootStackParamList>
export default function ProfileStack():React.JSX.Element{
    return (
        <Drawer.Navigator
            screenOptions={{
                
            }}
        >
            {
                ProfileRootStackScreens.map((item,index)=>{
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