import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import { COLOR } from '../../constant/color';
import { launchImageLibrary } from 'react-native-image-picker';
import { upLoadMedia } from '../../http/QuyetHTTP';

const MediaModal = ({ showModal, setShowModal, media, setMedia }) => {
    const [playingVideo, setPlayingVideo] = useState(null);
    const [newMedia, setNewMedia] = useState([]);
    const [totalMedia, setTotalMedia] = useState([...media]);

    useEffect(() => {
        setTotalMedia([...media, ...newMedia]);
        console.log('media: ' + media);
        console.log('newMedia: ' + newMedia);
        console.log('Total: ' + totalMedia);
    }, [media, newMedia]);

    const onDeleteOldMedia = (uri) => {
        const updatedMedia = totalMedia.filter(media => media !== uri);
        setTotalMedia(updatedMedia);
        setMedia(updatedMedia.filter(mediaItem => !newMedia.includes(mediaItem))); // Cập nhật lại state `media`
        setNewMedia(updatedMedia.filter(mediaItem => newMedia.includes(mediaItem))); // Cập nhật lại state `newMedia`
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
            const newImages = response.assets.map(asset => asset.uri);
            setNewMedia(prevNewMedia => [...prevNewMedia, ...newImages]);
        }
    }, []);

    const uploadNewMedia = async () => {
        try {
            if (newMedia && newMedia.length > 0) {
                let uploadedMediaPaths = [];
                const formData = new FormData();
                newMedia.forEach((file, index) => {
                    formData.append('media', {
                        uri: file,
                        type: file.type || 'image/jpeg',
                        name: file.name || `media${index}.jpg`,
                    });
                });

                const uploadResult = await upLoadMedia(formData);
                uploadedMediaPaths = uploadResult.map(item => item.url);
                console.log('Uploaded media paths:', uploadedMediaPaths);
                setMedia(prevMedia => [...prevMedia, ...uploadedMediaPaths]);
                setNewMedia([]);
                setShowModal(false)
            } else {
                console.log('No media to upload');
            }
        } catch (error) {
            console.error('Lỗi khi tạo bài viết:', error);
        }
    };

    return (
        <Modal visible={showModal} animationType="slide" style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { setShowModal(false) }}>
                    <Icon name='x' size={28} color={'white'} style={{ marginStart: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={uploadNewMedia}>
                    <Icon name='check' size={28} color={'white'} style={{ marginEnd: 5 }} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                {totalMedia.map((media, index) => (
                    <View key={index} style={styles.MediaItem}>
                        {media.endsWith('.mp4') ? (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Video
                                    source={{ uri: media }}
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
                                <Image source={{ uri: media }} style={styles.image} resizeMode="cover" />
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
