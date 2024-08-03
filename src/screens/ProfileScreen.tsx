import {
  StyleSheet,
} from 'react-native';
import React from 'react';
import TestProfile from './TestProfile';
import { SafeAreaProvider,  } from 'react-native-safe-area-context';


const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaProvider>
          <TestProfile/>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  
});
