/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';
import ManageNavigation from './src/component/navigation/ManageNavigation';
import { UserProvider } from './src/component/navigation/UserContext';
import { Host } from 'react-native-portalize';
import RequestNotificationPermission from './src/permissions/RequestNotificationPermission';
import { registerRemoteNotificationsEvent } from './src/notifications/Events';

function App(): React.JSX.Element {
  useEffect(()=>{
    RequestNotificationPermission()

    registerRemoteNotificationsEvent()
  })
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <UserProvider>
        <Host>
          <ManageNavigation />
        </Host>
      </UserProvider>
    </>
  )
}

export default App;
