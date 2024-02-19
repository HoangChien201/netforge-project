import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const IconButton = (props) => {
    const {name,size,color,onPress,style}=props;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={style}>
                <Icon name={name} size={size} color={color}/>
            </View>
        </TouchableOpacity>

    )
}

export default IconButton

const styles = StyleSheet.create({
    container:{

    }
})