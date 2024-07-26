import React, { useState, useCallback, FC, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Modal, FlatList, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { EmojiData } from '../../constant/emoji';
import EmojiList from './EmojiList';
import { COLOR } from '../../constant/color';
import ICON from 'react-native-vector-icons/AntDesign'
import Swiper from 'react-native-swiper';
import Emotions from '../create-post-screen/Emotions';
export type fileType = {
    fileName: string,
    uri: string,
    type: string,
    
}
interface optionsProps {
    onSelectNewMedia: (permission: string) => void;
    onSelectEmoji: (permission: string) => void;
    setShowModal: (show: boolean) => void;
    dataShare: any,
    setEmotions: (value: any) => void,
    emotions: any
}

const Options: React.FC<optionsProps> = ({ onSelectNewMedia, onSelectEmoji, setShowModal, dataShare,emotions, setEmotions }) => {
    const [showEmojiModal, setShowEmojiModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef(null);

    const openCamera = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        launchCamera(options, takePhoto);
    }, []);

    const openLibrary = useCallback(async () => {
        const options = {
            mediaType: 'mixed',
            quality: 1,
            selectionLimit: 0,
        };
        launchImageLibrary(options, takePhoto);
    }, []);
    const handleEmojiSelect = (emoji: any) => {
        onSelectEmoji(emoji);
        //setShowEmojiModal(false);
    };
    const handleEmotionSelect = (item: any) => {
        setEmotions(item);
        setShowEmojiModal(false);

    };
    const handleIndexChanged = (index) => {
        setCurrentIndex(index);
    };

    const handleButtonPress = (index) => {
        if (swiperRef.current) {
            swiperRef.current.scrollBy(index - currentIndex, true);
        }
    };
    const takePhoto = useCallback(async (response) => {
        if (response.didCancel) return;
        if (response.errorCode) return;
        if (response.errorMessage) return;
        if (response.assets && response.assets.length > 0) {
            const newImages: fileType = response.assets.map(asset => {
                const { type, fileName, uri } = asset
                return {
                    type,
                    fileName,
                    uri
                }

            });
            onSelectNewMedia(newImages);
        }
    }, []);
    const showEdit = () => {
        setShowModal(true)
    }
    return (
        <View style={styles.container}>
            {dataShare?
                null
                :
                <TouchableOpacity style={styles.button} onPress={showEdit}>
                    {/* <Image style={styles.icon} source={require('../../media/quyet_icon/folder_p.png')} /> */}
                    <ICON name='folderopen' size={30} color={'#00CC33'} />
                </TouchableOpacity>
            }

            {/* <TouchableOpacity style={styles.button} onPress={openCamera}>
                <Image style={styles.icon} source={require('../../media/quyet_icon/camera_p.png')} />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.button} onPress={() => { setShowEmojiModal(true) }}>
                {/* <Image style={styles.icon} source={require('../../media/quyet_icon/smile_p.png')} /> */}
                <ICON name='smileo' size={28} color={'#FF6600'} />
            </TouchableOpacity>
            <Modal visible={showEmojiModal} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>

                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: -5 }}>
                            <TouchableOpacity
                                style={{ marginHorizontal: 5, padding: 5, backgroundColor: COLOR.primary300, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => { handleButtonPress(0) }}
                            >
                                <Text style={styles.closeButton}>Cảm xúc</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ marginHorizontal: 5, padding: 5, backgroundColor: COLOR.primary300, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => { handleButtonPress(1) }}
                            >
                                <Text style={styles.closeButton}>Biểu tượng</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowEmojiModal(false)}
                            style={{ position: 'absolute', end: 8, top: 5 }}
                        >
                            <Text style={styles.closeButton}>Đóng</Text>
                        </TouchableOpacity>
                        <Swiper
                            showsButtons={false}
                            ref={swiperRef}
                            loop={false}
                            style={{ marginTop: -5 }}
                            onIndexChanged={handleIndexChanged}
                        >
                            <Emotions onSelectEmotion={handleEmotionSelect} />
                            <EmojiList onSelectEmoji={handleEmojiSelect} />
                        </Swiper>

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
        borderTopWidth: 1,
        borderTopColor: '#b9babc',
        zIndex: 999
    },
    icon: {
        height: 30,
        width: 30,
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
        marginTop: 20,

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
        height: '50%', // Điều chỉnh kích thước chiều cao của modal
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
