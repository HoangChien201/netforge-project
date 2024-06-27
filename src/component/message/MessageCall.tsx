import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FilterIconCall } from './format/FilterIconMessage'

const MessageCall = ({type,sender}:{type:'audio'|'video',sender:boolean}) => {
    const icon=FilterIconCall(sender,type)
  return (
    <View pointerEvents='none' style={styles.container}>
        <View style={styles.iconWrapper}>
            <Image source={icon} />
        </View>
      <Text style={styles.text}>{type} Call</Text>
    </View>
  )
}

export default MessageCall

const styles = StyleSheet.create({
    text:{
        textTransform:'capitalize',
        fontWeight:'600',
        color:'#000',

    },
    iconWrapper:{
        width:40,
        height:40,
        borderRadius:40,
        alignItems:'center',
        justifyContent:"center",
        backgroundColor:'#ccc',
        marginHorizontal:10

    },
    container:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'rgba(225,225,225,.5)',
        padding:10,
        borderRadius:15
    }
})