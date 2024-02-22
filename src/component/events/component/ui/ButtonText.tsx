import { StyleSheet, StyleSheetProperties, Text, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native'
import React from 'react'

interface ButtonTextProps{
    style:any,
    text:string,
    textColor?:string,
    opacity?:number,
    onPress?:any
}

const ButtonText:React.FC<ButtonTextProps> = ({style,text,textColor,opacity,onPress}) => {
  return (
    <TouchableOpacity style={[styles.container,style]} activeOpacity={opacity} onPress={onPress}>
      <Text style={[styles.text,{color:textColor}]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonText

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:'center'
    },
    text:{
        color:'#000',
        fontWeight:'600',
        fontSize:18
    }
})