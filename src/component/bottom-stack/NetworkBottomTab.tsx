import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef, useCallback } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NetworkRootBottomTabParams, NetworkRootBottomTabScreens } from "./NetworkRootBottomTabParams";
import { Keyboard, Animated, Easing } from 'react-native';
// @ts-ignore
import { ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
const Tab = createBottomTabNavigator<NetworkRootBottomTabParams>();

export default function NetworkBottomTab(): React.JSX.Element {
    const tabBarAnimation = useRef(new Animated.Value(1)).current; // Initial opacity 1 (visible)
    const navigation = useNavigation();

    const handleKeyboardShow = useCallback(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none',
            }
        });
    }, []);
    const handleKeyboardHide = useCallback(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: '#1F1F2F',
                margin: 20,
                borderRadius: 15
            },
        });
    }, []);
    useFocusEffect(
        useCallback(() => {
            // Lắng nghe sự kiện hiển thị và ẩn bàn phím
            const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
            const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
            return () => {
                keyboardDidShowListener.remove();
                keyboardDidHideListener.remove();
            };
        }, [handleKeyboardShow, handleKeyboardHide]),
    );


    const isInCallScreen = useIsFocused();
    
    const getTabBarStyle = () => {
        const isCallScreen = 
            isInCallScreen && (isInCallScreen === 'ZegoUIKitPrebuiltCallInCallScreen' || isInCallScreen === 'ZegoUIKitPrebuiltCallWaitingScreen');

        return {
            position: 'absolute',
            backgroundColor: '#1F1F2F',
            margin: 20,
            borderRadius: 15,
            opacity: tabBarAnimation,
            transform: [{
                translateY: tabBarAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0], // move tab bar off screen when hidden
                }),
            }],
            display: isCallScreen ? 'none' : 'flex',
        };
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: getTabBarStyle(),
                headerShown: false,
            })}
            backBehavior='history'
        >
            {NetworkRootBottomTabScreens.map((item) => (
                <Tab.Screen
                    key={item.id}
                    component={item.component}
                    name={item.name}
                    options={item.options}
                />
            ))}

        </Tab.Navigator>
    );
}
