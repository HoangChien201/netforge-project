import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ImageIcon = (props) => {
    const { image, style,onPress } = props
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={style}>
              <Image source={image} />
            </View>
        </TouchableOpacity>

    )
}

export default ImageIcon
