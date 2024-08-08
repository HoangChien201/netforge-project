import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import  Icon  from 'react-native-vector-icons/FontAwesome'



type IconItem = {
   
    style: any,
    onPress:()=>void,
    like?:boolean
   
}

const ButtonIcon: React.FC<IconItem> = ({ style, onPress, like }) => {
    return (
        <View>
            <TouchableOpacity style={style} onPress={onPress} >
               {
                like ? <Image source={require('../../media/Dicons/heart-red.png')} style={{width:23,height:23}}/>:<Image source={require('../../media/Dicons/heart.png')} style={{width:23,height:23}}/>
               }
            </TouchableOpacity>
        </View>
    )
}

export default ButtonIcon

const styles = StyleSheet.create({})