import { Image, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import { COLOR } from '../../constant/color';
import { launchImageLibrary } from 'react-native-image-picker';
import { upLoadMedia } from '../../http/QuyetHTTP';
import ModalFail from '../Modal/ModalFail';
import ModalPoup from '../Modal/ModalPoup';
import Loading from '../Modal/Loading';

export type fileType = {
    fileName: string,
    uri: string,
    type: string
}
export type fortmat = {
    url: string,
    resource_type: string
}
interface MediaModal {
    showModal: boolean;
    setShowModal: (Permission: boolean) => void;
    media: any[];
    setMedia: (Permission: any) => void;
    setImages: (Permission: any) => void;
    images: any[];
}
const MediaModal: React.FC<MediaModal> = ({ showModal, setShowModal, media, setMedia, setImages, images }) => {
    const [playingVideo, setPlayingVideo] = useState(null);
    const [newMedia, setNewMedia] = useState([]);
    const [totalMedia, setTotalMedia] = useState([...images]);
    const [status, setStatus] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isError, setIsError] = useState(false);
    const [mediaUpload, setMediaUpload] = useState([]);
    const [isloading, setIsLoading] = useState(false)
    useEffect(() => {
        setTotalMedia([...images]);
        
    }, [media]);

    const onDeleteOldMedia = (uri) => {
        const updatedMedia = totalMedia.filter(media => media !== uri);
        const updatedMediaUpload = mediaUpload.filter(media => media.uri !== uri.url);
        const imageUpdate = images.filter(media => media !== uri);
        setMediaUpload(updatedMediaUpload);
        setTotalMedia(updatedMedia);
        setImages(imageUpdate);
    };

    const togglePlayVideo = (media) => {
        setPlayingVideo(playingVideo === media ? null : media);
    };

    const openLibrary = useCallback(async () => {
        const options = {
            mediaType: 'mixed',
            quality: 1,
            selectionLimit: 0, // Cho phép chọn nhiều ảnh
        };
        launchImageLibrary(options, takePhoto);
    }, []);

    const takePhoto = useCallback((response) => {
        if (response.didCancel) return;
        if (response.errorCode) return;
        if (response.errorMessage) return;
        if (response.assets && response.assets.length > 0) {
            const newImageUpload: fileType = response.assets.map(asset => {
                const { type, fileName, uri } = asset
                return {
                    type,
                    fileName,
                    uri
                }

            }

            );

            const newFormat: fileType = response.assets.map(asset => {
                const { type, uri } = asset
                return {
                    resource_type: type,
                    url: uri
                }

            });
            const newImages = response.assets.map(asset => asset.uri);
            setTotalMedia(prevNewMedia => [...prevNewMedia, ...newFormat]);
            setMediaUpload(preMediaUpload => [...preMediaUpload, ...newImageUpload]);

        }
    }, []);

    const uploadNewMedia = async () => {
        try {
            setIsLoading(true)
            if (mediaUpload && mediaUpload.length > 0) {
                const formData = new FormData();
                mediaUpload.forEach((file: fileType, index) => {
                    formData.append('files', {
                        uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
                        type: file.type || 'image/jpeg',
                        name: file.fileName || `image-${index}.jpg`,
                    });
                });

                const uploadResult = await upLoadMedia(formData);
                let medias: { url: any; resource_type: any }[] = [];
                if (Array.isArray(uploadResult)) {
                    setIsLoading(false)
                    medias = uploadResult.map(item => ({
                        url: item.url,
                        resource_type: item.resource_type,
                    }));
                    setImages(preImages => [...preImages, ...medias]);
                    const mediaUrls = medias.map(item => item.url);
                    setMedia(prevMedia => [...prevMedia, ...mediaUrls]);
                } else {
                    console.error('uploadedMedias is not an array or is undefined');
                }

                setMediaUpload([]);
                setTimeout(() => {
                    setStatus('Đã thêm ảnh mới');
                    setShowPopup(true);
                    setIsError(false);
                    // Đặt lại giá trị sau một khoảng thời gian nhất định
                    setTimeout(() => {
                        setStatus('');
                        setShowPopup(false);
                        setShowModal(false)
                    }, 1100);
                }, 1100);

            } else {
                console.log('No media to upload');
                setShowModal(false)
            }
        } catch (error) {
            console.error('Lỗi khi upload ảnh:', error);
            setShowModal(false)
        }
    };

    return (
        <Modal visible={showModal} animationType="slide" style={styles.container}>
            <Loading isLoading={isloading} />
            <View style={styles.header}>
                {/* <TouchableOpacity onPress={() => { setShowModal(false) }}>
                    <Icon name='x' size={28} color={'white'} style={{ marginStart: 5 }} />
                </TouchableOpacity> */}
                <View></View>
                <TouchableOpacity onPress={uploadNewMedia}>
                    <Icon name='check' size={28} color={'white'} style={{ marginEnd: 5 }} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                {totalMedia.map((media, index) => (
                    <View key={index.toString()} style={styles.MediaItem}>
                        {media.url.endsWith('.mp4') ? (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Video
                                    source={{ uri: media.url }}
                                    style={styles.image}
                                    resizeMode="cover"
                                    controls={false}
                                    paused={playingVideo !== media}
                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(media)}
                                >
                                    {playingVideo === media ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => onDeleteOldMedia(media)}>
                                    <Icon name='x' size={28} color={'white'} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <Image source={{ uri: media.url }} style={styles.image} resizeMode="cover" />
                                <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => onDeleteOldMedia(media)}>
                                    <Icon name='x' size={28} color={'white'} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}
                <TouchableOpacity style={styles.addNewMedia} onPress={openLibrary}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='file-plus' size={28} color={COLOR.PrimaryColor} />
                        <Text style={{ color: COLOR.PrimaryColor, fontSize: 22, fontWeight: '500' }}>Thêm mới</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            {showPopup ? (
                isError ? (
                    <ModalFail text={status} visible={showPopup} />
                ) : (
                    <ModalPoup text={status} visible={showPopup} />
                )
            ) : null}
        </Modal>
    );
};

export default MediaModal;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
    },
    header: {
        height: 60,
        width: '100%',
        backgroundColor: COLOR.PrimaryColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    MediaItem: {
        height: 500,
        width: '100%',
        marginTop: 5,
    },
    buttonDeleteImage: {
        top: 10,
        end: 10,
        position: 'absolute',
        backgroundColor: 'gray',
        borderRadius: 5,
    },
    image: {
        height: '98%',
        width: '100%',
    },
    playButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.PrimaryColor,
        padding: 5,
        borderRadius: 5,
        opacity: 0.6,
    },
    addNewMedia: {
        height: 80,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
});
