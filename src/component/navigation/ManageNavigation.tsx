import React, { useContext } from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import EventStack from '../stack/EventStack'
import {useMyContext } from './UserContext'
import AdminBrowse from '../admin/AdminBrowse'

export type navigationType=StackNavigationProp<RootStackParamList>
type routeType=RouteProp<{ params: { value: string } }, 'params'>
export type RootStackParamList = {

};
const ManageNavigation:React.FC = () => {
  return (
    <NavigationContainer>
      <EventStack/>
      {/* <AdminBrowse/> */}
    </NavigationContainer>
  )
}

export default ManageNavigation