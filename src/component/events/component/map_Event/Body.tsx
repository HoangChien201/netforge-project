import { StyleSheet, Text, View,ImageProps } from 'react-native'
import React from 'react'
import MapSeach from './MapSeach'
import Mapcategories from './MapCategories'
import MapEventItem from './MapEventItem'

const Body = () => {
    return (
        <View style={styles.container}>
            <MapSeach />
            <Mapcategories />
        </View>
    )
}

export default Body

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    categoryComponent: {
        position: 'absolute',
        top: '25%',
        zIndex: 10,
        backgroundColor: 'gray'
    }
})