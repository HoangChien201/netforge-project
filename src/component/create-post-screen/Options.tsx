import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Modal, FlatList, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import EmojiList from './EmojiList';
import { COLOR } from '../../constant/color';
import ICON from 'react-native-vector-icons/AntDesign'
import ImagePicker from 'react-native-image-picker';

export type fileType={
    fileName:string,
    uri:string,
    type:string
}

const Options = ({ onSelectMedia, onSelectEmoji }) => {
    const [showEmojiModal, setShowEmojiModal] = useState(false);
    useEffect(()=>{
        //openLibrary();

    },[])
    // camera
    const openCamera = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        launchCamera(options, takePhoto);
    }, []);
    // kho ảnh
    const openLibrary = useCallback(async () => {
        const options = {
            mediaType: 'mixed',
            quality: 1,
            selectionLimit: 0, // Cho phép chọn nhiều ảnh
        };
        launchImageLibrary(options, takePhoto);
    }, []);


    // lấy ảnh
    const takePhoto = useCallback(async (response) => {
        if (response.didCancel) return;
        if (response.errorCode) return;
        if (response.errorMessage) return;
        if (response.assets && response.assets.length > 0) {
            const newImages:fileType = response.assets.map(asset =>{
                const {type,fileName,uri}= asset
               return {
                type,
                fileName,
                uri
               }
                
            } );

            onSelectMedia(newImages);
            //console.log('newImages: ' + JSON.stringify(newImages));
            
        }
    }, []);
    const handleEmojiSelect = (emoji) => {
        onSelectEmoji(emoji);
        //setShowEmojiModal(false);
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={openLibrary}>
                {/* <Image style={styles.icon} source={require('../../media/quyet_icon/folder_p.png')} /> */}
                <ICON name='folderopen' size={30} color={'#00CC33'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openCamera}>
                {/* <Image style={styles.icon} source={require('../../media/quyet_icon/camera_p.png')} /> */}
                <ICON name='camerao' size={30} color={'#0033FF'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowEmojiModal(true)}>
                {/* <Image style={styles.icon} source={require('../../media/quyet_icon/smile_p.png')} /> */}
                <ICON name='smileo' size={28} color={'#FF6600'}/>
            </TouchableOpacity>
            <Modal visible={showEmojiModal} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => setShowEmojiModal(false)}>
                            <Text style={styles.closeButton}>Đóng</Text>
                        </TouchableOpacity>
                        <EmojiList onSelectEmoji={handleEmojiSelect} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        width: '100%',
        alignItems: 'center',
        borderTopWidth:1,
        borderColor:'#b9babc'
    },
    icon: {
        height: 30,
        width: 30,

    }, iconv: {
        height: 28,
        width: 28,
    },
    button: {
        alignItems: 'center',
        marginStart: 16,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
        height: 40,
        width: 40,
        marginTop:20,
        
    },
    media: {
        fontSize: 24,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        height: '30%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        maxHeight: '80%',
    },
    closeButton: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'flex-end',
        color: COLOR.PrimaryColor,
    },
});

export default Options;
