import {
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TestProfile from './TestProfile';
import { SafeAreaProvider,  } from 'react-native-safe-area-context';


const ProfileScreen: React.FC = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaProvider>
          <TestProfile/>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  
});
