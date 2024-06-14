import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constant/color'

const MessageText = ({ text,sender }: { text: string,sender:boolean }) => {
    return (
        <View style={[styles.container,{backgroundColor:sender ? COLOR.backgroundMessageSender : COLOR.backgroundMessageReceier}]}>
            <Text style={[styles.text,{color:sender ? '#fff' : '#000'}]}>{text}</Text>
        </View>
    )
}

export default MessageText

const styles = StyleSheet.create({
    text: {
        color:'#fff',
        fontSize:15,
        fontWeight:'500'
    },
    container: {
        paddingVertical:15,
        paddingHorizontal:12,
        width:'100%',
        borderRadius:10
    },
})