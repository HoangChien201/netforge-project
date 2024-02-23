import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'



const TextInputLogin = ({email,password,updateValue}:{email:string,password:string,updateValue:any}) => {
  
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Input value={email} onChangeText={updateValue.bind(this,'email')} placeholder='abc@gmail.com'  iconE={true}  />
      <Input value={password} onChangeText={updateValue.bind(this,'password')} placeholder='Mật khẩu'  iconP={true} iconPass={true}  />
    </KeyboardAvoidingView>

  )
}

export default TextInputLogin

const styles = StyleSheet.create({
  passwordInput: {
    height: 56,
    marginTop: 4,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#9BA4B5',
    marginVertical: 10,
    paddingHorizontal: 45

  },
  container: {
    marginTop: 13
  },
  iconMail: {
    position: 'absolute',
    top: 20,
    start: 10
  }
})