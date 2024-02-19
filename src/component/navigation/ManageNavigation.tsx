import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer, NavigationProp, RouteProp } from '@react-navigation/native'
import UserStack from '../stack/UserStack'
import GroceryStack from '../stack/EventStack'
import { StackNavigationProp } from '@react-navigation/stack'
import EventStack from '../stack/EventStack'
import { Todo, UserContext, useMyContext } from './UserContext'
import { To } from '@react-navigation/native/lib/typescript/src/useLinkTo'

export type navigationType=StackNavigationProp<RootStackParamList>
type routeType=RouteProp<{ params: { value: string } }, 'params'>
export type RootStackParamList = {

};
const ManageNavigation:React.FC = () => {
  const {user} = useMyContext();
  return (
    <NavigationContainer>
      {user ? <EventStack/>:<UserStack/>}
    </NavigationContainer>
  )
}

export default ManageNavigation