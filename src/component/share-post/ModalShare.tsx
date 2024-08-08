import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Keyboard, ToastAndroid, Pressable, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import User from '../create-post-screen/User';
import { COLOR } from '../../constant/color';
import { sharePost } from '../../http/PhuHTTP';
import TextArea from '../create-post-screen/TextArea';
import { useSendNotification } from '../../constant/notify';
import Share, { Social } from 'react-native-share';
import ModalPoup from '../Modal/ModalPoup';
import ModalFail from '../Modal/ModalFail';


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
    const [status, setStatus] = useState(true);
    const [showModalLoading, setShowModalLoading] = useState(false);
    
    useEffect(() => {
        if (isVisible) {
            setContent('');
        }
    }, [isVisible]);
    
    const handleClose = () => {
        onClose();
        setContent('');
        Keyboard.dismiss()
    }

    const handleShare = async () => {
        try {
            if (share) {
                const response = await sharePost(share, content, permission, 1);
                handleSendNotification(response)
                
            } else {
                const response = await sharePost(idPost, content, permission, 1);
                handleSendNotification(response)
            }
            setStatus(true);
            setShowModalLoading(true);
            setTimeout(() => {
                setShowModalLoading(false);
                handleClose();
            }, 2000);
        } catch (error) {
            console.log("lỗi share post: ", error)
            setStatus(false);
            setShowModalLoading(true);
            setTimeout(() => {
                setShowModalLoading(false);
                handleClose();
            }, 2000);
        }
    };

    // const sharePostToZalo = (postId) => {
    //     const url = `https://netforge/post/${postId}`;
    //     const zaloUrl = `https://zalo.me/share?url=${encodeURIComponent(url)}`;
    //     Linking.openURL(zaloUrl)
    //       .then(() => console.log('Mở Zalo thành công'))
    //       .catch((err) => console.error('Lỗi mở Zalo:', err));
    //   };

      const shareApp = async () => {
        const url = `https://netforge/home`;
        const shareOptions = {
          title: 'Chia sẻ bài viết',
          message: 'Xem bài viết này trên ứng dụng của tôi!',
          url: url,
          failOnCancel: false,
        };
      
        try {
            const result = await Share.open(shareOptions);
            console.log('Đã chia sẻ thành công qua Messenger:', result);
          } catch (error) {
            console.log('Chia sẻ bị hủy hoặc thất bại:', error);
          }
        // try {
        //   const result = await Share.open(shareOptions);
        //   if (result.app === 'com.zing.zalo') {
        //     const zaloUrl = `https://zalo.me/share?url=${encodeURIComponent(url)}`;
        //     Linking.openURL(zaloUrl)
        //       .then(() => console.log('Mở Zalo thành công'))
        //       .catch((err) => console.error('Lỗi mở Zalo:', err));
        //   } else if (result.app === 'com.facebook.orca') {
        //     // Thêm xử lý cho Facebook Messenger nếu cần thiết
        //   } else {
        //     console.log('Đã chia sẻ thành công qua ứng dụng khác:', result);
        //   }
        // } catch (error) {
        //   console.log('Chia sẻ bị hủy hoặc thất bại:', error);
        // }
      };

    // const shareApp = (postId: string) => {
    //     const deepLink = `https://netforge/post/${postId}`;
    //     const shareOptions = {
    //         title: 'Chia sẻ bài viết',
    //         // message: `${deepLink}`,
    //         url: deepLink,
    //         social: Share.Social.FACEBOOK
    //     };

    //     Share.open(shareOptions)
    //         .then((res) => console.log(res))
    //         .catch((err) => console.log(err));
        
    // };

    const handleSendNotification = (post: any) => {
        const data = {
            postId: post.id,
            body: post.contain,
            receiver: creater.id
        };
        sendNSharePost(data);
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
                        <TouchableOpacity style={[styles.button, styles.button]} onPress={() => shareApp()}>
                            <Text style={styles.txtShare}>Share App</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    {status ? (
                <ModalPoup text="Đã chia sẻ bài viết!" visible={showModalLoading} />
            ) : (
                <ModalFail text="Chia sẻ bài viết thất bại!" visible={showModalLoading} />
            )}
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
