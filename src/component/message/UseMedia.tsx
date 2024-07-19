import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native'
import React, { useCallback } from 'react'
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { fileType } from '../create-post-screen/Options';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { PermissionCamera } from './Permission';
import { useMyContext } from '../navigation/UserContext';
import { messageType } from './MessageItem';
import { MessageProvider } from './class/MessageProvider';

const UseMedia = ({ onSubmit,reply }: { onSubmit: any,reply:messageType | null }) => {
    const { user } = useMyContext()
    function NewMessage(messsage: {
        type:string,
        fileName:string,
        uri:string
    }) {
        let id=Date.now()
        let message = {
            "id": id,
            "create_at": new Date().toISOString(),
            "update_at": new Date().toISOString(),
            "state": 0,
            "type": "image",
            "message": messsage,
            "sender": user.id,
            "reaction": [],
            "reads": [],
            "parent":reply ? reply.id : null

        }

        return message;
    }

    // camera
    const openCamera = useCallback(async () => {
        const options: CameraOptions = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        launchCamera(options, takePhoto);

    }, []);
    // kho ảnh
    const openLibrary = useCallback(async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 0, // Cho phép chọn nhiều ảnh
        };
        launchImageLibrary(options, takePhoto);
    }, []);


    // lấy ảnh
    const takePhoto = useCallback(async (response: any) => {
        if (response.didCancel) return;
        if (response.errorCode) return;
        if (response.errorMessage) return;
        if (response.assets && response.assets.length > 0) {
            await response.assets.map((asset: any) => {
                const { type, fileName, uri } = asset
                // onSubmit(NewMessage({type,fileName,uri}))
                console.log('typeimage',type);
                
                onSubmit(
                    new MessageProvider(
                        {
                            message:{ type, fileName, uri },
                            type:'image',
                            sender:user.id,
                            parent:reply ? reply : null
                        }
                        
                    )
                )

                return {
                    type,
                    fileName,
                    uri
                }

            });
        }
    }, []);

    async function CameraPress() {
        const checkCamera = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);

        if (!checkCamera) {
            const result = await PermissionCamera()
            if (result) {
                openCamera()
            }
            return
        }
        openCamera()

    }

    function LibraryPress() {
        openLibrary()
    }

    function IconButton({ name, size, color, type }: { name: string, size: number, color: string, onPress?: any, type: string }) {

        function OnPress() {
            if (type === 'camera') {
                CameraPress()
                return
            }
            if (type === 'libary') {
                LibraryPress()
                return
            }
        }

        return (
            <TouchableOpacity onPress={OnPress}>
                <MCIcon name={name} size={size} color={color} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <IconButton name='camera-outline' size={30} color='#000' type='camera' />
            </View>
            <View style={styles.icon}>
                <IconButton name='folder-image' size={30} color='#000' type='libary' />
            </View>
        </View>
    )
}

export default UseMedia

const styles = StyleSheet.create({
    icon: {
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    container: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    }
})