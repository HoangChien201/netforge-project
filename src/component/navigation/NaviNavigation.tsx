import React from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
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