import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Video from 'react-native-video';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { getReplyComments, deleteComments } from "../../http/TuongHttp"
import { DateOfTimePost } from '../../format/DateOfTimePost';
import ModalImage from './ModalImage';
import ModalDeleteComments from './ModalDeleteComments';
import ModalOtherDelete from './ModalOtherDelete';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';
import { navigationType } from '../stack/UserStack';
import Reaction from './Reaction';
import { RootState } from '../store/store';
import FastImage from 'react-native-fast-image';
import ICON from 'react-native-vector-icons/Entypo'
import { COLOR } from '../../constant/color';

const CommentItem = ({ comment, onReply, depth = 0, render, parent, setText, setUserId, postId, userPostId }) => {
    const user = useSelector((state: RootState) => state.user.value)
    const navigation = useNavigation<navigationType>()
    const [modalReactionVisible, setModaReactionlVisible] = useState(false);
    const [likeIcon, setLikeIcon] = useState(null);
    const [replies, setReplies] = useState([]);
    const [checkLike, setCheckLike] = useState(false)



    // phóng to image
    const [selectedMedia, setSelectedMedia] = useState(null); // Đường dẫn hình ảnh được chọn
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái của modal hiển thị
    const [isDleteVisible, setIsDleteVisible] = useState(false) // delete modal
    const [isOtherDleteVisible, setIsOtherDleteVisible] = useState(false)
    const [isHide, setIsHide] = useState(false);
    //render
    useEffect(() => {
        if (comment.id) {
            fetchReplies(comment.id);
        }


    }, [comment]);
    const handleImagePress = (media) => {
        if (typeof media === 'string') {
            setSelectedMedia(media);
            setIsModalVisible(true);
        }
    };
    const handleCommentPress = () => {
        if (user?.id === comment.user.id) {
            setIsDleteVisible(true);
        }

    };
    // handle delete comments
    const handleConfirmDelete = async () => {
        setIsDleteVisible(false);
        try {
            await deleteComments(comment.id);
            render();

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
        //close reaction
        setCheckLike(false)
        onReply(comment.id)
        // lấy name của bình luận cha và set vào innputComment
        setText(comment.user.fullname);
        //props lấy commnent.user.id
        setUserId(comment.user.id)
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
                            postId={postId}
                            userPostId={userPostId}

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
                            postId={postId}
                            userPostId={userPostId}

                        />
                    ))}
                </View>
            );
        }

    };
    const handleToProfile = () => {
        //setSelectedUserId(userId);
        const userId = comment.user.id
        if (userId === user?.id) {
            //setIsModalVisible(false);
            navigation.navigate(ProfileRootStackEnum.ProfileScreen);
        } else {
            //  setIsModalVisible(true);
            navigation.navigate(ProfileRootStackEnum.FriendProfile, { userId });
        }
    };
    const handleCheck = () => {
        setCheckLike(false)

    }
    return (
        <Pressable onPress={handleCheck} style={[
            styles.commentContainer,
            {
                padding: depth < 1 ? 0 : 0,
                marginStart: depth == 1 ? 25 : 0
            }]}>
            {/* Render comment content */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.userContainer}>
                        <Pressable onPress={handleToProfile}>
                            <Image source={{ uri: comment.user.avatar }} style={styles.avatar} />
                        </Pressable>

                        <Pressable onLongPress={() => handleCommentPress()}>
                            <View style={[styles.BackgroundComment,
                            { backgroundColor: comment.content && '#E6E6FA', }]}>
                                <Pressable style={{ padding: 10, flexDirection: 'column' }} onLongPress={() => handleCommentPress()}>
                                    <Pressable onLongPress={() => handleCommentPress()}>
                                        <Text style={styles.fullname}>{comment.user.fullname}</Text>
                                    </Pressable>
                                    {comment.content ? (
                                        <Text style={styles.content}>{comment.content}</Text>
                                    ) : null}

                                </Pressable>
                            </View>
                            <View style={{ marginTop: 5, alignItems: 'center', bottom: comment.image && !comment.content && 10, marginBottom: comment.image && !comment.content && -10, right: 15 }}>
                                {comment.image ? (
                                    comment.image.endsWith('.mp4') ? (
                                        <Pressable style={{ width: 100, height: 150, alignItems:'center', justifyContent:'center'}} onPress={() => handleImagePress(comment.image)} onLongPress={() => handleCommentPress()}>
                                            {/* <Video source={{ uri: comment.image }} style={styles.media} resizeMode='cover' /> */}
                                            <FastImage
                                                style={styles.media}
                                                source={{
                                                    uri: comment?.image,
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.cover}
                                            />
                                            <ICON name='controller-play' color={COLOR.PrimaryColor1} size={22} style={{position:'absolute', padding:5, backgroundColor:'gray', borderRadius:5}}/>
                                        </Pressable>

                                    ) : (
                                        <Pressable style={{ width: 100, height: 150, }} onPress={() => handleImagePress(comment.image)} onLongPress={() => handleCommentPress()}>
                                            <Image source={{ uri: comment.image }} style={styles.media} />
                                        </Pressable>

                                    )
                                ) : null}
                            </View>

                        </Pressable>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginStart: 55, marginTop: 3 }}>
                        <Text style={{ marginRight: 5, fontWeight: 'bold', fontSize: 14 }}>{DateOfTimePost(comment.create_at)}</Text>

                        <>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'black', }}>᛫</Text>
                            <TouchableOpacity onPress={handleReply} style={styles.replyButton}>
                                <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Trả lời</Text>
                            </TouchableOpacity>
                        </>

                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'black', marginLeft: 5 }}>᛫</Text>
                        <Reaction like_count={comment.like_count} type={comment.reaction}
                            commentId={comment.id} checkReaction={checkLike} setCheckReaction={setCheckLike} render={render} Cmt={comment} postId={postId} userPostId={userPostId} />

                    </View>
                </View>
            </View>
            {/* // */}

            {
                !isHide && !comment.parent ?
                    replies.length > 0 && (
                        <View style={{ left: 50, marginTop: 7 }}>
                            <Pressable onPress={() => setIsHide(true)}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={{ uri: replies[0].user.avatar }} style={{ width: 25, height: 25, borderRadius: 100 }} />
                                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#000', marginLeft: 5 }}>{replies[0].user.fullname}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 3, color: '#000', fontWeight: '400' }}>đã trả lời</Text>
                                    <Text style={{ fontWeight: '500', fontSize: 13, color: 'black', marginLeft: 3 }}>᛫</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 3, fontWeight: '400' }}>{replies.length} phản hồi</Text>

                                </View>

                            </Pressable>
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
            {/* Modal Otherdelete comments*/}
            <ModalOtherDelete
                isVisible={isOtherDleteVisible}
                onCancel={() => setIsOtherDleteVisible(false)} />
        </Pressable>
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
        justifyContent: "center",
        alignItems: "center",
        marginRight: 40
    }
    ,
    commentContainer: {
        margin: 5,
        justifyContent: "center",
    },
    userContainer: {
        flexDirection: 'row',
        marginStart: 10,

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


