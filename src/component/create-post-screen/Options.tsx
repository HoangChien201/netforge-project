import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Modal, FlatList, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import EmojiList from './EmojiList';
import Emotions from './Emotions';
import { COLOR } from '../../constant/color';
import IconAnt from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { useMyContext } from '../navigation/UserContext';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export type fileType = {
    fileName: string,
    uri: string,
    type: string
}
type Op = {
    onSelectMedia: (value: any) => void,
    onSelectEmoji: (value: any) => void,
    setShowAI: (value: any) => void,
    imageUrl: any,
    setEmotions: (value: any) => void,
    emotions: any
}

const Options: React.FC<Op> = ({ onSelectMedia, onSelectEmoji, setShowAI, imageUrl, emotions, setEmotions }) => {
    const navigation = useNavigation();
    const user = useSelector((state:RootState)=>state.user.value)

    const [showEmojiModal, setShowEmojiModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef(null);
    useEffect(() => {

        //openLibrary();

    }, [])
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
            const newImages: fileType = response.assets.map(asset => {
                const { type, fileName, uri } = asset
                return {
                    type,
                    fileName,
                    uri
                }

            });

            onSelectMedia(newImages);
            //console.log('newImages: ' + JSON.stringify(newImages));

        }
    }, []);
    const handleEmojiSelect = (emoji: any) => {
        onSelectEmoji(emoji);
        //setShowEmojiModal(false);
    };
    const handleEmotionSelect = (item: any) => {
        setEmotions(item);
        setShowEmojiModal(false);

    };
    /*
    phu update
    */
    // Tạo trạng thái userID và liveID
    const [userID, setUserID] = useState('');
    const [liveID, setLiveID] = useState('');

    useEffect(() => {
        setUserID(String(Math.floor(Math.random() * 100000)));
        setLiveID(String(Math.floor(Math.random() * 10000)));
    }, []);
    
    const name = user.fullname;
    const handleToLiveStream = () => {
        navigation.navigate('HostScreen', {
            userID,
            userName: name,
            liveID
        });
    };
    //

    const handleIndexChanged = (index) => {
        setCurrentIndex(index);
    };

    const handleButtonPress = (index) => {
        if (swiperRef.current) {
            swiperRef.current.scrollBy(index - currentIndex, true);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={openLibrary}>
                <Image style={styles.icon} source={require('../../media/icon/media.png')} />
                {/* <ICON name='folderopen' size={30} color={'#00CC33'} /> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openCamera}>
                <Image style={styles.icon} source={require('../../media/icon/camera_icon.png')} />
                {/* <ICON name='camerao' size={30} color={'#0033FF'} /> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowEmojiModal(true)}>
                <Image style={styles.icon} source={require('../../media/icon/emotion.png')} />
                {/* <ICON name='smileo' size={28} color={'#FF6600'} /> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowAI(true)}>
                {/* <Image style={styles.icon} source={require('../../media/quyet_icon/smile_p.png')} /> */}
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.PrimaryColor }}>AI</Text>

            </TouchableOpacity>
            {/* phu update */}
            <TouchableOpacity style={styles.button} onPress={handleToLiveStream}>
                <Image style={styles.icon} source={require('../../media/icon/iconstream.png')} />
                {/* <MaterialIcons name='live-tv' size={28} color={'#FF6600'}/> */}
            </TouchableOpacity>
            {/* phu update */}
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
                            <IconAnt name='close' size={24} color='#000'/>
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
            {/* <Modal visible={showEmojiModal} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => setShowEmojiModal(false)}>
                            <Text style={styles.closeButton}>Đóng</Text>
                        </TouchableOpacity>
                        <Emotions onSelectEmotion={handleEmojiSelect} />
                    </View>
                </View>
            </Modal> */}
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
        borderColor: '#b9babc'
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
        marginTop: 20,
        justifyContent: 'center'

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
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        maxHeight: '80%',
    },
    closeButton: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        color: COLOR.PrimaryColor,
    },
});

export default Options;
