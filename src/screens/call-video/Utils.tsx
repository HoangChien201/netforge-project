import * as ZIM from 'zego-zim-react-native';
// @ts-ignore
import ZegoUIKitPrebuiltCallService, { ZegoMenuBarButtonName } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import KeyCenter from './KeyCenter';
import { useNavigation } from '@react-navigation/native';
import { Image, View } from 'react-native';
import React from 'react';

export const onUserLogin = async (userID: string, userName: string) => {
    const navigation = useNavigation();
    return ZegoUIKitPrebuiltCallService.init(
    KeyCenter.appID,
    KeyCenter.appSign,
    userID,
    userName,
    [ZIM],
    {
      ringtoneConfig: {
        incomingCallFileName: 'zego_incoming.mp3',
        outgoingCallFileName: 'zego_outgoing.mp3',
      },
      avatarBuilder: ({ userInfo }) => {
        return (
          <View style={{ width: '100%', height: '100%' }}>
            <Image
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
              source={{ uri: `https://robohash.org/${userInfo.userID}.png` }}
            />
          </View>
        );
      },
      requireConfig: () => {
        return {
          timingConfig: {
            isDurationVisible: true,
            onDurationUpdate: (duration: any) => {
              if (duration === 10 * 60) {
                ZegoUIKitPrebuiltCallService.hangUp();
              }
            },
          },
          topMenuBarConfig: {
            buttons: [ZegoMenuBarButtonName.minimizingButton],
          },
        //   onWindowMinimized: () => {
        //     navigation.navigate('MessageScreen');
        //   },
        //   onWindowMaximized: () => {
        //     navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen');
        //   },
        };
      },
    }
  );
};

const onUserLogout = async () => {
    return ZegoUIKitPrebuiltCallService.uninit()
  }
