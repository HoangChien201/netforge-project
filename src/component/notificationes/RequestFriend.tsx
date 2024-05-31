import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import  Icon from 'react-native-vector-icons/AntDesign'
import {COLOR} from '../../constant/color'
const RequestFriend = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.iconFriend} >
                <Icon name='adduser' size={24} color={COLOR.PrimaryColor}/>
            </View>
            <View style={styles.text}>
                <Text style={styles.text1}>Yêu cầu kết bạn</Text>
                <Text style={styles.text2}>Phê duyệt hoặc bỏ qua yêu cầu</Text>
            </View>
        </TouchableOpacity>
    )
}

export default RequestFriend

const styles = StyleSheet.create({
    container:{
        height: 54,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    iconFriend:{
        height:44,
        width:44,
        borderWidth:1,
        borderColor:COLOR.primary200,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        margin:6
    },
    text:{
        marginStart:10
    },
    text1:{
        fontSize:16,
        fontWeight:'500',
        fontStyle:"normal",
        color:'black'
    },
    text2:{
        fontSize:13,
        fontWeight:'300',
        fontStyle:"normal",
        color:'black'
    }
})