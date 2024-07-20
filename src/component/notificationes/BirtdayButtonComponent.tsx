import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const BirtdayButtonComponent = ({onPress,setShowModalBirthday}:{onPress?:any,setShowModalBirthday:any}) => {
    const navigation=useNavigation()
    function OnPressHandle(){
        setShowModalBirthday(true)
    }
    return (
        <TouchableOpacity activeOpacity={.7} style={styles.container} onPress={onPress ? onPress : OnPressHandle}>
            <Image style={styles.icon} source={require('../../media/icon/cake.png')} />
            <View>
                <Text style={styles.text}>Sinh nhật</Text>
                <Text style={styles.detail}>Xem sinh nhật ngày hôm nay</Text>
            </View>
        </TouchableOpacity>
    )
}

export default BirtdayButtonComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:10
    },
    text: {
        fontSize:16,
        color:'#000',
        fontWeight:'500',

    },
    detail: {
        fontSize:13,
        color:'#7d7a7e'
    },
    icon: {
        marginEnd:15,
        width:44,
        height:44
    }
})