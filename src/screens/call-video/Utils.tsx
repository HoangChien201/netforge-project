import React from 'react';
import * as ZIM from 'zego-zim-react-native';
// @ts-ignore
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
import KeyCenter from './KeyCenter';
import { Image, View } from 'react-native';
import React from 'react';
import { MessageFactory } from '../../component/message/class/MessageProvider';


export const onUserLogin = async (userID: any, userName: string, avatar: string, navigation: any) => {
    try {
        return await ZegoUIKitPrebuiltCallService.init(
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
                            incomingVoiceCallDialogTitle: '',
                            incomingVoiceCallDialogMessage: 'Đang gọi...',
                            incomingVideoCallPageTitle: '',
                            incomingVideoCallPageMessage: '',
                            incomingVoiceCallPageTitle: '',
                            incomingVoiceCallPageMessage: '',
                            incomingGroupVideoCallDialogTitle: '',
                            incomingGroupVideoCallDialogMessage: '',
                            incomingGroupVoiceCallDialogTitle: '',
                            incomingGroupVoiceCallDialogMessage: '',
                            incomingGroupVideoCallPageTitle: '',
                            incomingGroupVideoCallPageMessage: '',
                            incomingGroupVoiceCallPageTitle: '',
                            incomingGroupVoiceCallPageMessage: '',
                        },
                        timingConfig: {
                            isDurationVisible: true,
                            onDurationUpdate: (duration: any) => {
                                // console.log('duration', data);
                                // if (duration === 5 * 60) {
                                //     ZegoUIKitPrebuiltCallService.hangUp();
                                // }
                            },

                        },
                        onCallEnd: (callID, reason, duration) => {
                            console.log('########CallWithInvitation onCallEnd duration', callID, reason, duration);
                            console.log('########CallWithInvitation onCallEnd inviter', userID);
                            console.log('########CallWithInvitation onCallEnd invitee', data);
                            const { invitees,type } = data

                            if (invitees) {

                                const userInfo = {
                                    id: userID,
                                    fullname: userName,
                                    avatar: avatar
                                }
                                const createMessage = {
                                    message: 'call'
                                }

                                invitees.forEach(item => {
                                    const invitee =typeof item === 'object' ?  item.user_id : item  
                                    if(type === 0){
                                        MessageFactory.newMessageAudioCall(userInfo, createMessage).PostMessage({ sender: userID, receiver: invitee })
                                    }else{
                                        MessageFactory.newMessageVideoCall(userInfo, createMessage).PostMessage({ sender: userID, receiver: invitee })

                                    }
                                });
                            }

                            ZegoUIKitPrebuiltCallService.hangUp();
                            navigation.goBack();
                        },
                    };
                },
                notifyWhenAppRunningInBackgroundOrQuit: true,
                isIOSSandboxEnvironment: true,
            }

        ).then(() => {
            console.log("logging in user Utils Successs:");

            ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
                message: 'Chúng tôi cần sự đồng ý của bạn đối với các quyền sau để sử dụng đúng chức năng cuộc gọi ngoại tuyến',
                allow: 'Cho phép',
                deny: 'Từ chối',
            });
        });

    } catch (error) {
        console.error("Error logging in user Utils:", error);
    }
};

export const onUserLogout = async () => {
    return ZegoUIKitPrebuiltCallService.uninit();

};
