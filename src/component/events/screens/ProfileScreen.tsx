import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderProfile from '../component/profile/HeaderProfile';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AboutScreen from './AboutScreen';
import ReviewScreen from './ReviewScreen';
import EventsScreen from './EventsScreen';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = (navigation: any) => {
  return (
    <View style={styles.container}>
      <HeaderProfile/>
      <Tab.Navigator style={styles.tabNavigatorContainer}>
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Reviews" component={ReviewScreen} />
      </Tab.Navigator>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  tabNavigatorContainer: {
    
  },
  container: {
    flex:1,
    
  }
})