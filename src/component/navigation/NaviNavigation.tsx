import React, { useContext } from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {useMyContext } from './UserContext'
import NetworkStack from '../stack/NetworkStack'
import LoginScreen from '../../screens/LoginScreen'
import SignupScreen from '../../screens/SignInScreen'
import ModalPoup from '../Modal/ModalPoup'
import UserStack from '../stack/UserStack'
import NaviStack from '../stack/NaviStack'

export type navigationType=StackNavigationProp<RootStackParamList>
type routeType=RouteProp<{ params: { value: string } }, 'params'>
export type RootStackParamList = {

};
const NaviNagation:React.FC = () => {

  
  return (
    <NavigationContainer>
      <NaviStack/>
    </NavigationContainer>
  )
}

export default NaviNagation