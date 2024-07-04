import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { getLikePostById } from '../../http/TuongHttp';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
const LikeItem = ({ like }) => {
    const renderReactionImage = () => {
        // console.log(user.id);
        if (like.reaction === 1) {
            return (
                <Image
                    source={require('../../media/Dicons/thumb-up.png')}
                    style={styles.reactionImage}
                />
            );
        } else if (like.reaction === 2) {
            return (
                <Image
                    source={require('../../media/Dicons/happy-face.png')}
                    style={styles.reactionImage}
                />
            );
        } else if (like.reaction === 3) {
            return (
                <Image
                    source={require('../../media/Dicons/smile.png')}
                    style={styles.reactionImage}
                />
            );
        } else if (like.reaction === 4) {
            return (
                <Image
                    source={require('../../media/Dicons/heartF.png')}
                    style={styles.reactionImage}
                />
            );
        } else if (like.reaction === 5) {
            return (
                <Image
                    source={require('../../media/Dicons/wow.png')}
                    style={styles.reactionImage}
                />
            );
        } else if (like.reaction === 6) {
            return (
                <Image
                    source={require('../../media/Dicons/angry.png')}
                    style={styles.reactionImage}
                />
            );
        }
    };
    return (
        <View style={{ justifyContent: 'center', }}>
            <View style={styles.likeItemContainer} >
                <Image source={{ uri: like.user.avatar }} style={styles.avatar} />
                {renderReactionImage()}
                <Text style={styles.username}>{like.user.fullname}</Text>
            </View>
            <View style={styles.linene}></View>
        </View>
    );
};
const Modal_GetLikePosts = ({ isVisible, onClose, postId }) => {
    const [like, setLike] = useState([]);
    // console.log('postmodal:', postId);
    // console.log(like);
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // variables
    const snapPoints = useMemo(() => ['25%', '70%'], []);
    const fecthGetLikePost = useCallback(
        async () => {
            try {
                const response: any = await getLikePostById(postId);
                console.log('Danh sách Like Posts:', response);
                setLike(response)
            } catch (error) {
                console.log('Lỗi lấy danh sách like post:', error);

            }
        }, [postId])
    useEffect(() => {

        if (isVisible) {
            fecthGetLikePost();
            bottomSheetModalRef.current?.present();
        }
    }, [isVisible]);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        if (index === -1) {
            onClose();
        }
    }, [onClose]);
    return (
        // <Modal
        //     transparent={true}
        //     visible={isVisible}
        //     onRequestClose={onClose}
        //     animationType="fade">
        //     <View style={styles.modalContainer}>
        //         <View style={styles.modalContent}>
        //             <Text style={styles.modalTitle}>Danh sách lượt thích</Text>
        //             <FlatList
        //                 data={like}
        //                 renderItem={({ item }) => <LikeItem user={item.user} />}
        //                 keyExtractor={(item) => item.user.id.toString()}
        //                 contentContainerStyle={styles.listContainer}
        //             />
        //             <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        //                 <Text style={styles.closeButtonText}>Đóng</Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        // </Modal>
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text style={styles.modalTitle}>Danh Sách Lượt Thích</Text>
                    <FlatList
                        data={like}
                        renderItem={({ item }) => <LikeItem like={item} />}
                        keyExtractor={(item) => item.user.id.toString()}
                        contentContainerStyle={styles.listContainer}
                    />
                    {/* <TouchableOpacity onPress={() => bottomSheetModalRef.current?.dismiss()} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity> */}
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}

export default Modal_GetLikePosts

const styles = StyleSheet.create({
    linene: {
        marginTop: 5,
        justifyContent: 'center',
        width: 350,
        height: 1,
        backgroundColor: '#BFBFBF',
        alignItems: 'center'
    },
    reactionImage: {
        top: 15,
        right: 15,
        width: 18,
        height: 18
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        borderRadius: 10
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000'
    },
    listContainer: {
        width: '100%',

    },
    likeItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        height: 55

    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 20,
    },
    username: {
        fontSize: 14,
        right: 10,
        fontWeight: '400',
        color: '#000'
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
})