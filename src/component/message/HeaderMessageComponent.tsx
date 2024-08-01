import React from 'react'
import { Image, StyleSheet, Text,  View } from 'react-native'
import { useRoute } from '@react-navigation/native'
// @ts-ignore
import { ZegoSendCallInvitationButton } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { useMyContext } from '../navigation/UserContext'
import { MessageScreenRouteProp } from '../../screens/message/MessageScreen'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
type InviteeType={
    userID:string,
    userName:string
}


const HeaderMessageComponent = ({ partner }: { partner: any }) => {

    const route: MessageScreenRouteProp = useRoute()
    const { fullname, avatar, members } = route.params;
    const user = useSelector((state : RootState)=>state.user.value)
    const invitees:Array<InviteeType>
                    =members.map(m=>{
                            return {
                                userID:m.user.id.toString(),
                                userName:m.user.fullname
                            }
                        
                    }).filter(invitee=>invitee.userID !== user?.id?.toString())
                    console.log('invitees',invitees);
                    

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
                        isVideoCall={false}
                        backgroundColor={'rgba(255,255,255,0.2)'}
                        icon={require('../../media/icon/telephone-call.png')}

                    />
                    <ZegoSendCallInvitationButton
                        invitees={invitees}
                        isVideoCall={true}
                        backgroundColor={'rgba(255,255,255,0.2)'}
                        // resourceID={"zego_call"}
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


