import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import UploadImage from '../component/createNewEvent/UploadImage'
import Body from '../component/createNewEvent/Body'
const CreateNewEventScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerShow}>
                <Text style={styles.headerText}>Create New Event</Text>
                <TouchableOpacity style={styles.headerButtonCancel}>
                <Image source={require('../../../media/icon/ring_icon.png')} />
                </TouchableOpacity>
            </View>
            <UploadImage></UploadImage>
            <Body></Body>
            <TouchableOpacity style={styles.pushEvent}>
                <Text style={styles.pushEventText}>Create Event</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateNewEventScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        height:'100%'
    },
    headerShow:{
        marginHorizontal:24,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        height:50
    },
    headerText:{
        color: '#120D26',
        fontFamily: 'Airbnb Cereal App',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 25
    },
    headerButtonCancel:{
        backgroundColor:'gray',
        borderRadius:50,
        height:28,
        width:28,
        alignItems:'center',
        justifyContent:'center'
    },
    pushEvent:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'blue',
        borderRadius:24,
        height: 48,
        marginHorizontal:'5%',
        position:'absolute',
        bottom:20,
        width:'90%'

    },
    pushEventText:{
        color: '#FFF',
        fontFamily: 'Airbnb Cereal App',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 25
    }
})