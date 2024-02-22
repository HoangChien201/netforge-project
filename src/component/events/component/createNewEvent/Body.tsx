import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Calender from './Calender'
import Getlocation from './Getlocation'
import FormCreateEvent from './FormCreateEvent'
import { EventRequest } from '../../screens/CreateNewEventScreen'
const Body = ({onUpdate,value}:{onUpdate:any,value:EventRequest}) => {
    return (
        <View style={styles.container}>
            {/* <Calender/> */}
            <FormCreateEvent onUpdate={onUpdate} value={value}></FormCreateEvent>
        </View>
    )
}

export default Body

const styles = StyleSheet.create({
    container:{
        height:'auto'
    },
})