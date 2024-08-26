import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { getUSerByID } from '../../http/PhuHTTP';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import SkeletonUserMenu from '../skeleton-placeholder/SkeletonUserMenu';
import { setUsers } from '../store/userSlice';

interface User {
    email: string;
    fullname: string;
    dateOfBirth: any | null;
    phone: null | number;
    address: null | string;
    avatar: string | null;
    gender: string | null;
}

const ProfileUser = () => {
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const user = useSelector((state : RootState)=>state.user.value)

    const handleToProfileScreen = () => {
        navigation.navigate(ProfileRootStackEnum.ProfileScreen);
    };

    return (
        <TouchableOpacity onPress={handleToProfileScreen}>
                <View style={styles.profileUser}>
                    <Image
                        source={user && user.avatar ? { uri: user.avatar } : require('../../media/icon/avatar.png')}
                        style={styles.avatar}
                    />
                    <View style={{ flex: 1 }}>
                        {user && (
                            <Text style={styles.nameUser}>{user.fullname}</Text>
                        )}
                        {user && (
                            <Text style={styles.detail}>{user.email}</Text>
                        )}
                        {user?.phone && (
                            <>
                                <View style={styles.line}></View>
                                <Text style={styles.detail}>{user.phone}</Text>
                            </>
                        )}
                        {user?.address && (
                            <>
                                <View style={styles.line}></View>
                                <Text style={styles.detail} numberOfLines={2}>{user.address}</Text>
                            </>
                        )}
                    </View>
                </View>
        </TouchableOpacity>
    );
};

export default ProfileUser;

const styles = StyleSheet.create({
    profileUser: {
        borderRadius: 20,
        height: 160,
        backgroundColor: '#fff',
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop:10
    },
    avatar: {
        height: 93,
        width: 93,
        marginRight: 16,
        borderRadius: 10,
        borderWidth:5,
        borderColor:'#ddd'
    },
    nameUser: {
        fontWeight: '500',
        fontSize: 18,
        color: '#000',
    },
    detail: {
        fontWeight: '400',
        fontSize: 14,
        color: '#808080',
        width: '100%',
    },
    line: {
        height: 0.5,
        width: '100%',
        marginVertical: 5,
        backgroundColor: '#808080',
    },
});
