import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLOR } from '../../constant/color'
import USER from './User'
import OPTIONS from './Options'
import EMOJILIST from './EmojiList'
import TEXTAREA from './TextArea'
import { upLoadImage, updatePost } from '../../http/QuyetHTTP'

const Body = ({ showModalEdit, setShowModalEdit , post,user}) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState('');
    const [type, setType] = useState(1);

    // lấy thông tin bài viết
    useEffect(() => {
        if (post) {
            setText(post.text);
            setImagePath(post.imagePath);
            setType(post.type);
        }
    }, [post]);
    // lấy thông tin user
    useEffect(() => {
        if (user) {
        }
    }, [post]);
    // Emoji
    const handleEmojiSelect = (emoji: any) => {
        setText(text + emoji);
    };
    //lấy ảnh
    const handleImageSelect = (uri) => {
        setImage(uri);
       // console.log(uri);

    };
    // xóa ảnh
    const deleteImage = () => {
        setImage(null);
    }
    // update bài viết 
    const uploadPost = async () => {
        try {
            let uploadedImagePath = imagePath;
            if (image) {
                const formData = new FormData();
                formData.append('file', {
                    uri: image,
                    type: 'image/jpeg',
                    name: 'photo.jpg',
                });
                const uploadResult = await upLoadImage(formData);
                uploadImagePath = uploadResult.path;

            }
            // Tạo bài viết mới
            const newPost = await updatePost(postId, type, text, uploadedImagePath);
            console.log('Bài viết đã được update:', newPost);

            // Đóng modal sau khi tạo bài viết
            setShowModalEdit(false);
        } catch (error) {
            console.error('Lỗi khi tạo bài viết:', error);
           // console.log(text, type, image, imagePath);

        }
    }
    return (
        <Modal visible={showModalEdit} animationType="slide" style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setShowModalEdit(false)} style={styles.closeButton} >
                    <Image style={styles.closeImage} source={require('../../media/quyet_icon/x_w.png')} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Edit Post</Text>
                <TouchableOpacity style={styles.saveButton} onPress={uploadPost}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>
            <USER setType={setType} />
            <View>
                {image ? <Image source={{ uri: image }} style={styles.image} resizeMode="contain" /> : null}
                {image ? <TouchableOpacity style={styles.buttonDeleteImage} onPress={deleteImage}>
                    <Text style={styles.textDeleteImage}>Delete</Text>
                </TouchableOpacity> : null}

            </View>

            <TEXTAREA text={text} setText={setText} />
            <OPTIONS onSelectEmoji={handleEmojiSelect} onSelectImage={handleImageSelect} />
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
    textDeleteImage: {
        color: 'white'
    },
    buttonDeleteImage: {
        backgroundColor: COLOR.PrimaryColor,
        padding: 2,
        height: 30,
        width: 60,
        borderRadius: 10,
        position: 'absolute',
        end: 16,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

})