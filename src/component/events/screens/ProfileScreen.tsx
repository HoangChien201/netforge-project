import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import HeaderProfile from '../component/profile/HeaderProfile';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AboutScreen from './AboutScreen';
import ReviewScreen from './ReviewScreen';
import EventsScreen from './EventsScreen';
import { useMyContext } from '../../navigation/UserContext';
import UserStack from '../../stack/UserStack';
import AdminBrowse from '../../admin/AdminBrowse';
import { useIsFocused, useNavigation } from '@react-navigation/native';

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

// export const user: userType = {
//   id: 1,
//   email: 'test2@gmail.com',
//   fullname: 'Văn Quyết',
//   avatar: 'https://res.cloudinary.com/delivery-food/image/upload/v1708573685/z5181915186782_111bdb1d9663127b18bac4f73f22243f_glbjc7.jpg',
//   phone: 232312312,
//   role: 3,
//   gender: 'string',
//   address: '105 Lê Đức Thọ',
//   token: 'string'
// }


const ProfileScreen = () => {
  const {user} = useMyContext();
  const isFocus=useIsFocused()

  const navigation=useNavigation()

  
  function TabCustomer() {
    return (
      // <Tab.Navigator style={styles.tabNavigatorContainer}>
      //   <Tab.Screen name="About" component={AboutScreen} />
      // </Tab.Navigator>
      <>
        <AboutScreen />
      </>
    )
  }

  function TabEnterprise() {
    return (
      <Tab.Navigator style={styles.tabNavigatorContainer}>

        <Tab.Screen name="About" component={AboutScreen}
          options={{
            title: 'Bài viết'
          }} />
        <Tab.Screen name="Events" component={EventsScreen}
          options={{
            title: 'Sự kiện'
          }} />
        {/* <Tab.Screen name="Reviews" component={ReviewScreen} /> */}
      </Tab.Navigator>
    )
  }

  function TabAdmin() {
    return (
      <AdminBrowse/>
    )
  }

  const TabMain = useCallback(() => {
    
    switch (user.role) {
      case 1:
        return <TabAdmin />
      case 2:
        return <TabCustomer />
      case 3:
        return <TabEnterprise />
    }

  }, [isFocus])

  function NotUser(){
    function GoLogin(){
      navigation.navigate('UserStack')
    }
    return (
      <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
        <Button title='Đăng nhập' onPress={GoLogin}></Button>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {
        user ? <TabMain /> : <NotUser/>
      }
      
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