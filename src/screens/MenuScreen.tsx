import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ProfileUser from '../component/menu/ProfileUser';
import OptionProfile from '../component/menu/OptionProfile';
// import { ProfileRootStackEnum } from '../component/stack/ProfileRootStackParams';
import EditProfileScreen from './EditProfileScreen';
import { useMyContext } from '../component/navigation/UserContext';

const MenuScreen = () => {
    const navigation = useNavigation()
    const isFocus= useIsFocused()
    const {user} = useMyContext()
    useEffect(() => {

        if(isFocus){
            navigation.getParent()?.setOptions({
                tabBarStyle: { 
                    position: 'absolute',
                    backgroundColor:'#1F1F2F',
                    margin:20,
                    borderRadius:15,
                 },
            });
        }
        
    
    
    }, [isFocus]);

    function updateOnPressHandle() {
    }

    const handleEditProfile = async () => {
        navigation.navigate("EditProfileScreen");
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Thông tin cá nhân</Text>
                    <TouchableOpacity onPress={handleEditProfile}>
                        <Text style={styles.edit}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
                <ProfileUser />
                <OptionProfile />

            </View>
        </ScrollView>
    )
}

export default MenuScreen;

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    headingContainer: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 34
    },
    heading: {
        color: "#000",
        fontSize: 18,
        fontWeight: '700'
    },
    edit: {
        color: '#F8774A',
        fontSize: 15
    },
    button: {
        height: 50,
        backgroundColor: '#F8774A',
        marginVertical: 44,
        borderRadius: 40
    }

})