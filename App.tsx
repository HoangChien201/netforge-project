/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  LogBox,
  StatusBar,
} from 'react-native';
import ManageNavigation from './src/component/navigation/ManageNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import { Host } from 'react-native-portalize';
import RequestNotificationPermission from './src/permissions/RequestNotificationPermission';
import { registerRemoteNotificationsEvent } from './src/notifications/Events';
import PushNotification from 'react-native-push-notification';
import { Provider } from 'react-redux';
import store from './src/component/store/store';
import { navigate } from './src/component/navigation/NavigationRef';

function App(): React.JSX.Element {
  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        const { userInteraction, data } = notification;
        if (userInteraction) {
          switch (data.screen) {
            case 'ListMessageScreen':
              navigate('ListMessageScreen');
              break;
            case 'FriendScreen':
              navigate('FriendScreen');
              break;
            case 'FriendProfile':
              navigate('FriendProfile', { friendId: data.params });
              break;
            case 'CommentsScreen':
              navigate('CommentsScreen', { postId: data.params });
              break;
            case 'HomeScreen':
              navigate('HomeScreen');
              break;
              case 'NotificationScreen':
              navigate('NotificationScreen');
              break;
            default:
              console.log('Unknown screen:', data.screen);
          }
        }
      },
      requestPermissions: false,
    });
  }, []);
  useEffect(() => {
    RequestNotificationPermission()
  }, []);
  LogBox.ignoreLogs([
    '[Reanimated] Tried to modify key `reduceMotion` of an object which has been already passed to a worklet.',
  ]);
  LogBox.ignoreAllLogs(true);

  LogBox.ignoreLogs(['new NativeEventEmitter']);

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
          <Host>
            <ManageNavigation />
          </Host>
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App;
