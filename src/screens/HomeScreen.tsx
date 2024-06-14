import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import TouchId from '../component/Modal/TouchId';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchID from 'react-native-touch-id';

const HomeScreen = () => {
    const [visible, setVisible] = useState(false);
    const checkTouchIdLogin = () => {
        TouchID.isSupported().then(async biometryType => {
            if (biometryType === 'FaceID') {
                console.log('FaceID isSupported');
            } else {
                console.log('TouchID isSupported');
                try {
                    const check = await AsyncStorage.getItem('touch')
                    if(check != 'true'){
                        setVisible(true);
                    }
                } catch (error) {
                    console.error('Error checking touch ID login:', error);
                }
            }
        }).catch(error => {
            console.log('TouchID not supported', error);
        });


    };
    useEffect(()=>{
        checkTouchIdLogin();
    },[])
    const deleteCheck =async ()=>{
        try {
            await AsyncStorage.setItem('touch', 'false');
            console.log('deleted Touch');
        } catch (error) {
            console.error('Error deleting touch check:', error);
        }

    };
    const deleteKeep =async ()=>{
        try {
            await AsyncStorage.setItem('keep', 'false');
            console.log('deleted keep');
            
        } catch (error) {
            console.error('Error deleting touch check:', error);
        }

    }
    return (
        <View style={styles.container}>
            <TouchId visible={visible} setVisible={setVisible} />
            <Text></Text>
            <TouchableOpacity style={{padding:10, height: 40, width: 150, backgroundColor:'gray'}} onPress={deleteCheck}>
                <Text>delete Touch</Text>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity style={{padding:10, height: 40, width: 150, backgroundColor:'gray'}} onPress={deleteKeep}>
                <Text>delete Keep login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',

    }
});
