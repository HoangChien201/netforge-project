
import { StyleSheet, Text, TextInput, TouchableOpacity, View ,Image} from 'react-native'
import React from 'react'

const MapSeach = () => {
    return (
        <View style={styles.container}>
            <View style={styles.inputText}>
                <Image source={require('../../../../media/quyet_icon/Location.png')}/>
                <TextInput placeholder='Nhập ở đây'>

                </TextInput>
            </View>
            <TouchableOpacity style={styles.location}>
                <Image source={require('../../../../media/quyet_icon/Location.png')}/>
            </TouchableOpacity>
        </View>
    )
}

export default MapSeach

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        height:51,
        zIndex:1,
        top:25,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    inputText:{
        height:'100%',
        width:'80%',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    location:{
        height:51,
        width:51,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginStart:15
    },

})