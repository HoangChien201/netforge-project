import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'

const NumberOfFollow = () => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.txtNumber}>999</Text>
                <Text style={styles.txtFollow}>Following</Text>
            </View>
            
            <View style={styles.verticalLine}></View>

            <View style={styles.textContainer}>
                <Text style={styles.txtNumber}>1000</Text>
                <Text style={styles.txtFollow}>Followers</Text>
            </View>
            
        </View>
    )
}

export default NumberOfFollow

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#FFFFFF',
    },
    txtNumber: {
        fontSize:16,
        fontWeight: '500',
        lineHeight: 34,
        color: '#120D26',
    },
    txtFollow:{
        fontSize:14,
        fontWeight: '400',
        lineHeight: 23,
        color: '#747688',
    },
    verticalLine:{
        borderLeftWidth: 2, 
        borderLeftColor: '#DDD',
        height: '50%', 
        marginHorizontal:40,
    },
    textContainer: {
        alignItems:'center',
    },
})