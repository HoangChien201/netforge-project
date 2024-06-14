import React, { useContext } from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {useMyContext } from './UserContext'
import NetworkStack from '../stack/NetworkStack'
import LoginScreen from '../../screens/LoginScreen'
import SignupScreen from '../../screens/SignInScreen'
import ModalPoup from '../Modal/ModalPoup'
import UserStack from '../stack/UserStack'
import ListPorts from '../listpost/ListPorts'
import ItemPost from '../listpost/ItemPost'
import Test from '../storys/ProgressBar'
import TestProgress from '../storys/ProgressBarScreen'
import VideoPlayer from '../storys/ProgressBarScreen'
import Test2 from '../../screens/StoryScreen'
import StoryScreen from '../../screens/StoryScreen'
import ListStory from '../storys/ListStory'

export type navigationType=StackNavigationProp<RootStackParamList>
type routeType=RouteProp<{ params: { value: string } }, 'params'>
export type RootStackParamList = {

};
const ManageNavigation:React.FC = () => {

  const {user} = useMyContext();
  return (
    <NavigationContainer>
      
      {user ? <NetworkStack/> : <UserStack/>}
    </NavigationContainer>
  )
}

export default ManageNavigation