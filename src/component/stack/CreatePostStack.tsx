import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/ManageNavigation';
import { CreatePostRootStackScreens, CreatePostStackEnum, CreatePostStackParams } from './CreatePostStackParams';
import { Animated, Easing, Keyboard } from 'react-native';
const Stack =createStackNavigator<CreatePostStackParams>();
export type navigationType = StackNavigationProp<RootStackParamList>
export default function CreatePostStack():React.JSX.Element{
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const tabBarAnimation = useRef(new Animated.Value(1)).current; // Initial opacity 1 (visible)

    return (
        <Stack.Navigator
            screenOptions={{
            }}
            initialRouteName={CreatePostStackEnum.CreatePostScreen}
        >
            {
                CreatePostRootStackScreens.map((item,index)=>{
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