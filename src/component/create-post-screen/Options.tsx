import React, { useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Modal, FlatList, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { EmojiData } from '../../constant/emoji';
import EmojiList from './EmojiList';
import { COLOR } from '../../constant/color';
import ImageResizer from 'react-native-image-resizer';


const Options = ({ onSelectImage, onSelectEmoji }) => {
    const [showEmojiModal, setShowEmojiModal] = useState(false);
    // mở máy ảnh
    const openCamera = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        launchCamera(options, takePhoto);
    }, []);
    // mở thư viện
    const openLibrary = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        launchImageLibrary(options, takePhoto);
    }, []);
    // chọn ảnh tạo uri
    const takePhoto = useCallback(async (response) => {
        if (response.didCancel) return;
        if (response.errorCode) return;
        if (response.errorMessage) return;
        if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];

            onSelectImage(asset.uri);

            //resizeImage(asset.uri);
        }
    }, []);
    // lấy emiji đưa qua TextArea
    const handleEmojiSelect = (emoji: any) => {
        onSelectEmoji(emoji);
        setShowEmojiModal(false);
    };
    // căn chỉnh kích thước ảnh (không dùng đến)
    const resizeImage = (uri) => {
        ImageResizer.createResizedImage(uri, 300, 300, 'JPEG', 90)
            .then(resizedImage => {
                onSelectImage(resizedImage.uri);
            })
            .catch(err => {
                console.error(err);
            });
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={openLibrary}>
                <Image style={styles.icon} source={require('../../media/quyet_icon/folder_p.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openCamera}>
                <Image style={styles.icon} source={require('../../media/quyet_icon/camera_p.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowEmojiModal(true)}>
                <Image style={styles.icon} source={require('../../media/quyet_icon/smile_p.png')} />
            </TouchableOpacity>
            <Modal visible={showEmojiModal} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => setShowEmojiModal(false)}>
                            <Text style={styles.closeButton}>Close</Text>
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
    },
    icon: {
        height: 30,
        width: 30,
    },
    button: {
        alignItems: 'center',
        marginStart: 16,
        padding: 5,
    },
    emoji: {
        fontSize: 24,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền và mức độ trong suốt của modal
    },
    modalContent: {
        width: '90%', // Điều chỉnh kích thước chiều rộng của modal
        height: '30%', // Điều chỉnh kích thước chiều cao của modal
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        maxHeight: '80%', // Chiều cao tối đa của modal
    },
    closeButton: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'flex-end',
        color: COLOR.PrimaryColor
    },
});

export default Options;
