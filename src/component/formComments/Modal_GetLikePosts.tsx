import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { getLikePostById } from '../../http/TuongHttp';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
const LikeItem = ({ like }) => {
    const renderReactionImage = () => {
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
        <View style={{ justifyContent: 'center', marginLeft: 10}}>
            <View style={styles.likeItemContainer} >
                <Image source={{ uri: like.user.avatar }} style={styles.avatar}/>
                {renderReactionImage()}
                <Text style={styles.username}>{like.user.fullname}</Text>
            </View>
            <View style={styles.linene}></View>
        </View>
    );
};
const Modal_GetLikePosts = ({ isVisible, onClose, postId, like, setLike }) => {

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const fecthGetLikePost = useCallback(
        async () => {
            try {
                const response: any = await getLikePostById(postId);
                setLike(response)
            } catch (error) {
                console.log('Lỗi lấy danh sách like post:', error);

            }
        }, [postId])
    useEffect(() => {
        fecthGetLikePost();
        if (isVisible) {
           
            bottomSheetModalRef.current?.present();
        }
    }, [isVisible]);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            onClose();
        }
    }, [onClose]);
    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                        opacity={0.7}
                    />
                )}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text style={styles.modalTitle}>Danh Sách Lượt Thích</Text>
                    <FlatList
                        data={like}
                        renderItem={({ item }) => <LikeItem like={item} />}
                        keyExtractor={(item) => item.user.id.toString()}
                        contentContainerStyle={styles.listContainer}
                    />
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}

export default Modal_GetLikePosts

const styles = StyleSheet.create({
    reactionImage: {
        top: 12,
       right: 12,
        width: 18,
        height: 18
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        borderRadius: 20
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
    linene: {
        marginTop: 5,
        justifyContent: 'center',
        width: 350,
        height: 1,
        backgroundColor: '#EEEDEB',
        alignItems: 'center'
    },
})