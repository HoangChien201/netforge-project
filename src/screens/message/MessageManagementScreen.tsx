// Import React Hooks
import { createStackNavigator } from '@react-navigation/stack';
import React, { useRef, useState, useEffect } from 'react';

import { PermissionsAndroid, Platform, Switch, TouchableOpacity } from 'react-native';
// Import user interface elements
import {
  StyleSheet,
} from 'react-native';

// @ts-ignore
import {ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen,} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { useFocusEffect } from '@react-navigation/native';
import MessageScreen from './MessageScreen';
const Stack=createStackNavigator()
const MessageManagementScreen = ({navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });

      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: '#1F1F2F',
            margin: 20,
            borderRadius: 15,
          },
        });
      };
    }, [navigation])
  );
  return (
    <Stack.Navigator>
      <Stack.Screen name='MessageScreen' component={MessageScreen} options={{headerShown:false}}/>
      <Stack.Screen name='ZegoUIKitPrebuiltCallWaitingScreen' component={ZegoUIKitPrebuiltCallWaitingScreen} options={{headerShown:false}}/>
      <Stack.Screen name='ZegoUIKitPrebuiltCallInCallScreen' component={ZegoUIKitPrebuiltCallInCallScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )

};



export default MessageManagementScreen;
// Define user interface styles
const styles = StyleSheet.create({
  
});