import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import {COLOR} from '../../constant/color'
import { Colors } from 'react-native/Libraries/NewAppScreen'
const EmptyReq = () => {
    return (
        <View style={styles.container}>
            <Icon name='user-plus' size={80} color={COLOR.PrimaryColor} style={styles.icon}/>
            <Text style={styles.text1}>Lời mời kết bạn</Text>
            <Text style={styles.text2}>Khi mọi người gửi lời mời kết bạn, bạn sẽ thấy yêu cầu ở đây</Text>
        </View>
    )
}

export default EmptyReq

const styles = StyleSheet.create({
    container:{
        height:250,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    icon:{
        borderWidth: 4,
        borderColor:COLOR.PrimaryColor,
        padding:20,
        borderRadius:500
    },
    text1:{
        fontSize:24,
        fontWeight:'600',
        color:'black'
    },
    text2:{
        fontSize:16,
        fontWeight:'400',
        color:'black',
        marginHorizontal:16,
        textAlign:'center'
    }

})