import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { launchImageLibrary } from 'react-native-image-picker'
import Video from 'react-native-video'
import Icon from 'react-native-vector-icons/Feather'
import IconPhoto from 'react-native-vector-icons/Foundation'
import IconSend from 'react-native-vector-icons/FontAwesome'

import { addComments, uploadImage } from '../../http/TuongHttp'
import { COLOR } from '../../constant/color'
import { useSendNotification } from '../../constant/notify'

const InputCmt = ({ fetchComments, onMediaSelected, parent = null, postId, text, setParent, setText, comment, userPostId , creator}) => {
    const user = useSelector((state: RootState) => state.user.value)
    const [comments, setComments] = useState('')
    const [media, setMedia] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const [checkComments, setCheckComments] = useState(true)
    const { sendNCommentPost, sendNRepComment } = useSendNotification()

    useEffect(() => {
        if (text) {
            if (user?.id === comment) {

                setText('chính mình')
            } else {
                setComments(text)
            }

        }


    }, [text])

    const handleCancel = () => {
        setParent(null)
        setText(null)
        setComments('')
    }
    //hàm xóa image nếu không muốn gửi ảnh nữa
    const handleDleteMedia = () => {
        setMedia(null)
        setImagePath(null)
        setMediaType(null);

    }
    // choose photo or video
    const openPhoto = useCallback(async () => {
        const options = {
            mediaType: 'mixed',
            quality: 1,
            saveToPhotos: true,
        };
        const response: any = await launchImageLibrary(options, takePhoto);
        takePhoto(response)

    }, []);
    const takePhoto = useCallback(async (response) => {
        if (response.didCancel || response.errorCode || response.errorMessage) return;
        if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            setMedia(asset.uri);
            setMediaType(asset.type.split('/')[0]);


            // upload image
            const files = new FormData();

            files.append('files', {
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName,
            });
            try {
                const result = await uploadImage(files);
                console.log('>>>>>upload image: ', result[0]);
                // Kiểm tra cấu trúc phản hồi từ API uploadImage
                // Kiểm tra xem phản hồi có phải là một mảng và có ít nhất một phần tử không
                if (Array.isArray(result) && result.length > 0) {
                    const firstImage = result[0];
                    if (firstImage.url && firstImage.url.length > 0) {
                        setImagePath(firstImage.url);
                        onMediaSelected(firstImage.url);
                    } else {
                        console.log('Không lấy được url', firstImage);
                    }
                } else {
                    console.log('ulr không đúng cấu trúc', result);
                }
            } catch (error) {
                console.log(error);

            }
        }

    }, [onMediaSelected]);

    const handleAddComment = async () => {

        try {
            if (media === null && comments === '' && !imagePath) {
                return
            } else {
                const data = {
                    posts: postId, // lấy id từ id của bài viết
                    content: comments,
                    image: imagePath,
                    parent: parent
                }

                if (checkComments) {
                    setCheckComments(false)
                    const reponse = await addComments(data.posts, data.content, data.image, data.parent)
                    // nếu thêm thành công thì set các biến về trạng thái bang đầu 
                    if (data.parent) {
                        //postId1, body,commentId, receiver 
                        sendNRepComment({ postId1: postId, body: comments, commentId: reponse.id, receiver: comment })
                    } else {
                        //postId1, body, receiver
                        if (creator != user?.id) {
                            sendNCommentPost({ postId: postId, body: comments, receiver: creator })
                        }
                    }
                    setText(null)
                    setParent(null)
                    fetchComments();
                    setComments('');
                    setMedia(null)
                    setImagePath(null)
                    setMediaType(null)
                    Keyboard.dismiss()
                    setCheckComments(true)

                }

            }

        } catch (error) {
            console.log('lỗi tại handleAddComment:', error);
        }
    }
    return (
        <View style={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',

        }} >

            {imagePath && (
                <View style={styles.mediaContainer}>
                    {mediaType === 'image' ? (
                        <Image source={{ uri: imagePath }} style={styles.media} />
                    ) : (
                        <View style={[{ overflow: 'hidden', borderRadius: 10 }, styles.media]}>
                            <Video
                                source={{ uri: imagePath }}
                                style={styles.media}
                                resizeMode='cover'
                            /></View>
                    )}
                    <TouchableOpacity onPress={handleDleteMedia} style={{ marginStart: -5, marginTop: 5 }}>
                        <Icon name='x-circle' size={25} color={COLOR.PrimaryColor} />
                    </TouchableOpacity>
                </View>
            )}


            <View >
                {
                    text && (
                        <View style={{ backgroundColor: '#F4F4F4', paddingTop: 2 }}>
                            <View style={{ flexDirection: 'row', left: 68 }}>
                                <Text style={{ fontWeight: '700' }}>Trả lời</Text>
                                <Text style={{ fontWeight: '800', color: 'black' }}> {text}</Text>
                                <Text style={{ marginLeft: 5, marginRight: 5 }}>᛫</Text>
                                <TouchableOpacity onPress={handleCancel}>
                                    <Text style={{ fontWeight: '700' }}>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
                <View style={styles.ViewSendCmt}>

                    <TouchableOpacity onPress={openPhoto}>
                        <IconPhoto style={styles.ImageCmt} name='camera' size={35} color={COLOR.PrimaryColor} />
                    </TouchableOpacity>

                    <View style={styles.boderInput}>
                        <TextInput placeholder='Nhập bình luận của bạn....' style={styles.inputSend}
                            value={comments}
                            onChangeText={text => { setComments(text) }}
                            multiline={true}
                        >
                        </TextInput>
                    </View>
                    {
                        imagePath || comments ? (
                            <TouchableOpacity style={styles.btnSend} onPress={handleAddComment}>
                                <IconSend name='send' size={28} color={COLOR.PrimaryColor} />
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.btnSend}>
                                <IconSend name='send' size={28} color={COLOR.PrimaryColor} />
                            </View>
                        )
                    }
                </View>
            </View>
        </View>
    )
}

export default InputCmt

const styles = StyleSheet.create({
    mediaContainer: {
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    media: {
        margin: 6,
        width: 60,
        height: 100,
        borderRadius: 10
    },
    UserContai: {
        borderBottomWidth: 1,
        borderBottomColor: '#989898'
    },
    iconOption: {
        width: 28,
        height: 28
    },
    Status: {
        fontSize: 13,
        fontWeight: '600',
        color: 'gray'
    },
    NameUser: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    ViewNameUser: {
        marginStart: -158,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageUser: {
        marginStart: -160,
        width: 45,
        height: 45,
        borderRadius: 100
    },
    IconBack: {
        width: 28,
        height: 28
    },
    ViewUser: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    boderInput: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 280,
        backgroundColor: 'white',
        borderRadius: 50,
        height: 40
    },
    btnSend: {
        marginRight: 10,
        right: 5
    },
    inputSend: {
        width: 250
    },
    ImageCmt: {
        marginStart: 10,
        left: 3
    },
    ViewSendCmt: {
        backgroundColor: '#F4F4F4',
        justifyContent: 'space-between',
        width: '100%',
        height: 70,
        paddingBottom:10,
        flexDirection: 'row',
        alignItems: 'center',

    },


})