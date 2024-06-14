import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import ProfileStack from '../stack/ProfileStack'

export type navigationType=StackNavigationProp<RootStackParamList>
type routeType=RouteProp<{ params: { value: string } }, 'params'>
export type RootStackParamList = {

};

const ProfileNavigator:React.FC = () => {
  return (
    <NavigationContainer>
        <ProfileStack/>
    </NavigationContainer>
  )
}

export default ProfileNavigator

const styles = StyleSheet.create({})