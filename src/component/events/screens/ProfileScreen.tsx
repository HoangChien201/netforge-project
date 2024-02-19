import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import HeaderProfile from '../component/profile/HeaderProfile';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AboutScreen from './AboutScreen';
import ReviewScreen from './ReviewScreen';
import EventsScreen from './EventsScreen';

const Tab = createMaterialTopTabNavigator();
export type userType = {
  id: number;
  email: string;
  fullname: string;
  avatar: string;
  phone: number;
  role: number;
  gender: string;
  address: string;
  token: string
}

export const user: userType = {
  id: 1,
  email: 'test2@gmail.com',
  fullname: 'test2@gmail.com',
  avatar: 'https://res.cloudinary.com/delivery-food/image/upload/v1699211235/User-avatar.svg_spk0u7.png',
  phone: 232312312,
  role: 1,
  gender: 'string',
  address: '105 Lê Đức Thọ',
  token: 'string'
}
const ProfileScreen = (navigation: any) => {
  
  function TabCustomer() {
    return (
      <Tab.Navigator style={styles.tabNavigatorContainer}>
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    )
  }

  function TabEnterprise() {
    return (
      <Tab.Navigator style={styles.tabNavigatorContainer}>
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Reviews" component={ReviewScreen} />
      </Tab.Navigator>
    )
  }

  function TabAdmin() {
    return (
      <Tab.Navigator style={styles.tabNavigatorContainer}>
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
      </Tab.Navigator>
    )
  }

  const TabMain=useCallback(()=>{
    switch (user.role){
      case 1:
        return <TabAdmin/>
      case 2: 
        return <TabCustomer/>
      case 3: 
        return <TabEnterprise/>
    }
    
  },[])
  return (
    <View style={styles.container}>
      <HeaderProfile />
      <TabMain/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  tabNavigatorContainer: {

  },
  container: {
    flex: 1,
  }
})