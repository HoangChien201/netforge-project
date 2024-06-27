/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ManageNavigation from './src/component/navigation/ManageNavigation';
import { UserProvider } from './src/component/navigation/UserContext';
import { ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';

function App(): React.JSX.Element {
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="transparent"/>
      <UserProvider>
        <ManageNavigation />
        <ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView />
      </UserProvider>
    </>
  )
}

export default App;
