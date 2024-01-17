import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native'
import React, { useState } from 'react'



const TextInputLogin = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={{marginBottom:5}}>
        <TextInput style={styles.passwordInput} value={username} onChangeText={setUsername} placeholder='abc@gmail.com' />
        <Image style={styles.iconMail} source={require('../../../../media/icon/Mail.png')} />
      </View>
      <View>
        <TextInput style={styles.passwordInput} secureTextEntry={true} value={password} onChangeText={setPassword} placeholder='Your password' />
        <Image style={styles.iconMail} source={require('../../../../media/icon/Password.png')} />
        <Image style={{end:10,position:'absolute',top:20}} source={require('../../../../media/icon/Eye.png')} />
      </View>

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
    paddingHorizontal:45
    
  },
  container: {
    marginTop: 13
  },
  iconMail:{
   position:'absolute',
    top:20,
    start:10
  }
})