import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import ButtonFollowAndMessages from '../ui/ButtonFollowAndMessages';
import NumberOfFollow from './NumberOfFollow';
import { user } from '../../screens/ProfileScreen';

const HeaderProfile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <View style={styles.imgContainer}>
                    <Image source={{uri:user.avatar}} style={styles.imgAvatar} />
                </View>
            </View>
                <Text style={styles.txtNameUser}>{user.fullname}</Text>
                <NumberOfFollow/>
                <ButtonFollowAndMessages/>
        </View>
    );
};

export default HeaderProfile;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        paddingTop:20
    },
    txtNameUser:{
        fontSize:24,
        fontWeight: '500',
        lineHeight: 32,
        color: '#120D26',
        textAlign:'center',
        marginVertical: 10,
    },
    imgContainer:{
        borderRadius: 50,
        overflow: 'hidden', // Đảm bảo hình ảnh không vượt ra khỏi hình tròn
        width: 100,
        height: 100,
    },
    imgAvatar: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Đảm bảo hình ảnh nằm đúng trong hình tròn
    },
    avatarContainer: {
        justifyContent:'center',
        alignItems:'center',
    }
});
