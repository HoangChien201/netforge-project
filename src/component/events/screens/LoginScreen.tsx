import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { navigationType } from '../../navigation/ManageNavigation'
import TextLogin from '../component/login/TextLogin'
import TextInputLogin from '../component/login/TextInputLogin'
import Remember from '../component/login/Remember'
import ButtonLogin from '../component/login/ButtonLogin'
import ButtonFBGG from '../component/login/ButtonFBGG'

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../media/icon/Logon.png')}></Image>
      </View>
     <TextLogin text='Sign in'/>
     <TextInputLogin/>
     <Remember/>
     <ButtonLogin/>
     <ButtonFBGG/>
    </View>

  )
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24
  },
  container:{
    marginHorizontal:24,
    marginVertical:24
  }
 
})