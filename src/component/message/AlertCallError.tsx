import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLOR } from '../../constant/color';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import { onUserLogin } from '../../screens/call-video/Utils';

const AlertCallError = ({ visible, onClose, title, message }:{ visible:boolean, onClose:any, title:string, message:string }) => {
    const user = useSelector((state: RootState) => state.user.value)
    if (!user) return
    const { id, fullname, avatar } = user
    const navigation = useNavigation()
    //login zego
    onUserLogin(id, fullname, avatar, navigation).then(() => {
        setTimeout(()=>{
            onClose()
        },3000)
    })
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.alertContainer}>
                    <Text style={styles.alertTitle}>{title}</Text>
                    <Text style={styles.alertMessage}>{message}</Text>
                    <ActivityIndicator size="large" color={COLOR.PrimaryColor} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    alertMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    alertButton: {
        width: '100%',
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
        alignItems: 'center',
    },
    alertButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AlertCallError;
