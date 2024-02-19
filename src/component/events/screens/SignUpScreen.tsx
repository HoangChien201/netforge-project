import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Form from '../component/signup/Form'
import ButtonLogin from '../component/login/ButtonLogin'
import ButtonFBGG from '../component/login/ButtonFBGG'

const SignUpScreen = () => {
    
  return (
    <View style={styles.container}>
       <View >
       <Image source={require('../../../media/icon/Back.png')} />
       </View>
      <View>
      <Text style={styles.LabelSignup}>Sign up</Text>
      </View>
      <Form/>
      <ButtonLogin text='SIGN UP'/>
      <Text style={{textAlign:'center',marginTop:30,marginBottom:30}}>OR</Text>
      <ButtonFBGG text='Sign in'/>
      
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container:{
        margin:24
    },
    LabelSignup:{
        color:'#120D26',
        fontWeight:'700',
        fontSize:24,
        marginTop:16
    }
})