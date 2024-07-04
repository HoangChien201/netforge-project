import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import User from '../create-post-screen/User';
import { COLOR } from '../../constant/color';
import { createNewPost, getPostById } from '../../http/QuyetHTTP';
import { sharePost } from '../../http/PhuHTTP';

interface ModalShareProps{
    isVisible: boolean,
    onClose: () => void, 
    idPost :any
}

const ModalShare:React.FC<ModalShareProps> = ({ isVisible, onClose, idPost }) => {
    const [content, setContent] = useState<string | null>('');
    const [permission, setPermission] = useState(1);
    const [images, setImages] = useState<any[]>([]);
    const [media, setMedia] = useState([]);
    const type = 1;
    const [friends, setFriends] = useState([]);
    const tags = friends.map(id => ({ user: String(id) }));
    
      // lấy thông tin bài viết
    // const getOnePost = async () => {
    //     try {
    //         const result = await getPostById(idPost);
    //         // console.log('Bài viết đã được lấy thành công', result); // Logging kết quả

    //         // Kiểm tra và cập nhật state chỉ khi kết quả không phải là undefined
    //         if (result || result.length > 0) {
    //             setContent(result.content);
    //             const mediaUrls = result.media.map(item => item.url);
    //             const mediaItem = result.media.map(item => item);
    //             setImages(mediaItem)
    //             setMedia(mediaUrls);
    //             setPermission(result.permission);
    //             //setFriends(result.tags)
    //             console.log('lấy 1 post nè: ', result);
    //         }
    //     } catch (error) {
    //         console.log('get one post error: ', error);
    //         throw error;
    //     }
    // };

    const handleShare = async () => {
        console.log(idPost);
        try {
            const response = await sharePost(idPost, content, permission, type);
            console.log('Share:', response);
        } catch (error) {
            
        }
    };

    const handleClose = () => {
        onClose();
        setContent('');
        Keyboard.dismiss(); // Ẩn bàn phím
    }

return (
    <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}>
        <View style={styles.overlay}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.iconClose} onPress={handleClose}>
                    <Icon name="minus" size={30} color="#000" />
                </TouchableOpacity>
                <View style={styles.modalContent}>
                <User setPermission={setPermission} />
                    <TextInput
                        style={styles.input}
                        placeholder="Hãy nhập nội dung bạn muốn chia sẻ"
                        value={content}
                        onChangeText={setContent}/>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleShare} >
                            <Text style={styles.txtShare}>Chia sẻ ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </Modal>
    );
};

export default ModalShare;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#ddd',
        paddingHorizontal:10,
        paddingBottom:20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalContent: {
        backgroundColor:'#fff',
        borderRadius:10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal:20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin:10
        
    },
    button: {
        backgroundColor: COLOR.PrimaryColor,
        padding:10,
        borderRadius:8,
    },
    txtShare:{
        color: COLOR.primary100,
        fontSize:16,
        fontWeight:'600',
    },
    iconClose: {
        alignItems:'center'
    }
});
