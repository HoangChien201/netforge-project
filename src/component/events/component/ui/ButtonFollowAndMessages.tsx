import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const ButtonFollowAndMessages = () => {

    return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.buttonFollowContainer}>
            <Image source={require('../../../../media/icon/user-plus.png')} style={styles.buttonFollowIcon} />
            <Text style={styles.textFollow}>Follow</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonMassagesContainer} >
            <Image source={require('../../../../media/icon/message-circle.png')} style={styles.buttonMassagesIcon} />
            <Text style={styles.textMassages}>Massages</Text>
        </TouchableOpacity>
    </View>
    );
};

export default ButtonFollowAndMessages;

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent:'center',
        marginTop: 20,
        marginBottom:10,
    },
    buttonFollowContainer: {
        width: 150,
        height:50,
        alignItems: 'center',
        backgroundColor: '#5669FF',
        padding: 10,
        borderRadius:10,
        flexDirection: 'row',
        justifyContent:'center'

    },
    buttonFollowIcon: {

    },
    textFollow: {
        color: '#FFFFFF',
        fontSize:16,
        lineHeight:25,
        fontWeight: "400",
        marginLeft: 14
    },

    buttonMassagesContainer: {
        width: 150,
        height:50,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius:10,
        borderStyle:'solid',
        borderColor:'#5669FF',
        borderWidth: 1.5,
        flexDirection: 'row',
        justifyContent:'center',
        marginLeft:15,
    },
    buttonMassagesIcon: {

    },
    textMassages: {
        color: '#5669FF',
        fontSize:16,
        lineHeight:25,
        fontWeight: "400",
        marginLeft: 14
    },
});
