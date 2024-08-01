import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Keyboard, ToastAndroid, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import User from '../create-post-screen/User';
import { COLOR } from '../../constant/color';
import { sharePost } from '../../http/PhuHTTP';
import TextArea from '../create-post-screen/TextArea';
import { useSendNotification } from '../../constant/notify';
import Share from 'react-native-share';


interface ModalShareProps{
    isVisible: boolean,
    onClose: () => void, 
    idPost :any,
    share: any,
    creater:any
}

const ModalShare:React.FC<ModalShareProps> = ({creater, isVisible, onClose, idPost, share }) => {
    const [content, setContent] = useState<string | null>('');
    const [permission, setPermission] = useState(1);
    const [friends, setFriends] = useState([]);
    const { sendNSharePost} = useSendNotification();
    
    useEffect(() => {
        if (isVisible) {
            setContent('');
        }
    }, [isVisible]);
    
    const handleClose = () => {
        onClose();
        setContent('');
        Keyboard.dismiss(); // Ẩn bàn phím
    }

    const handleShare = async () => {
        Keyboard.dismiss(); // Ẩn bàn phím
        try {
            if (share) {
                const response = await sharePost(share, content, permission, 1);
                handleClose()
                ToastAndroid.show('Chia sẻ bài viết thành công', ToastAndroid.SHORT);
                handleSendNotification(response)
            } else {
                const response = await sharePost(idPost, content, permission, 1);
                handleClose()
                ToastAndroid.show('Chia sẻ bài viết thành công', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log("lỗi share post: ", error)
        }
    };

    const shareApp = (postId: string) => {
        const deepLink = `https://netforge/post/${postId}`;
        const shareOptions = {
            title: 'Chia sẻ bài viết',
            // message: `${deepLink}`,
            url: deepLink,
        };

        Share.open(shareOptions)
            .then((res) => console.log(res))
            .catch((err) => err && console.log(err));
    };

    const handleSendNotification = (post: any) => {
        const data = {
            postId: post.id,
            body: post.contain,
            receiver: creater.id
        };
        sendNSharePost(data);
        console.log(data);
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
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleShare} >
                            <Text style={styles.txtShare}>Chia sẻ ngay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.button]} onPress={() => shareApp(idPost)}>
                            <Text style={styles.txtShare}>Share App</Text>
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
    copyButton: {
        backgroundColor: COLOR.PrimaryColor,
    },
});
