import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TextLogin = ({text}:{text:string}) => {
  return (
    <View>
      <Text style={styles.textSignIn}>{text}</Text>
    </View>
  )
}

export default TextLogin

const styles = StyleSheet.create({
    textSignIn:{
        color:'#120D26',
        fontWeight:'700',
        fontSize:24
      }
})