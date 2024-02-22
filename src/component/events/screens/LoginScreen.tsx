import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { navigationType } from '../../navigation/ManageNavigation'
import TextLogin from '../component/login/TextLogin'
import TextInputLogin from '../component/login/TextInputLogin'
import Remember from '../component/login/Remember'
import ButtonLogin from '../component/login/ButtonLogin'
import ButtonFBGG from '../component/login/ButtonFBGG'

interface typeLogin {

}

export default function LoginScreen({ navigation }: { navigation: navigationType }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={require('../../../media/icon/logo-main.jpg')}></Image>
        </View>
        <TextLogin text='Đăng nhập' />
        <TextInputLogin />
        {/* <Remember /> */}
        <ButtonLogin text='Đăng nhập' navigation={navigation}/>
        {/* <Text style={{textAlign:'center',marginTop:30,marginBottom:30}}>OR</Text> */}
        {/* <ButtonFBGG text='Sign up'/> */}
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24
  },
  container: {
    marginHorizontal: 24,
    marginVertical: 24
  }

})