import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextPress from './TextPress'

interface TitleBarProps{
    title:string
}

const TitleBarComponent:React.FC<TitleBarProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <TextPress text='See All'/>
    </View>
  )
}

export default TitleBarComponent

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:34,
        width:'100%',
        marginVertical:10
    },
    text:{
        fontSize:18,
        color:'#000',
        fontWeight:'600'
    }
})