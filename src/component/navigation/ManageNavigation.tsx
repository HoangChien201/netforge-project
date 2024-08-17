import React, { useEffect, useState } from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import NetworkStack from '../stack/NetworkStack'
import UserStack from '../stack/UserStack'
import SplashScreen from '../../screens/SplashScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { login } from '../../http/userHttp/user'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PushNotification, { Importance } from 'react-native-push-notification';
import { Alert, Linking, PermissionsAndroid } from 'react-native';
import { socket } from '../../http/SocketHandle'
// @ts-ignore
import { ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallFloatingMinimizedView } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { setUsers } from '../store/userSlice'
import { getFriends } from '../../http/QuyetHTTP'
import { navigationRef } from './NavigationRef'
import { useSendNotification } from '../../constant/notify'
import LoginScreen from '../../screens/LoginScreen'

export type navigationType = StackNavigationProp<RootStackParamList>
export type RootStackParamList = {

};

const ManageNavigation = () => {
    const [showSplash, setShowSplash] = useState(true);

    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.value)
    const [friend, setFriend] = useState([])
    const [todayFriends, setTodayFriends] = useState([]);
    const { sendBirthDay } = useSendNotification()
    const [oldNotifications, setOldNotifications] = useState([]);
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
                        await AsyncStorage.setItem('token', result?.data.token);
                        dispatch(setUsers(result?.data))

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

    //tuongne
    useEffect(() => {
        getFriendList();
    }, [user])

    const getFriendList = async () => {
        const checkUserN = await AsyncStorage.getItem(`CancelN-${user.id}`)
        if (user && checkUserN != 'true') {
            try {
                const result = await getFriends(2)
                setFriend(result)
            } catch (error) {
                console.log('Lỗi khi lấy danh sách bạn bè nef', error);
            }
        }

    };

    useEffect(() => {
        const today = new Date();
        const friendsToday = friend.filter(friend => {
            const friendBirthday = new Date(friend.user.dateOfBirth);
            return today.getDate() === friendBirthday.getDate() && today.getMonth() === friendBirthday.getMonth();
        });
        setTodayFriends(friendsToday);
    }, [friend])

    useEffect(() => {
        if (todayFriends && user) {
            if (todayFriends.length > 0 && user) {
                todayFriends.forEach(friend => {
                    sendBirthDay({
                        friendId: friend.user.id,
                        avatar: friend.user.avatar,
                        fullname: friend.user.fullname,

                    })
                });
                cancelNtoUser(user.id)
            } else {
                console.log('No friends to tag');
            }
        }
    }, [todayFriends])
    const cancelNtoUser = async (id) => {
        await AsyncStorage.setItem(`CancelN-${id}`, 'true')
    }
    useEffect(() => {
        if (user) {
            const id = user.id;
            socket.on(`notification-${id}`, (data) => {
                // addNotification(data);
                // showLocal(data);
                console.log('Nhận thông báo 1: ', data);
                const exists = oldNotifications.some(notification => notification.id == data.id);
                if (!exists) {
                    addNotification(data);
                    showLocal(data);
                    console.log('Nhận thông báo sau check: ', data);
                }
            });
        }

    }, [user]);

    const addNotification = async (newNotification:any) => {
        try {
            const data = await AsyncStorage.getItem(`notifications-${user?.id}`);
            const parsedNotifications = data ? JSON.parse(data) : [];
            const updatedNotifications = [...parsedNotifications, newNotification];
            await AsyncStorage.setItem(`notifications-${user?.id}`, JSON.stringify(updatedNotifications));
            setOldNotifications(updatedNotifications);
            console.log('Notification added');
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

    const linking = {
        prefixes: ['netforge://', ''],
        config: {
            screens: {
                HomeScreen: 'home',
                // Post: 'post/:id',
                // CommentsScreen: 'comments/:id',
            },
        },
    };


    const handleDeepLink = (event) => {
        let data = Linking.openURL(event.url);
        console.log('Deep link data:', data);
    };

    Linking.addEventListener('url', handleDeepLink);

    // return () => {
    //     Linking.removeEventListener('url', handleDeepLink);
    // };

    const checkInitialLink = async () => {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
            let data = Linking.openURL(initialUrl);
            console.log('Initial link data:', data);
        }
    };

    checkInitialLink();

    return (
        // <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer linking={linking} ref={navigationRef}>
            {/*ZegoCallInvitationDialog hiện dialog nhận cuộc gọi */}
            <ZegoCallInvitationDialog />
            {user ? <NetworkStack /> : <UserStack />}
            <ZegoUIKitPrebuiltCallFloatingMinimizedView />
        </NavigationContainer>
        // </GestureHandlerRootView>
    )
}

export default ManageNavigation