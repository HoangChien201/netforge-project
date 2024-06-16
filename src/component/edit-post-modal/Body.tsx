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
interface BodyProps {
    showModalEdit: boolean;
    setShowModalEdit: (value: boolean) => void;
}
export type imageType={
    url:string,
    type:string
}
const Body: React.FunctionComponent<BodyProps> = ({ showModalEdit, setShowModalEdit }) => {
    const [content, setContent] = useState('');
    const [newMedia, setNewMedia] = useState([]);
    const [media, setMedia] = useState([]);
    const [permission, setPermission] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const { user, setUser } = useMyContext();
    const postId = 46;
    const [status, setStatus] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isError, setIsError] = useState(false);
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const ShowModalMedia = () => {
        setShowModal(true);
    }
    // lấy thông tin bài viết
    const getOnePost = async () => {
        try {
            const result = await getPostById(postId);
            // console.log('Bài viết đã được lấy thành công', result); // Logging kết quả

            // Kiểm tra và cập nhật state chỉ khi kết quả không phải là undefined
            if (result) {
                setContent(result.content);
                const mediaUrls = result.media.map(item => item.url);
                const mediaItem = result.media.map(item =>item);
                setImages(mediaItem)
                //console.log('mediaUrl: ' + mediaUrls);
                //console.log('images: ' + JSON.stringify(images));
                setMedia(mediaUrls);
                setPermission(result.permission);
                //setFriends(result.tags)
            }
        } catch (error) {
            console.log('>>>>>>get news log', error);
            throw error;
        }
    };
    useEffect(() => {
        getOnePost();
        //console.log(friends);

    }, []);
    const handleEmojiSelect = (emoji: any) => {
        setContent(content + emoji);
    };
    //lấy ảnh
    const newMediaSelected = (uris: any) => {
        setNewMedia(uris);
    };
    useEffect(() => {
        //console.log('media mới nè: ' + newMedia);
        //console.log('media sau upload' + media);

    }, [newMedia]);
    //const tags = friends.map(friendId => ({ friendId: String(friendId) }));  
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
        try {
            if (images && images.length > 0) {
                const newPost = await updatePost(postId, { permission, content, tags, medias });
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
                    const newPost = await updatePost(postId, { permission, tags, content ,medias});
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

    return (
        <Modal visible={showModalEdit} animationType="slide" style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setShowModalEdit(false)} style={styles.closeButton}>
                    <Image style={styles.closeImage} source={require('../../media/quyet_icon/x_w.png')} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Chỉnh sửa bài viết</Text>
                <TouchableOpacity style={styles.saveButton} onPress={uploadMediaPost}>
                    <Text style={styles.saveText}>Lưu</Text>
                </TouchableOpacity>

            </View>
            <USER setPermission={setPermission} permission={permission} />

            {/* Danh sách hình ảnh ------------------------------------------------------*/}
            {/* Đây là view sử dụng modal -----------------------------------*/}
            <View>
                {media.length>0 ? <TouchableOpacity onPress={() => { setShowModal(true) }}
                    style={{ zIndex: 99, height: 28, width: 80, backgroundColor: COLOR.PrimaryColor, position: 'absolute', start: 10, top: 10, flexDirection: 'row', padding: 3, borderRadius: 4, alignItems: 'center' }} >
                    <Icon name='edit' size={20} color={'white'} />
                    <Text style={{ fontSize: 12, color: 'white' }}>Chỉnh sửa</Text>
                </TouchableOpacity> : null}

                {renderMedia({ media,images, setMedia, setShowModal })}
            </View>
            <MediaModal showModal={showModal} setShowModal={setShowModal} media={media} setMedia={setMedia} setImages={setImages} images={images}/>
            <TEXTAREA content={content} setContent={setContent} setTags={setTags} />
            <OPTIONS onSelectEmoji={handleEmojiSelect} onSelectNewMedia={newMediaSelected} setShowModal={setShowModal}/>
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