import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props ={
    title:string,
    content:string
}
const Tittle = (props:Props) => {
    const {title,content} = props
  return (
    <View style={styles.containerTittle}>
      <View><Text style={styles.title}>{title}</Text></View>
      <View><Text style={styles.content}>{content}</Text></View>
    </View>
  )
}

export default Tittle

const styles = StyleSheet.create({
    containerTittle:{
        marginTop:16,
        width:280,
       
    },
    title:{
        fontSize:26,
        color:'black',
        fontWeight:'500'
    },
    content:{
        marginTop:10,
        fontSize:16,
        color:'black',
        letterSpacing:1
    }
})