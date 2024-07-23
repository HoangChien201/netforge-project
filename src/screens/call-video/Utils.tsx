import * as ZIM from 'zego-zim-react-native';
// @ts-ignore
import ZegoUIKitPrebuiltCallService, { ZegoMenuBarButtonName } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import KeyCenter from './KeyCenter';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import React from 'react';
import * as ZPNs from 'zego-zpns-react-native';
import { useMyContext } from '../../component/navigation/UserContext';

export const onUserLogin = async (userID: any, userName: string, avatar: string) => {
    try {
        await ZegoUIKitPrebuiltCallService.init(
            KeyCenter.appID,
            KeyCenter.appSign,
            userID.toString(),
            userName.toString(),
            [ZIM],

            {

                ringtoneConfig: {
                    incomingCallFileName: 'zego_incoming.mp3',
                    outgoingCallFileName: 'zego_outgoing.mp3',
                },
                androidNotificationConfig: {
                    channelID: "Zego_call",
                    channelName: "Zego_call",
                },
                avatarBuilder: ({ userInfo }) => {
                    return (
                        <View style={{ width: '100%', height: '100%' }}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                                //source={image ? { uri: image } : require('../../media/icon/avatar.png')}
                                source={avatar ? { uri: avatar } : { uri: `https://robohash.org/${userInfo.userID}.png` }}
                            //source={{ uri: `https://robohash.org/${userInfo.userID}.png` }}
                            />

                        </View>
                    );
                },
                requireConfig: (data: any) => {
                    return {
                        innerText: {
                            incomingVideoCallDialogTitle: "%10",
                            incomingVideoCallDialogMessage: "Đang gọi...",
                        },
                        // foregroundBuilder: () => {
                        //     return (<Text>hihi</Text>);
                        // },
                        timingConfig: {
                            isDurationVisible: true,
                            onDurationUpdate: (duration: any) => {
                                if (duration === 10 * 60) {
                                    ZegoUIKitPrebuiltCallService.hangUp();
                                }
                            },
                        },

                        onCallEnd: (callID: any, reason: any, duration: any) => {
                            console.log('########CallWithInvitation onCallEnd', callID, reason, duration);
                        },
                        //   topMenuBarConfig: {
                        //       buttons: [ZegoMenuBarButtonName.minimizingButton],
                        //   },
                        // onWindowMinimized: () => {
                        //     navigation.navigate('MessageScreen');
                        // },
                        // onWindowMaximized: () => {
                        //     navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen');
                        // },
                    };

                },

                notifyWhenAppRunningInBackgroundOrQuit: true,
                isIOSSandboxEnvironment: true,
                
            }
        );
        console.log("User logged in successfully:", userID, userName);

    } catch (error) {
        console.error("Error logging in user Utils:", error);
    }
};

export const onUserLogout = async () => {
    return ZegoUIKitPrebuiltCallService.uninit();

};
