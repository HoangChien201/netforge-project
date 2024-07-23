import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { COLOR } from '../../constant/color'
import { useNavigation, useRoute } from '@react-navigation/native'
import { postLocalNotification } from '../../notifications/Events'
import { onUserLogin, onUserLogout } from '../../screens/call-video/Utils';
// @ts-ignore
import ZegoUIKitPrebuiltCallService, { ZegoSendCallInvitationButton, ZegoMenuBarButtonName } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { socket } from '../../http/SocketHandle'
import { multiply } from 'lodash'
import { useMyContext } from '../navigation/UserContext'
import { MessageScreenRouteProp } from '../../screens/message/MessageScreen'
import KeyCenter from '../../screens/call-video/KeyCenter'
import * as ZIM from 'zego-zim-react-native';
type InviteeType={
    userID:string,
    userName:string
}


const HeaderMessageComponent = ({ partner }: { partner: any }) => {
    const navigation = useNavigation()
    // const [invitees, setInvitees] = useState<string>();
    // const [userID, setUserID] = useState('');

    function IconButton({ name, size, color, type }: { name: string, size: number, color: string, onPress?: any, type: string }) {
        function OptionOnPress() {
            //handle call
            if (type === 'call') {
                console.log('call');
                return
            }

            //handle video call
            console.log('video');
            socket.emit('notification', {

                body: "Local notification!",
                title: "Local Notification Title",
                userInfo: {
                    sender: 2,
                    multiple: true
                },
                fireDate: new Date(),

            })
            // postLocalNotification({
            //     body: "Local notification!",
            //     title: "Local Notification Title",
            //     sound: "chime.aiff",
            //     silent: false,
            //     category: "SOME_CATEGORY",
            //     userInfo: {},
            //     fireDate: new Date(),
            // })
        }

        return (
            <TouchableOpacity onPress={OptionOnPress} style={styles.option}>
                <MaterialIcon name={name} size={size} color={color} />
            </TouchableOpacity>
        )
    }

    //*******type member********
    // members:Array<{
    //     user:{
    //         fullname:string,
    //         avatar:string,
    //         id:number
    //     }
    // }>

    const route: MessageScreenRouteProp = useRoute()
    const { fullname, avatar,members } = route.params;
    const { user } = useMyContext();
    const invitees:Array<InviteeType>
                    =members.map(m=>{
                            return {
                                userID:m.user.id.toString(),
                                userName:m.user.fullname
                            }
                        
                    }).filter(invitee=>invitee.userID !== user.id.toString())
    console.log('invitees',invitees);
    
    // const id_invitee = members[0].user.id?.toString();
    // const [invitees, setInvitees]
    //     = useState<Array<
    //         {
    //             userID: string,
    //             userName: string
    //         }>>([]);

    //call-begin
    useEffect(() => {
        if (invitees.length > 0) return

        // setInvitees([{ userID: id_invitee, userName: fullname }]);
        const initializeCallService = async () => {
            // try {
            //     await onUserLogin(user.id, user.fullname, avatar,useNavigation());
            //     console.log("User logged in successfully:", user.id, user.fullname);
            // } catch (error) {
            //     console.error("Error logging in user headerMessage:", error);
            // }
            try {
                await ZegoUIKitPrebuiltCallService.init(
                    KeyCenter.appID,
                    KeyCenter.appSign,
                    user.id.toString(),
                    user.fullname.toString(),
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
                                    navigation.goBack();
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
        initializeCallService();
        return () => {
            onUserLogout();
            console.log("User logged out");
            console.log("id ng gọi: ", user.id)
        };
    }, [invitees, fullname]);
    //call-end

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: "space-between"
            }}>
                <View style={styles.userContainer} >
                    <View style={styles.avatarContainer}>
                        {
                            partner.avatar &&
                            <Image style={styles.avatar} source={{ uri: partner.avatar }} />
                        }

                    </View>
                    <View style={styles.content}>
                        <Text style={styles.name}>{partner.fullname}</Text>
                    </View>
                </View>

                <View style={styles.options}>
                    <ZegoSendCallInvitationButton
                        invitees={invitees}
                        props={navigation}
                        resourceID={"zego_call"}
                        backgroundColor={'rgba(255,255,255,0.2)'}
                        icon={require('../../media/icon/telephone-call.png')}

                    />
                    <ZegoSendCallInvitationButton
                        invitees={invitees}
                        isVideoCall={true}
                        backgroundColor={'rgba(255,255,255,0.2)'}
                        resourceID={"zego_call"}
                        icon={require('../../media/icon/facetime-button.png')}
                    />
                </View>
            </View>
        </View>
    )
}

export default HeaderMessageComponent

const styles = StyleSheet.create({
    option: {
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255,255,255,0.2)"
    },
    options: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: 90
    },
    name: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '700'
    },
    content: {
        height: '100%',
        justifyContent: "center"
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    avatarContainer: {
        height: 50,
        width: 50,
        marginEnd: 10
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60
    },
    container: {
        height: 130,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 10
    }
})


