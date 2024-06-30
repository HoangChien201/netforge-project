import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import CommentsScreen from '../../screens/CommentsScreen'
import { addComments, uploadImage } from '../../http/TuongHttp'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Video from 'react-native-video'
import { useMyContext } from '../navigation/UserContext'
import { isNull } from 'lodash'


const InputCmt = ({ fetchComments, onMediaSelected, parent = null , postId, text,setParent, setText, comment }) => {
    const { user } = useMyContext();
    const [comments, setComments] = useState('')
    const [media, setMedia] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    console.log('inputcommentid', comment);
    
    useEffect(() => {
        if (text) {
            if(user.id === comment){
                
                setText('chính mình')
                
            }else{
                setComments(text)
            }
            
        }
    }, [text])
    const handleCancel =()=>{
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
        console.log("rp", response);
        takePhoto(response)

    }, []);
    const takePhoto = useCallback(async (response) => {
        if (response.didCancel || response.errorCode || response.errorMessage) return;
        if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            setMedia(asset.uri);
            setMediaType(asset.type.split('/')[0]);
            console.log('asset', asset);


            // upload image
            const files = new FormData();
            console.log(files);

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
            if (media === null && comments === '' && imagePath === null) {
                console.log("Vui lòng comment");
                return
            }
            const data = {
                posts: postId, // lấy id từ id của bài viết
                content: comments,
                image: imagePath,
                parent: parent
            }
            console.log(data);

            const reponse = await addComments(data.posts, data.content, data.image, data.parent)
            console.log(reponse);
            // nếu thêm thành công thì set các biến về trạng thái bang đầu 
            setText(null)
            setParent(null)
            fetchComments();
            setComments('');
            setMedia(null)
            setImagePath(null)
            setMediaType(null)
            console.log("Thêm bình luận thành công !");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{
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
                    <TouchableOpacity onPress={handleDleteMedia} style={{ marginStart: -15, marginTop: 2 }}>
                        <Image source={require('../../media/icon_tuong/exitblack.png')} style={{ width: 15, height: 15 }} />
                    </TouchableOpacity>
                </View>
            )}


            <View >
                {
                    text && (
                        <View style={{  backgroundColor: '#F4F4F4', paddingTop: 2 }}>
                            <View style = {{flexDirection: 'row', left: 68}}>
                            <Text style = {{fontWeight: '700'}}>Trả lời</Text>
                            <Text style = {{fontWeight: '800', color: 'black'}}> {text}</Text>
                            <Text style={{marginLeft: 5, marginRight: 5}}>᛫</Text>
                            <TouchableOpacity onPress={handleCancel}>
                            <Text style = {{fontWeight: '700'}}>Hủy</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
                <View style={styles.ViewSendCmt}>

                    <TouchableOpacity onPress={openPhoto}>
                        <Image style={styles.ImageCmt} source={require('../../media/icon_tuong/cameracolor.png')} />
                    </TouchableOpacity>

                    <View style={styles.boderInput}>
                        <TextInput placeholder='Nhập bình luận của bạn....' style={styles.inputSend}
                            value={comments}
                            onChangeText={text => { setComments(text) }}>
                        </TextInput>
                    </View>

                    <TouchableOpacity style={styles.btnSend} onPress={handleAddComment}>
                        <Image source={require('../../media/icon_tuong/send.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>



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
        marginRight: 10
    },
    inputSend: {
        width: 250
    },
    ImageCmt: {
        marginStart: 10

    },
    ViewSendCmt: {
        backgroundColor: '#F4F4F4',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,

        flexDirection: 'row',
        alignItems: 'center',

    },


})