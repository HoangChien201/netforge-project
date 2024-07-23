import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NetworkRootBottomTabParams, NetworkRootBottomTabScreens } from "./NetworkRootBottomTabParams";
import { Keyboard, Animated, Easing } from 'react-native';
import { ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { useIsFocused } from '@react-navigation/native';

const Tab = createBottomTabNavigator<NetworkRootBottomTabParams>();

export default function NetworkBottomTab(): React.JSX.Element {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const tabBarAnimation = useRef(new Animated.Value(1)).current; // Initial opacity 1 (visible)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
            Animated.timing(tabBarAnimation, {
                toValue: 0, // animate to opacity 0 (hidden)
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
            Animated.timing(tabBarAnimation, {
                toValue: 1, // animate to opacity 1 (visible)
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

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
        >
            {NetworkRootBottomTabScreens.map((item) => (
                <Tab.Screen
                    key={item.id}
                    component={item.component}
                    name={item.name}
                    options={item.options}
                />
            ))}
            {/* nhận cuộc gọi ở bất kỳ screen nào */}
            <Tab.Screen
                name="ZegoUIKitPrebuiltCallInCallScreen"
                component={ZegoUIKitPrebuiltCallInCallScreen}
                options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
            />
            <Tab.Screen
                name="ZegoUIKitPrebuiltCallWaitingScreen"
                component={ZegoUIKitPrebuiltCallWaitingScreen}
                options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
            />
        </Tab.Navigator>
    );
}
