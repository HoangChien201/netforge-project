import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Video from 'react-native-video';
import { getReplyComments, deleteComments, deleteLikeComments } from "../../http/TuongHttp"
import { DateOfTimePost } from '../../format/DateOfTimePost';
import ModalImage from './ModalImage';
import ModalDeleteComments from './ModalDeleteComments';
import ModalOtherDelete from './ModalOtherDelete';
import ReactionButton from './ReactionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMyContext } from '../navigation/UserContext';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';
import { useNavigation } from '@react-navigation/native';
import { navigationType } from '../stack/UserStack';
import { reaction } from '../../constant/emoji';

const CommentItem = ({ comment, onReply, depth = 0, render, parent, setText, setUserId }) => {
    const { user } = useMyContext();
    const navigation = useNavigation<navigationType>()
    const [modalReactionVisible, setModaReactionlVisible] = useState(false);
    const [likeIcon, setLikeIcon] = useState(null);
    const [replies, setReplies] = useState([]);

    // phóng to image
    const [selectedMedia, setSelectedMedia] = useState(null); // Đường dẫn hình ảnh được chọn
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái của modal hiển thị
    const [isDleteVisible, setIsDleteVisible] = useState(false) // delete modal
    const [isOtherDleteVisible, setIsOtherDleteVisible] = useState(false)
    const [isHide, setIsHide] = useState(false);
    //render
    useEffect(() => {
        if (comment.id) { // Lòng bình luận 2 cấp
            fetchReplies(comment.id);
        }

    }, [comment]);
    useEffect(() => {
        const loadReaction = async () => {
            try {
                const savedReaction = await AsyncStorage.getItem(`comment_${comment.id}_user_${user.id}_reaction`);
                if (savedReaction) {
                    setLikeIcon(JSON.parse(savedReaction));
                    console.log('savene', JSON.parse(savedReaction));

                }
            } catch (error) {
                console.log('Lỗi khi lấy Icon:', error);
            }
        };
        loadReaction();
    }, [comment.id]);

    //handle hủy like
    const handleCancelLike = async () => {
        //call api cancelLike and setLikeIcon =null
        setLikeIcon(null);
        // console.log('delete like nè');
        // console.log('idcomment', comment.id);
        // console.log(comment.user.id);
        try {
            const reponse = await deleteLikeComments(comment.id, comment.user.id)
            await AsyncStorage.removeItem(`comment_${comment.id}_user_${user.id}_reaction`);
            console.log('delete like thành công:', reponse);

        } catch (error) {
            console.log(error);

        }
    }
    // handle setIcon
    const handleSelectReaction = async (reaction) => {
        setModaReactionlVisible(false);
        setLikeIcon(reaction.source)
        try {
            await AsyncStorage.setItem(`comment_${comment.id}_user_${user.id}_reaction`, JSON.stringify(reaction.source));
            console.log('Icon đã chọn:', reaction);
        } catch (error) {
            console.log('Lỗi khi lưu Icon:', error);
        }
    };
    const handleImagePress = (media) => {
        if (typeof media === 'string') {
            setSelectedMedia(media);
            setIsModalVisible(true);
            console.log(media);
        }
    };
    const handleCommentPress = () => {
        if (user.id === comment.user.id) {
            setIsDleteVisible(true);
        } else {
            setIsOtherDleteVisible(true)

        }
        console.log(comment.id);
    };
    // handle delete comments
    const handleConfirmDelete = async () => {
        setIsDleteVisible(false);
        try {
            await deleteComments(comment.id);
            render();

            console.log('Bình luận đã được xóa.');
        } catch (error) {
            console.log('Không thể xóa bình luận');
        }
    };
    // get ds reply
    const fetchReplies = async (commentId: any) => {
        try {
            const response: any = await getReplyComments(commentId);
            setReplies(response)

        } catch (error) {
            console.error('Lỗi khi lấy danh sách trả lời bình luận', error);
        }
    };
    // handle trả lời bình luận
    const handleReply = () => {

        onReply(comment.id)
        // lấy name của bình luận cha và set vào innputComment
        setText(comment.user.fullname);
        console.log("item", comment.user.fullname);
        //props lấy commnent.user.id
        setUserId(comment.user.id)
        console.log('idbinhluan', comment.user.id);
    }

    const renderRepliesContainer = () => {
        if (depth < 0)
            return (
                <View style={styles.repliesContainer}>
                    {replies.map(reply => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            onReply={onReply}
                            depth={depth + 1}
                            render={render}
                            setText={setText}
                            setUserId={setUserId}
                        />
                    ))}
                </View>
            );
        else {

            return (
                <View style={styles.repliesContainer}>
                    {replies.map(reply => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            onReply={onReply}
                            depth={depth + 1}
                            render={render}
                            setText={setText}
                            setUserId={setUserId}
                        />
                    ))}
                </View>
            );
        }

    };
    const handleToProfile = () => {
        //setSelectedUserId(userId);
        console.log("userID: ", comment.user.id);
        const userId = comment.user.id
        if (userId === user.id) {
            //setIsModalVisible(false);
            navigation.navigate(ProfileRootStackEnum.ProfileScreen);
        } else {
            //  setIsModalVisible(true);
            navigation.navigate(ProfileRootStackEnum.FriendProfile, { userId });
        }
    };
    return (
        <View style={[
            styles.commentContainer,
            {
                padding: depth < 1 ? 0 : 0,
                marginStart: depth == 1 ? 25 : 0
            }]}>
            {/* Render comment content */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.userContainer}>
                        <TouchableOpacity onPress={handleToProfile}>
                            <Image source={{ uri: comment.user.avatar }} style={styles.avatar} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.BackgroundComment} onLongPress={() => handleCommentPress()}>
                            <View style={{ padding: 10, flexDirection: 'column' }}>
                                <TouchableOpacity>
                                    <Text style={styles.fullname}>{comment.user.fullname}</Text>
                                </TouchableOpacity>
                                {comment.content ? (
                                    <Text style={styles.content}>{comment.content}</Text>
                                ) : null}
                                <View style={{ marginTop: 5, alignItems: 'center' }}>
                                    {comment.image ? (
                                        comment.image.endsWith('.mp4') ? (
                                            <TouchableOpacity style={{ width: 100, height: 150, }} onPress={() => handleImagePress(comment.image)}>
                                                <Video source={{ uri: comment.image }} style={styles.media} resizeMode='cover' />
                                            </TouchableOpacity>

                                        ) : (
                                            <TouchableOpacity style={{ width: 100, height: 150, }} onPress={() => handleImagePress(comment.image)}>
                                                <Image source={{ uri: comment.image }} style={styles.media} />
                                            </TouchableOpacity>

                                        )
                                    ) : null}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginStart: 55 }}>
                        <Text style={{ marginRight: 5, fontWeight: 'bold', fontSize: 14 }}>{DateOfTimePost(comment.create_at)}</Text>
                        {
                            !comment.parent &&
                            <>
                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'black', }}>᛫</Text>
                                <TouchableOpacity onPress={handleReply} style={styles.replyButton}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Trả lời</Text>
                                </TouchableOpacity>
                            </>
                        }

                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'black', marginLeft: 5 }}>᛫</Text>

                        {
                            modalReactionVisible && (
                                
                                    <ReactionButton
                                        render={render}
                                        comment={comment}
                                        isVisible={modalReactionVisible}
                                        onSelectReaction={handleSelectReaction}
                                        onClose={() => setModaReactionlVisible(false)}

                                    />
                            

                            )
                        }
                        <TouchableOpacity style={styles.replyButton} onLongPress={() => setModaReactionlVisible(true)}>
                            {likeIcon ?
                                (<View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={handleCancelLike} onLongPress={() => setModaReactionlVisible(true)}>
                                        <Image source={likeIcon} style={styles.likeIcon} />
                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: 5, fontSize: 14 }}>{comment.like_count}</Text>
                                </View>
                                )
                                :
                                ( 
                                         <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Thích</Text>
                            
                                )
                            }

                        </TouchableOpacity>


                    </View>
                </View>
            </View>
            {/* // */}

            {
                !isHide && !comment.parent ?
                    replies.length > 0 && (
                        <View style={{ left: 50, marginTop: 7 }}>
                            <TouchableOpacity onPress={() => setIsHide(true)}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={{ uri: replies[0].user.avatar }} style={{ width: 25, height: 25, borderRadius: 100 }} />
                                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#000', marginLeft: 5 }}>{replies[0].user.fullname}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 3, color: '#000', fontWeight: '400' }}>đã trả lời</Text>
                                    <Text style={{ fontWeight: '500', fontSize: 13, color: 'black', marginLeft: 3 }}>᛫</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 3, fontWeight: '400' }}>{replies.length} phản hồi</Text>

                                </View>

                            </TouchableOpacity>
                        </View>
                    )
                    :
                    renderRepliesContainer()
            }
            {/* Modal phóng to hình ảnh khi chạm vào hình ảnh sẽ phóng to, khi chạm lần 2 hình sẽ ẩn */}
            <ModalImage
                isVisible={isModalVisible}
                media={selectedMedia}
                onClose={() => setIsModalVisible(false)} />
            {/* Modal delete comments*/}
            <ModalDeleteComments
                isVisible={isDleteVisible}
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsDleteVisible(false)} />
            {/* Modal reaction comments*/}

            {/* Modal Otherdelete comments*/}
            <ModalOtherDelete
                isVisible={isOtherDleteVisible}
                onCancel={() => setIsOtherDleteVisible(false)} />
        </View>
    );
};

export default CommentItem;
const styles = StyleSheet.create({
    likeIcon: {
        width: 18,
        height: 18
    },
    repliesContainer: {
        marginTop: 10
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    BackgroundComment: {
        marginLeft: 5,
        borderRadius: 10,
        backgroundColor: "#E6E6FA",
        justifyContent: "center",
        alignItems: "center"
    }
    ,
    commentContainer: {
        margin: 5,
        justifyContent: "center",
    },
    userContainer: {
        flexDirection: 'row',
        marginStart: 10

    },
    avatar: {
        top: 1,
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    fullname: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16
    },
    content: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000'
    },
    media: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        overflow: 'hidden'

    },
    replyButton: {
        marginLeft: 5
    },
});


