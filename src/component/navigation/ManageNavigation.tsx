import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer, RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useMyContext } from './UserContext'
import NetworkStack from '../stack/NetworkStack'
import LoginScreen from '../../screens/LoginScreen'
import SignupScreen from '../../screens/SignInScreen'
import ModalPoup from '../Modal/ModalPoup'
import UserStack from '../stack/UserStack'
import SplashScreen from '../../screens/SplashScreen'
import AxiosInstance from '../../http/AxiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { login } from '../../http/userHttp/user'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PushNotification, { Importance } from 'react-native-push-notification';
import { Alert, PermissionsAndroid } from 'react-native';
import { socket } from '../../http/SocketHandle'
// @ts-ignore

import { ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallFloatingMinimizedView } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { navigationRef } from './NavigationRef'


export type navigationType = StackNavigationProp<RootStackParamList>
type routeType = RouteProp<{ params: { value: string } }, 'params'>
export type RootStackParamList = {

};
type Manager = {
    notification: any
}
const ManageNavigation = () => {
    const [showSplash, setShowSplash] = useState(true);
    const { user, setUser } = useMyContext();

    const handleAutoLogin = async () => {
        try {
            const keepLoggedIn = await AsyncStorage.getItem('keep');
            if (keepLoggedIn === 'true') {

                const stEmail = await AsyncStorage.getItem('email');
                const stPassword = await AsyncStorage.getItem('password');
                if (stEmail !== null && stPassword !== null) {
                    const email = String(stEmail);
                    const password = String(stPassword);
                    try {
                        const result = await login(email, password);
                        setUser(result.data)
                    } catch (error) {
                        console.log(error);

                    }
                }
            } else {
                console.log('User chose not to stay logged in');
                return;
            }

        } catch (error) {
            console.log("Auto login error", error);
        }
    };
    useEffect(() => {
        handleAutoLogin();
        createChannelNotify();
        requestNotificationPermission();
        requestCameraPermission();
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (user) {
            const id = user.id;
            //console.log('Socket connected:', socket.connected);
            socket.on(`notification-${id}`, (data) => {
                console.log('Notification received in Navigate:', data);
                addNotification(data);
                showLocal(data);
                // const exists = notifications.some(notification => notification.id == data.id);
                // if (!exists) {
                //     addNotification(data);
                //     showLocal(data);
                // }
            });
        }

    }, [user]);
    const addNotification = async (newNotification) => {
        try {
            const oldNotifications = await AsyncStorage.getItem(`notifications-${user.id}`);
            const parsedNotifications = oldNotifications ? JSON.parse(oldNotifications) : [];
            const updatedNotifications = [...parsedNotifications, newNotification];
            await AsyncStorage.setItem(`notifications-${user.id}`, JSON.stringify(updatedNotifications));
            console.log('Notification added and saved');
        } catch (error) {
            console.error('Error adding notification:', error);
        }
    };

    const requestNotificationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                {
                    title: "Notification Permission",
                    message: "This app needs access to show notifications.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the notifications");
            } else {
                console.log("Notification permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const createChannelNotify = async () => {
        PushNotification.createChannel(
            {
                channelId: "channel-id-1",
                channelName: "My channel",
                channelDescription: "A channel to categorise your notifications",
                playSound: true,
                soundName: "default",
                importance: Importance.HIGH,
                vibrate: true,
            },
            (created) => console.log(`createChannel returned '${created}'`)
        );
    };

    const showLocal = (notification: { notification?: any; body?: any; title?: any; }) => {
        PushNotification.localNotification({
            channelId: "channel-id-1",
            autoCancel: true,
            bigText: notification.body || "",
            title: notification.title || " Thông báo mới",
            message: notification.body || "",
            vibrate: true,
            vibration: 300,
            playSound: true,
            soundName: "default",
            userInfo: {
                    screen: notification.navigate.screen || 'HomeScreen',
                    params: notification.navigate.params || null,
            }
        });

    };

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Quyền truy cập Camera",
                    message: "Chúng tôi cần cấp quyền truy cập Camera",
                    buttonNeutral: "Hỏi tôi sau",
                    buttonNegative: "Hủy bỏ",
                    buttonPositive: "Chấp nhận"
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Quyền sử dụng máy ảnh bị từ chối');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    if (showSplash) {
        return <SplashScreen />;
    }

    return (
        <GestureHandlerRootView>
            <NavigationContainer ref={navigationRef}>
                {/*ZegoCallInvitationDialog hiện dialog nhận cuộc gọi */}
                <ZegoCallInvitationDialog />
                {user ? <NetworkStack /> : <UserStack />}
                <ZegoUIKitPrebuiltCallFloatingMinimizedView />
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}

export default ManageNavigation