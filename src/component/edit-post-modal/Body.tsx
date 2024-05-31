import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLOR } from '../../constant/color'
import USER from './User'
import OPTIONS from './Options'
import EMOJILIST from './EmojiList'
import TEXTAREA from './TextArea'
import { upLoadMedia, updatePost, getPostById, } from '../../http/QuyetHTTP'
import SwiperFlatList from 'react-native-swiper-flatlist'
import Icon from 'react-native-vector-icons/Feather';
import Video from 'react-native-video'
import renderMedia from './Media'
import MediaModal from './MediaModal'
import { useMyContext } from '../navigation/UserContext';
import ModalFail from '../Modal/ModalFail'
import ModalPoup from '../Modal/ModalPoup'
const Body = ({ showModalEdit, setShowModalEdit }) => {
    const [text, setText] = useState('');
    const [newMedia, setNewMedia] = useState([]);
    const [media, setMedia] = useState([]);
    const [type, setType] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const { user, setUser } = useMyContext();
    const postId = '6655db23dbf3bd429a543f08';
    const [status, setStatus] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isError, setIsError] = useState(false);
    const ShowModalMedia = () => {
        setShowModal(true);
    }
    // lấy thông tin bài viết
    const getOnePost = async () => {
        try {
            const result = await getPostById(postId);
            console.log('Bài viết đã được lấy thành công', result); // Logging kết quả

            // Kiểm tra và cập nhật state chỉ khi kết quả không phải là undefined
            if (result) {
                setText(result.text);
                setMedia(result.images);
                console.log(media);
                setType(result.type);

            }
        } catch (error) {
            console.log('>>>>>>get news log', error);
            throw error;
        }
    };
    useEffect(() => {
        getOnePost();
    }, []);
    const handleEmojiSelect = (emoji: any) => {
        setText(text + emoji);
    };
    //lấy ảnh
    const newMediaSelected = (uris) => {
        setNewMedia(uris);
    };
    useEffect(() => {
        console.log('media mới nè: ' + newMedia);
        console.log('media sau upload' + media);

    }, [newMedia]);
    // Hàm xóa ảnh cũ
    const onDeleteOldMedia = (image) => {
        const updatedMedia = images.filter(item => item !== image);
        setMedia(updatedMedia); // Cập nhật lại state `images` sau khi xóa
        // console.log('đã xóa nè: ' + images);
        // console.log('đây xóa nè: ' + updatedImages);    
    };
    // Hàm xóa ảnh mới
    const onDeleteNewMedia = (image) => {
        const updatedMedia = images.filter(item => item !== image);
        setNewMedia(updatedMedia); // Cập nhật lại state `images` sau khi xóa
        // console.log('đã xóa nè: ' + images);
        // console.log('đây xóa nè: ' + updatedImages);    
    };
    // update bài viết nếu có media mới
    const uploadMediaPost = async () => {
        // console.log('text: ' + text, 'media: ' + media, 'type: ' + type, 'creator: ' + creator);
        let creator = '6655db23dbf3bd429a543f08';
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

                // upload media to cloudinary
                const uploadResult = await upLoadMedia(formData);
                uploadedMediaPaths = uploadResult.map(item => item.url);
                console.log('Uploaded media paths:', uploadedMediaPaths);
                // upload post
                const newPost = await updatePost(creator, type, text, uploadedMediaPaths);
                console.log('Bài viết đã được cập nhật:', newPost);
                setTimeout(() => {
                    setStatus('Cập nhật thành công');
                    setShowPopup(true);
                    setIsError(false);
                    // Đặt lại giá trị sau một khoảng thời gian nhất định
                    setTimeout(() => {
                        setStatus('');
                        setShowPopup(false);
                        setShowModalEdit(false);
                    }, 1100);
                }, 1100);


            } else {
                try {
                    const newPost = await updatePost(creator, type, text, media);
                    console.log('Bài viết đã được cập nhật:', newPost);
                    setTimeout(() => {
                        setStatus('Cập nhật thành công');
                        setShowPopup(true);
                        setIsError(false);
                        // Đặt lại giá trị sau một khoảng thời gian nhất định
                        setTimeout(() => {
                            setStatus('');
                            setShowPopup(false);
                            setShowModalEdit(false);
                        }, 1100);

                    }, 1100);
                    
                } catch (error) {
                    console.error('Lỗi khi cập nhật bài viết:', error);
                    setTimeout(() => {
                        setStatus('Cập nhật không thành công');
                        setShowPopup(true);
                        setIsError(true);
                        // Đặt lại giá trị sau một khoảng thời gian nhất định
                        setTimeout(() => {
                            setStatus('');
                            setShowPopup(false);
                        }, 1100);
                    }, 1100);
                }
                console.log('No media to upload');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật bài viết:', error);
            setTimeout(() => {
                setStatus('Cập nhật không thành công');
                setShowPopup(true);
                setIsError(true);
                // Đặt lại giá trị sau một khoảng thời gian nhất định
                setTimeout(() => {
                    setStatus('');
                    setShowPopup(false);
                }, 1100);
            }, 1100);
        }
    };
    // hiển thị danh sách media
    const switchMedia = (media) => {

        if (!media || media.length === 0) {
            return null;
        }
        if (media) {
            return (
                <SwiperFlatList
                    data={media}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            {item.endsWith('.mp4') ? (
                                <View>
                                    <Video
                                        source={{ uri: item }}
                                        style={styles.image}
                                        resizeMode="contain"
                                        controls={true}
                                        paused={true}
                                    />
                                    <TouchableOpacity style={styles.buttonDeleteImage} >
                                        <Icon name='trash-2' size={28} color={COLOR.PrimaryColor} />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View>
                                    <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
                                    <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => onDeleteOldMedia(item)}>
                                        <Icon name='trash-2' size={28} color={COLOR.PrimaryColor} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                />
            )
        }

    };
    // hiển thị danh sách media mới khi
    const switchMediaNew = (newMedia) => {

        if (!newMedia || newMedia.length === 0) {
            return null;
        }
        if (newMedia) {
            return (
                <SwiperFlatList
                    data={newMedia}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainerNew}>
                            {item.endsWith('.mp4') ? (
                                <View>
                                    <Video
                                        source={{ uri: item }}
                                        style={styles.newMediaItem}
                                        resizeMode="cover"
                                        controls={true}
                                        paused={true}
                                    />
                                    <TouchableOpacity style={styles.buttonDeleteImage} >
                                        <Icon name='trash-2' size={28} color={COLOR.PrimaryColor} />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View>
                                    <Image source={{ uri: item }} style={styles.newMediaItem} resizeMode="cover" />
                                    <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => onDeleteNewMedia(item)}>
                                        <Icon name='trash-2' size={28} color={COLOR.PrimaryColor} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                />
            )
        }

    };
    // hiển thị danh sách media cũ khi thêm media mới
    const listMediaOld = (media) => {
        if (!media || media.length === 0) {
            return null;
        }
        return (
            <View style={styles.imageContainerOld}>
                {media.map((item, index) => (
                    <View key={index} style={styles.oldMediaItem}>
                        {item.endsWith('.mp4') ? (
                            <View>
                                <Video
                                    source={{ uri: item }}
                                    style={styles.imageON}
                                    resizeMode="cover"
                                    controls={false}
                                    paused={true}
                                />
                                <TouchableOpacity style={styles.buttonDeleteImage} >
                                    <Icon name='trash-2' size={28} color={COLOR.PrimaryColor} />
                                </TouchableOpacity>

                            </View>
                        ) : (
                            <View>
                                <Image source={{ uri: item }} style={styles.imageON} resizeMode="contain" />
                                <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => onDeleteOldMedia(item)}>
                                    <Icon name='trash-2' size={28} color={COLOR.PrimaryColor} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        );
    };

    return (
        <Modal visible={showModalEdit} animationType="slide" style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setShowModalEdit(false)} style={styles.closeButton}>
                    <Image style={styles.closeImage} source={require('../../media/quyet_icon/x_w.png')} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Edit Post</Text>
                <TouchableOpacity style={styles.saveButton} onPress={uploadMediaPost}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>

            </View>
            <USER setType={setType} type={type} />

            {/* Danh sách hình ảnh ------------------------------------------------------*/}
            {/* Đây là view sử dụng modal -----------------------------------*/}
            <View>
                <TouchableOpacity onPress={() => { setShowModal(true) }}
                    style={{ zIndex: 99, height: 28, width: 80, backgroundColor: COLOR.PrimaryColor, position: 'absolute', start: 10, top: 10, flexDirection: 'row', padding: 3, borderRadius: 4, alignItems: 'center' }} >
                    <Icon name='edit' size={20} color={'white'} />
                    <Text style={{ fontSize: 12, color: 'white' }}>Chỉnh sửa</Text>
                </TouchableOpacity>
                {renderMedia({ media, setMedia, setShowModal })}
            </View>
            <MediaModal showModal={showModal} setShowModal={setShowModal} media={media} setMedia={setMedia} />
            {/* Đây là view sử dụng modal -----------------------------------*/}

            {/* {newMedia && newMedia.length > 0 ?
                <View style={styles.oldMedia} >
                    <Text style={{ color: 'black', marginHorizontal: 16, borderTopWidth: 1, marginBottom: 5, borderColor: COLOR.PrimaryColor }}>Media đã tải lên</Text>
                    {listMediaOld(media)}
                    <Text style={{ color: 'black', marginHorizontal: 16, borderTopWidth: 1, marginTop: 5, fontWeight: '400', fontSize: 18, borderColor: COLOR.PrimaryColor, }}>Media mới</Text>
                    {switchMediaNew(newMedia)}
                </View>
                :
                <View style={styles.oldMedia}>
                    {switchMedia(media)}
                    <Text>không thay đổi</Text>
                </View>

            } */}
            {/* Danh sách hình ảnh ------------------------------------------------------*/}
            <TEXTAREA text={text} setText={setText} />
            <OPTIONS onSelectEmoji={handleEmojiSelect} onSelectNewMedia={newMediaSelected} />
            {showPopup ? (
                isError ? (
                    <ModalFail text={status} visible={showPopup} />
                ) : (
                    <ModalPoup text={status} visible={showPopup} />
                )
            ) : null}
        </Modal>
    )
}

export default Body

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',

    },
    closeButton: {
        marginStart: 10
    },
    closeImage: {
        height: 40,
        width: 40
    },
    header: {
        backgroundColor: COLOR.PrimaryColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50
    },
    saveButton: {
        marginEnd: 16
    },
    saveText: {
        color: 'white',
        fontWeight: '300',
        fontSize: 24
    },
    imagee: {
        width: 300,
        height: 300,
        marginTop: 20,
        alignSelf: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 24,
    },
    image: {
        width: '100%',
        height: 250,
        alignSelf: 'center',
    },
    imageON: {
        width: 100,
        height: '100%',
        alignSelf: 'center',
    },
    newMediaItem: {
        width: '50%',
        height: '100%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden'
    },
    textDeleteImage: {
        color: 'white'
    },
    buttonDeleteImage: {
        height: 38,
        width: 38,
        borderRadius: 10,
        position: 'absolute',
        end: 5,
        bottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
    },
    imageContainer: {
        width: 388,
        height: 300,
        marginTop: 20,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
    },
    imageContainerNew: {
        width: 388,
        height: '100%',
        alignSelf: 'center',

    },
    imageContainerOld: {
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 16,


    },
    oldMedia: {
        width: '100%',
        height: 300,
        marginTop: 20,
        alignSelf: 'center',
    },
    mediaN: {
        width: '100%',
        height: '70%',
        alignSelf: 'center',
    },
    mediaO: {
        width: '100%',
        height: '30%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    oldMediaItem: {
        width: 100,
        height: '100%',
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        marginStart: 5
    },
})