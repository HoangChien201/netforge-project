import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { COLOR } from '../../constant/color'
import { useNavigation } from '@react-navigation/native'
import { postLocalNotification } from '../../notifications/Events'
import { onUserLogin } from '../../screens/call-video/Utils';
// @ts-ignore
import  ZegoUIKitPrebuiltCallService,{ ZegoSendCallInvitationButton,ZegoMenuBarButtonName } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import KeyCenter from '../../screens/call-video/KeyCenter'
import * as ZIM from 'zego-zim-react-native';
import { socket } from '../../http/SocketHandle'
import { multiply } from 'lodash'

const HeaderMessageComponent = ({ partner }: { partner: any }) => {
    const navigation = useNavigation()
    const [invitees, setInvitees] = useState<string>();
    const [userID, setUserID] = useState('');
    

    // useEffect(() => {
    //     onUserLogin(partner.id, partner.fullname);
    //     return () => {
    //         onUserLogout();
    //     };
    // }, []);

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
                    sender:2,
                    multiple:true
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
                    <IconButton name='phone-in-talk' size={20} color='#fff' type='call' />
                    <IconButton name='video-call' size={20} color='#fff' type='video' />
                    {/* <ZegoSendCallInvitationButton
                        invitees={[{ userID: partner.id, userName: partner.fullname }]}
                        isVideoCall={false}
                        resourceID={"Zego_call"}
                        backgroundColor={'rgba(255,255,255,0.2)'}
                        
                        
                    />
                    <ZegoSendCallInvitationButton
                        invitees={[{ userID: partner.id, userName: partner.fullname }]}
                        isVideoCall={true}
                        backgroundColor={'rgba(255,255,255,0.2)'}
                        //icon={require('../../media/icon/video_call.png')}
                    /> */}
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

function onUserLogout() {
    throw new Error('Function not implemented.')
}
