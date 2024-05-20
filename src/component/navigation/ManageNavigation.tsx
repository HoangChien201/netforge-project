import React, { useContext } from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {useMyContext } from './UserContext'
import NetworkStack from '../stack/NetworkStack'

export type navigationType=StackNavigationProp<RootStackParamList>
type routeType=RouteProp<{ params: { value: string } }, 'params'>
export type RootStackParamList = {

};
const ManageNavigation:React.FC = () => {
  return (
    <NavigationContainer>
      <NetworkStack/>
    </NavigationContainer>
  )
}

export default ManageNavigation