import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Calender from './Calender'
import Getlocation from './Getlocation'
import Information from './Information'
const Body = () => {
    return (
        <ScrollView style={styles.container}>
            <Calender/>
            <Information></Information>
        </ScrollView>
    )
}

export default Body

const styles = StyleSheet.create({
    container:{
        marginHorizontal:24,
        height:'auto'
    },
})