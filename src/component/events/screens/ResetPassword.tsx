import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Tittle from '../component/otp/Tittle'
import TextInputLogin from '../component/login/TextInputLogin'
import Input from '../component/login/Input'
import ButtonLogin from '../component/login/ButtonLogin'

const ResetPassword = () => {
    const content:string='Please enter your email address to request a password reset'
  return (
    <View style={styles.container}>
    <View>
      <Image source={require('../../../media/icon/Back.png')}/>
    </View>
    <Tittle title='Reset Password' content={content}/>
    <View style={{marginTop:20}}>
        <Input iconE={true} placeholder='abc@gmail.com'/>
    </View>
    <ButtonLogin text='SEND' />
  </View>
  )
}

export default ResetPassword

const styles = StyleSheet.create({
    container:{
        margin:24,
        flex:1,
        backgroundColor:'#fff'
    }
})