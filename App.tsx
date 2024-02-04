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
import Modalshare from './src/component/events/component/modal/ModalShare';


function App(): React.JSX.Element {
  return (
    <>
      <ManageNavigation/>
      
    
    </>
  );
}

export default App;
