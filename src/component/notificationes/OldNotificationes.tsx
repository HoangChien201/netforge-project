import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLOR } from '../../constant/color'
import ItemComment from './ItemComment'
import ItemFriend from './ItemFriend'
const OldNotificationes = () => {
    return (
        <View>
            <Text style={styles.headerText}>Cũ hơn</Text>
            <TouchableOpacity style={styles.container}>
            <ItemComment/>
            <ItemFriend/>
            </TouchableOpacity>
        </View>
    )
}

export default OldNotificationes

const styles = StyleSheet.create({
    container: {
        height: 54,
        flexDirection: 'column',
    },
    headerText:{
        fontSize: 18,
        fontWeight: '400',
        fontStyle: "normal",
        color: 'black',
        marginStart:5
    }
})