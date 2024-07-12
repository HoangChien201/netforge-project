import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import CreatePostStack from '../stack/ProfileStack'
import LiveStack from '../stack/LiveStack'
import { ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'

export type RootStackParamList = {
  HomeScreen: undefined;
  LiveStack: undefined;
  CreatePostScreen: undefined;
};

export type navigationType=StackNavigationProp<RootStackParamList>
type routeType=RouteProp<{ params: { value: string } }, 'params'>

const CreatePostNavigator:React.FC = () => {
  return (
    <NavigationContainer>
        <CreatePostStack/>
        <LiveStack/>
        {/* <ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView /> */}
    </NavigationContainer>
  )
}

export default CreatePostNavigator
