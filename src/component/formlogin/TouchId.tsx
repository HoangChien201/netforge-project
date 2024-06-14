import { BackHandler, StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import TouchID from 'react-native-touch-id';
import IconE from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../../constant/color'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchIdModal from '../Modal/TouchId'
const TouchId = ({ onAuthSuccess }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [visible, setVisible] = useState(false);
    const optionalConfigObject = {
        title: 'Authentication Required', // Android
        imageColor: '#e00606', // Android
        imageErrorColor: '#ff0000', // Android
        sensorDescription: 'Touch sensor', // Android
        sensorErrorDescription: 'Failed', // Android
        cancelText: 'Cancel', // Android
        fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
        unifiedErrors: false, // use unified error messages (default false)
        passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            "Thiết bị không hỗ trợ!",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };
    const handleBiometric = () => {
        TouchID.isSupported(optionalConfigObject).then(async biometryType => {
            if (biometryType === 'FaceID') {
                console.log('FaceID isSupported');
            } else {
                console.log('TouchID isSupported');
                const check = await AsyncStorage.getItem('touch');
                if (check != 'true') {
                    setVisible(true)
                } else {
                    if (isAuth) {
                        return null;
                    }
                    TouchID.authenticate('', optionalConfigObject)
                        .then(success => {
                            console.log('success', success);
                            setIsAuth(success);
                            onAuthSuccess(success);
                        })
                        .catch(err => {
                            BackHandler.exitApp();

                        });
                }
            }

        }).catch(error => {
            console.log('TouchID not supported', error);
            showToastWithGravity();
            //showToast();
        });
    }

    return (
        <TouchableOpacity onPress={handleBiometric} style={styles.touchable}>
            <IconE name='finger-print-outline' size={50} color={COLOR.PrimaryColor} />
            <TouchIdModal visible={visible} setVisible={setVisible}/>
        </TouchableOpacity>

    );
}

export default TouchId;

const styles = StyleSheet.create({
    touchable: {
        height: 50,
        width: 50,
        marginTop: 15,
        marginEnd: 10,
    },
});
