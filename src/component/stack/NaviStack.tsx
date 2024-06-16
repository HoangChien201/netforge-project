import 'react-native-gesture-handler';
import React from "react";
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { NavigateRootStackScreens,NavigateRootStackParams } from './StackNavigate';
import { Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/ManageNavigation';



const Stack=createStackNavigator<NavigateRootStackParams>();
export type navigationType = StackNavigationProp<RootStackParamList>
export default function UserStack():React.JSX.Element{
    return (
        <Stack.Navigator
            screenOptions={{
               
                cardStyle:{
                    backgroundColor:'#fff'
                },
                headerStyle:{backgroundColor:'#fff'}
                
            }}
        >
            {
                NavigateRootStackScreens.map((item,index)=>{
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