import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React from 'react'

const UploadImage = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imageView}>
                <View style={styles.image}>
                    <Image source={require('../../../../media/quyet_icon/event.jpg')} style={styles.imageE}/>
                </View>
                <View style={styles.imageButton}>
                    <Image source={require('../../../../media/quyet_icon/add-picture_.png')} style={styles.imageAdd}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default UploadImage

const styles = StyleSheet.create({
    container:{
        marginHorizontal:24,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'gray',
        borderRadius: 24,
        height:200,

    },
    imageView:{
        height:'100%',
        width:'100%',
    },
    image:{
        height:'100%',
        width:'100%',
    },
    imageE:{
        height:'100%',
        width:'100%',
    },
    imageButton:{
        backgroundColor:'#FFF',
        height: 34,
        width:34,
        position:'absolute',
        borderRadius: 50,
        right:20,
        bottom:20,
        alignItems:'center',
        justifyContent:'center'
    },
    imageAdd:{
        height:28,
        width:28
    },

})