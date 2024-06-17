import React, { useCallback, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {CameraOptions, MediaType, PhotoQuality, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { valueFormEdit } from '../../../screen/user/profile/EditProfileScreen';

const AvatarUserComponet = ({updateValue,valueForm}:{updateValue:any,valueForm:valueFormEdit}) => {
    const [image,setImage]=useState(valueForm.avatar)

    const takePhoto = useCallback(async (response:any) => {
        if (response.didCancel) return;
        if (response.errorCode) return;
        if (response.errorMessage){
            throw response.errorMessage
        }
        if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            setImage(asset.uri);
            // upload image
            const formData = new FormData();
            formData.append('image', {
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName,
            });
            updateValue('avatar',formData)
        }
    }, []);

    const openCamera = useCallback(async () => {
        const options :CameraOptions= {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        await launchCamera(options, takePhoto);
    }, []);

    function cameraOnPress(){
        openCamera()
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                {
                    image ? <Image style={styles.avatar} source={{uri:image}}/>
                    :
                    <Image style={styles.avatar} source={require('../../../assets/images/anonymous/avatar-empty.png')} />
                }
                
                <TouchableOpacity style={styles.camera} onPress={cameraOnPress}>
                    <Image source={require('../../../assets/images/icon/icon-camera.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AvatarUserComponet

const styles = StyleSheet.create({
    container: {
        height:120,
        width:"100%",
        alignItems:'center'
    },
    avatarContainer: {
        width:100,
        height:100,
        borderRadius:100,
    },
    avatar: {
        width:100,
        height:100,
        borderRadius:100,
    },
    camera: {
        position:'absolute',
        bottom:0,
        right:'15%'
    },
})