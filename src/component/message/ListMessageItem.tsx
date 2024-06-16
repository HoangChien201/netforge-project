import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ListMessageItem = () => {
    const navigation = useNavigation()
    const onPress = () => {
        navigation.navigate('MessageScreen')
    }
    return (
        <TouchableOpacity onPress={onPress}>
            <View  style={styles.container} >
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={{ uri: 'https://res.cloudinary.com/delivery-food/image/upload/v1717925230/btywul9nnqtzlzjaawrx.jpg' }} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.name}>Hoàng Chiến</Text>
                    <Text style={styles.message}>ListMessageItem</Text>

                </View>
            </View>
        </TouchableOpacity>

    )
}

export default ListMessageItem

const styles = StyleSheet.create({
    message: {
        fontSize: 13,
        color: '#B4B5B1'
    },
    name: {
        fontSize: 18,
        color: '#000',
        fontWeight: '700'
    },
    content: {
        height: '100%',
        justifyContent: "space-evenly"
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60
    },
    avatarContainer: {
        height: 60,
        width: 60,
        marginEnd: 10
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60
    },
})