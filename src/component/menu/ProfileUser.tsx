import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

const ProfileUser = () => {
    const user={
        avatar:'https://res.cloudinary.com/delivery-food/image/upload/v1717925230/btywul9nnqtzlzjaawrx.jpg',
        fullname:'Khách Hàng Tuyệt Vời',
        email:'test@gmail.com',
        phone:'012334234535',
        address:'105/45/14 đường số 59, phường 14, Gò Vấp'
    }
    return (
        <View style={styles.profileUser}>
            <Image source={{uri:user.avatar}} style={styles.avatar} />
            <View style={{flex:1}}>
                <Text style={styles.nameUser}>{user.fullname}</Text>
                <Text style={styles.detail}>{user?.email}</Text>
                <View style={styles.line}></View>
                <Text style={styles.detail}>{user?.phone}</Text>
                <View style={styles.line}></View>
                <Text style={styles.detail} numberOfLines={2}>{user.address}</Text>
            </View>
        </View>
    )
}

export default ProfileUser;

const styles = StyleSheet.create({
    profileUser: {
        borderRadius: 20,
        height: 155,
        backgroundColor: '#fff',
        flexDirection: "row",
        alignItems:'center',
        paddingHorizontal:18
    },
    avatar: {
        height: 93,
        width: 93,
        marginRight:16,
        borderRadius:10
    },
    nameUser: {
        fontWeight: '500',
        fontSize: 18,
        color: '#000'
    },
    detail:{
        fontWeight: '400',
        fontSize: 14,
        color: '#808080',
        width:'100%'
    },
    line:{
        height:0.5,
        width:'100%',
        marginVertical:5,
        backgroundColor:'#808080'
    }
})