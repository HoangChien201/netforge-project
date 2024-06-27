import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import LiveStack from '../stack/LiveStack'
import { ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'

export type RootStackParamList = {
    LiveWithZego: undefined,
    HostScreen: undefined,
    AudienceScreen: undefined
};

export type navigationType=StackNavigationProp<RootStackParamList>
type routeType=RouteProp<{ params: { value: string } }, 'params'>

const LiveNavigator:React.FC = () => {
  return (
    <NavigationContainer>
        <LiveStack/>
        <ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView />
    </NavigationContainer>
  )
}

export default LiveNavigator
