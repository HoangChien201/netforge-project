import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useMyContext } from '../navigation/UserContext';
import { NavigationProp, ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { getUSerByID } from '../../http/PhuHTTP';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

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
    const user = useSelector((state : RootState)=>state.user.user)
    const userID = user?.data.id;
    const token = user?.data.token;
    const [userData, setUserData] = useState<User | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            const fetchUserData = async () => {
                try {
                    const response = await getUSerByID(userID, token);
                    setUserData(response);
                    console.log("response nè: ", response);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchUserData();
        }, [user])
    );

    const handleToProfileScreen = () => {
        navigation.navigate(ProfileRootStackEnum.ProfileScreen);
    };

    return (
        <TouchableOpacity onPress={handleToProfileScreen}>
            <View style={styles.profileUser}>
                <Image 
                    source={userData && userData.avatar ? { uri: userData.avatar } : require('../../media/icon/avatar.png')} 
                    style={styles.avatar} 
                />
                <View style={{ flex: 1 }}>
                    {userData && (
                        <Text style={styles.nameUser}>{userData.fullname}</Text>
                    )}
                    {userData && (
                        <Text style={styles.detail}>{userData.email}</Text>
                    )}
                    {userData?.phone && (
                        <>
                            <View style={styles.line}></View>
                            <Text style={styles.detail}>{userData.phone}</Text>
                        </>
                    )}
                    {userData?.address && (
                        <>
                            <View style={styles.line}></View>
                            <Text style={styles.detail} numberOfLines={2}>{userData.address}</Text>
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
        height: 155,
        backgroundColor: '#fff',
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    avatar: {
        height: 93,
        width: 93,
        marginRight: 16,
        borderRadius: 10,
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
