import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface TextPressProps{
    text:string,
    style?:TextStyle
}

const TextPress:React.FC<TextPressProps> = ({text,style}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={[styles.text,style]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default TextPress

const styles = StyleSheet.create({
    container:{

    },
    text:{
        color:'#747688',
        fontSize:14
    }
})