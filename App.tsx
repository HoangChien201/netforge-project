/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  LogBox,
  StatusBar,
  Text,
  View,
} from 'react-native';
import ManageNavigation from './src/component/navigation/ManageNavigation';
import { UserProvider } from './src/component/navigation/UserContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import { Host } from 'react-native-portalize';
import RequestNotificationPermission from './src/permissions/RequestNotificationPermission';
import { registerRemoteNotificationsEvent } from './src/notifications/Events';

function App(): React.JSX.Element {
  useEffect(()=>{
    RequestNotificationPermission()
    registerRemoteNotificationsEvent()
  });
  LogBox.ignoreLogs([
    '[Reanimated] Tried to modify key `reduceMotion` of an object which has been already passed to a worklet.',
  ]);

  return (
   <GestureHandlerRootView>
    <StatusBar barStyle="dark-content" backgroundColor="transparent"/>
      <UserProvider>
        <Host>
          <ManageNavigation />
          <ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView />
        </Host>
      </UserProvider>
   </GestureHandlerRootView>
  )
}

export default App;
