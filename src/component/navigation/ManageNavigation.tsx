import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer, NavigationProp, RouteProp } from '@react-navigation/native'
import UserStack from '../stack/UserStack'
import GroceryStack from '../stack/EventStack'
import { StackNavigationProp } from '@react-navigation/stack'
import EventStack from '../stack/EventStack'

export type navigationType=StackNavigationProp<RootStackParamList>
type routeType=RouteProp<{ params: { value: string } }, 'params'>
export type RootStackParamList = {

};
const ManageNavigation = () => {
  return (
    <NavigationContainer>
      <EventStack/>
    </NavigationContainer>
  )
}

export default ManageNavigation