import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, Keyboard, ToastAndroid, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import User from '../create-post-screen/User';
import { COLOR } from '../../constant/color';
import { createNewPost, getPostById } from '../../http/QuyetHTTP';
import { sharePost } from '../../http/PhuHTTP';
import TextArea from '../create-post-screen/TextArea';


interface ModalShareProps{
    isVisible: boolean,
    onClose: () => void, 
    idPost :any,
    share: any
}

const ModalShare:React.FC<ModalShareProps> = ({ isVisible, onClose, idPost, share }) => {
    const [content, setContent] = useState<string | null>('');
    const [permission, setPermission] = useState(1);
    const [images, setImages] = useState<any[]>([]);
    const [media, setMedia] = useState([]);
    const type = 1;
    const [friends, setFriends] = useState([]);
    const tags = friends.map(id => ({ user: String(id) }));
    
    useEffect(() => {
        if (isVisible) {
            // Mở modal khi isVisible là true
            setContent('');
        }
    }, [isVisible]);
    
    const handleClose = () => {
        onClose();
        setContent('');
        Keyboard.dismiss(); // Ẩn bàn phím
    }

    const handleShare = async () => {
        //console.log(idPost);
        try {
            if(share) {
                const response = await sharePost(share, content, permission, type);
                //console.log('Share:',share);
                handleClose()
                ToastAndroid.show('Chia sẻ bài viết thành công', ToastAndroid.SHORT);
            } else{
                const response = await sharePost(idPost, content, permission, type);
                //console.log('Share idPost:');
                handleClose()
                ToastAndroid.show('Chia sẻ bài viết thành công', ToastAndroid.SHORT);
            }
           
        } catch (error) {
            
        }
    };

   

return (
    <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClose}>
        <Pressable style={styles.overlay} onPress={handleClose}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.iconClose} onPress={handleClose}>
                    <Icon name="minus" size={30} color="#000" />
                </TouchableOpacity>
                <View style={[styles.modalContent]}>
                <User setPermission={setPermission} />
                    <View  style={styles.input}>
                        <TextArea content={content} setContent={setContent} setFriends={setFriends} friends={friends}/>
                    </View>
                    {/* <TextInput
                        style={styles.input}
                        placeholder="Hãy nhập nội dung bạn muốn chia sẻ"
                        value={content}
                        onChangeText={setContent}/> */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleShare} >
                            <Text style={styles.txtShare}>Chia sẻ ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Pressable>
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
    },
    
});
