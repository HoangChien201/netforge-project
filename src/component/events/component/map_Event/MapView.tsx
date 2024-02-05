import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MapView = () => {
    return (
        <View style={styles.container}>
            <Text>Map_view</Text>
        </View>
    )
}

export default MapView

const styles = StyleSheet.create({
    container:{
        backgroundColor:'gray',
        opacity:0.2,
        height:'100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
})