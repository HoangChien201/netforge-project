import 'react-native-gesture-handler';
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screen/user/LoginScreen';
import SignUpScreen from '../../screen/user/SignUpScreen';
import { UserRootStackScreens,UserRootStackParams } from './UserRootStackParams';
import { Image } from 'react-native';
import { Color } from '../../contanst/color';


const Stack=createStackNavigator<UserRootStackParams>();

export default function UserStack():React.JSX.Element{
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackImage:()=>{
                    return <Image source={require('../../assets/images/icon/icon-back.png')} style={{marginStart:40}}/>
                },
                cardStyle:{
                    backgroundColor:Color.backgroundGray
                },
                headerStyle:{backgroundColor:Color.backgroundGray}
                
            }}
        >
            {
                UserRootStackScreens.map((item,index)=>{
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