import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import ProfileStack from '../stack/ProfileStack'

export type RootStackParamList = {
  ProfileScreen: { userId: any };
  EditProfileScreen: undefined;
  SettingScreen: undefined;
  HistoryActivityScreen: undefined;
  HelpScreen: undefined;
  NaviStack: undefined;
  MenuScreen: undefined;
  ChangePassword: undefined;
  QRcodeScreen: undefined;
  Scanner: undefined;
  Friends: undefined;
};

export type navigationType=StackNavigationProp<RootStackParamList>
type routeType=RouteProp<{ params: { value: string } }, 'params'>

const ProfileNavigator:React.FC = () => {
  return (
    <NavigationContainer>
        <ProfileStack/>
    </NavigationContainer>
  )
}

export default ProfileNavigator
