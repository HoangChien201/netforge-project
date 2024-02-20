/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ManageNavigation from './src/component/navigation/ManageNavigation';
import { UserProvider } from './src/component/navigation/UserContext';

function App(): React.JSX.Element {
  return (
    <>
      <UserProvider>
        <ManageNavigation />
      </UserProvider>
    </>
  )
}

export default App;
