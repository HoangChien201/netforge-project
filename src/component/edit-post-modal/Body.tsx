import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, FlatList, ScrollView, Keyboard } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import Icon from 'react-native-vector-icons/Feather';
import Video from 'react-native-video'

import { COLOR } from '../../constant/color'
import USER from './User'
import OPTIONS from './Options'
import EMOJILIST from './EmojiList'
import TEXTAREA from './TextArea'
import { upLoadMedia, updatePost, getPostById, } from '../../http/QuyetHTTP'
import renderMedia from './Media'
import MediaModal from './MediaModal'
import { useMyContext } from '../navigation/UserContext';
import ModalFail from '../Modal/ModalFail'
import ModalPoup from '../Modal/ModalPoup'
import Loading from '../Modal/Loading';
import ItemPost from '../listpost/ItemPost';
import { useNavigation } from '@react-navigation/native';
interface BodyProps {
    showModalEdit: boolean;
    setShowModalEdit: (value: boolean) => void;
    selectedId: any
}
export type imageType = {
    url: string,
    type: string
}
const Body: React.FunctionComponent<BodyProps> = ({ showModalEdit, setShowModalEdit, selectedId }) => {
    const [content, setContent] = useState<string>('');
    const [newMedia, setNewMedia] = useState<any[]>([]);
    const [media, setMedia] = useState([]);
    const [permission, setPermission] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const postId = selectedId;
    const [status, setStatus] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isError, setIsError] = useState(false);
    const [images, setImages] = useState<any[]>([]);
    const [friends, setFriends] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [shareId, setshareId] = useState();;
    const [dataShare, setDataShare] = useState();
    const [hiddenView, setHiddenView] = useState(false)
    const navigation = useNavigation();
    const [emotions, setEmotions] = useState(null);
    const [emotion, setEmotion] = useState(0);
    const ShowModalMedia = () => {
        setShowModal(true);
    }
    // lấy thông tin bài viết
    const getOnePost = async () => {
        setIsLoading(true);
        try {
            const result = await getPostById(postId);
            if (result || result.length > 0) {
                setContent(result.content);
                const mediaUrls = result.media.map(item => item.url);
                const mediaItem = result.media.map(item => item);
                setImages(mediaItem)
                //console.log('mediaUrl: ' + mediaUrls);
                //console.log('images: ' + JSON.stringify(mediaItem));
                setMedia(mediaUrls);
                setPermission(result.permission);
                //setFriends(result.tags)
                setIsLoading(false)
            }
            if (result.share?.id) {
                const result1 = await getPostById(result.share?.id);
                setDataShare(result1)
            } else {
                setDataShare('')
            }
        } catch (error) {
            console.log('>>>>>>get news log', error);
            throw error;
        }
    };
    useEffect(() => {
        if (emotions) {
            setEmotion(Number(emotions.type))
        } else {
            setEmotion(0);
        }

    }, [emotions])
    useEffect(() => {
        // if (postId) {
        //     getOnePost();
        // }
        if (postId) {
            setContent(postId.content);
            if (postId.media.length > 0) {
                const mediaUrls = postId.media.map(item => item.url);
                const mediaItem = postId.media.map(item => item);
                setImages(mediaItem)
                console.log('mediaUrl: ' + JSON.stringify(postId));
                console.log('images: ' + JSON.stringify(mediaItem));
                setMedia(mediaUrls);
            }
            setPermission(postId.permission);
            //setFriends(result.tags)
            setIsLoading(false)
            if (postId.share?.id) {
                getShare(postId.share?.id)
            } else {
                setDataShare('')
            }
        }
    }, [postId]);

    const getShare = async (id) => {
        const result1 = await getPostById(id);
        setDataShare(result1)
    }
    const handleEmojiSelect = (emoji: any) => {
        setContent(content + emoji);
    };
    //lấy ảnh
    const newMediaSelected = (uris: any) => {
        setNewMedia(uris);
    };
    const handleKeyboardShow = useCallback(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none',
            }
        });
        setHiddenView(true)
    }, []);
    const handleKeyboardHide = useCallback(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: '#1F1F2F',
                margin: 20,
                borderRadius: 15
            },
        });
        setHiddenView(false)
    }, []);
    useEffect(() => {
        // Lắng nghe sự kiện hiển thị và ẩn bàn phím
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [handleKeyboardShow, handleKeyboardHide]);
    useEffect(() => {
        //console.log('media mới nè: ' + newMedia);
        //console.log('media sau upload' + media);

    }, [newMedia]);
    const tags = friends.map(id => ({ user: String(id) }));
    const log = () => {
        console.log(`
            tags: ${tags}
            permission: ${permission}
            content: ${content}
            images: ${JSON.stringify(images)}
            `);

    }
    // update bài viết
    const uploadMediaPost = async () => {
        let medias = images;
        const tags = friends.map(id => ({ user: String(id) }));
        try {
            setIsLoading(true);
            if (images && images.length > 0) {
                const newPost = await updatePost(postId.id, { permission, content, tags, medias,emotion });
                if (newPost.status == 1) {
                    console.log('Bài viết đã được cập nhật:', newPost);
                    setIsLoading(false);
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
                    console.error('Lỗi khi cập nhật bài viết:', newPost.message);
                    setIsLoading(false);
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

            } else {
                try {
                    const newPost = await updatePost(postId.id, { permission, tags, content, medias,emotion });
                    if (newPost.status == 1) {
                        console.log('Bài viết đã được cập nhật:', newPost);
                        setIsLoading(false);
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
                        console.error('Lỗi khi cập nhật bài viết:', newPost.message);
                        setIsLoading(false);
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

                } catch (error) {
                    console.error('Lỗi khi cập nhật bài viết:', error);
                    setIsLoading(false);
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
            setIsLoading(false);
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
    const renderShare = () => {
        if (dataShare) {
            return (
                <View style={styles.sharePost} pointerEvents="none">
                    <ItemPost data={dataShare} />
                </View>
            )
        } else {
            return null;
        }
    };
    return (

        <Modal visible={showModalEdit} animationType="slide" style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => setShowModalEdit(false)} style={styles.closeButton}>
                    <Image style={styles.closeImage} source={require('../../media/quyet_icon/x_w.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={uploadMediaPost}>
                    <Text style={styles.saveText}>Cập nhật</Text>
                </TouchableOpacity>

            </View>
            <USER setPermission={setPermission} permission={permission} />

            {/* Danh sách hình ảnh ------------------------------------------------------*/}
            {/* Đây là view sử dụng modal -----------------------------------*/}
            {!emotions ?
                null
                :
                <View style={styles.emotions}>
                    <Text>{emotions.Emoji}</Text>
                    <Text style={{ color: 'black' }}> {emotions.title}</Text>
                    <TouchableOpacity onPress={() => { setEmotions(null) }}
                        style={{ marginStart: 5 }}
                    >
                        <Icon name='delete' size={20} color={COLOR.PrimaryColor} />
                    </TouchableOpacity>
                </View>
            }
            <View >
                {images.length > 0 && !hiddenView ?
                    <TouchableOpacity onPress={() => { setShowModal(true) }}
                        style={{ zIndex: 99, height: 28, width: 80, backgroundColor: COLOR.PrimaryColor, position: 'absolute', start: 10, top: 10, flexDirection: 'row', padding: 3, borderRadius: 4, alignItems: 'center' }} >
                        <Icon name='edit' size={20} color={'white'} />
                        <Text style={{ fontSize: 12, color: 'white' }}>Chỉnh sửa</Text>
                    </TouchableOpacity> : null}

                {renderMedia({ media, images, setMedia, setShowModal, hiddenView })}
            </View>

            <MediaModal showModal={showModal} setShowModal={setShowModal} media={media} setMedia={setMedia} setImages={setImages} images={images} />
            <TEXTAREA content={content} setContent={setContent} setFriends={setFriends} friends={friends} />
            {renderShare()}
            <OPTIONS onSelectEmoji={handleEmojiSelect} onSelectNewMedia={newMediaSelected} setShowModal={setShowModal} dataShare={dataShare} emotions={emotions} setEmotions={setEmotions} />
            {showPopup ? (
                isError ? (
                    <ModalFail text={status} visible={showPopup} />
                ) : (
                    <ModalPoup text={status} visible={showPopup} />
                )
            ) : null}
            <View style={{ zIndex: 9999 }}>
                <Loading isLoading={isloading} />
            </View>


        </Modal >
    )
}

export default Body

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        zIndex: 99999
    },
    emotions: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: 20
    },
    closeButton: {
        marginStart: 10,

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
        height: 50,
        zIndex: 999
    },
    saveButton: {
        marginEnd: 16
    },
    saveText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 20
    },
    imagee: {
        width: 300,
        height: 300,
        marginTop: 20,
        alignSelf: 'center',
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
    sharePost: {
        borderWidth: 1,
        marginHorizontal: 2,
        borderColor: COLOR.PrimaryColor,

    }
})