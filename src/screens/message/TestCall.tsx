import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ZegoUIKitPrebuiltCallService, { ZegoSendCallInvitationButton, ZegoMenuBarButtonName } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { useMyContext } from '../../component/navigation/UserContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../component/store/store';
const TestCall = () => {
const user = useSelector((state:RootState)=>state.user.user)

    const invitees=[{
        userID: user.id ===9 ? '9' : '2',
        userName: user.id ===9 ? "Phu" : "Chien"
    }]
    console.log('invitees',invitees);
    
  return (
    <View style={{flex:1}}>
      <View style={styles.options}>
                    <ZegoSendCallInvitationButton
                        invitees={invitees}
                        isVideoCall={false}
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
  )
}

export default TestCall

const styles = StyleSheet.create({})