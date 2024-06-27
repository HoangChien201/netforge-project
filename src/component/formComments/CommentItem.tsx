import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Video from 'react-native-video';
import { getReplyComments, deleteComments } from "../../http/TuongHttp"
import { DateOfTimePost } from '../../format/DateOfTimePost';
import ModalImage from './ModalImage';
import ModalDeleteComments from './ModalDeleteComments';
import ReactionButton from './ReactionButton';
import { tr } from 'date-fns/locale';
const CommentItem = ({ comment, onReply, depth = 0, render }) => {
    const [modalReactionVisible, setModaReactionlVisible] = useState(false);
    const [replies, setReplies] = useState([]);
    // phóng to image
    const [selectedMedia, setSelectedMedia] = useState(null); // Đường dẫn hình ảnh được chọn
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái của modal hiển thị
    const [isDleteVisible, setIsDleteVisible] = useState(false) // delete modal
    const [isHide, setIsHide] = useState(false);
    const handleImagePress = (media) => {
        if (typeof media === 'string') {
            setSelectedMedia(media);
            setIsModalVisible(true);
            console.log(media);
        }
    };
    const handleCommentPress = () => {
        setIsDleteVisible(true);
        console.log(comment.id);
    };
    // handle delete comments
    const handleConfirmDelete = async () => {
        setIsDleteVisible(false);
        try {
            await deleteComments(comment.id);
            render();
         
            console.log('Thành công', 'Bình luận đã được xóa.');
        } catch (error) {
            console.log('Lỗi', 'Không thể xóa bình luận. Vui lòng thử lại.');
        }
    };
  
        
    


    const fetchReplies = async (commentId: any) => {
        try {
            const response: any = await getReplyComments(commentId);
            setReplies(response);

        } catch (error) {
            console.error('Lỗi khi lấy danh sách trả lời bình luận', error);
        }
    };
    useEffect(() => {
        if (comment.id && depth < 1) { // Lòng bình luận 2 cấp
            fetchReplies(comment.id);

        }
    }, [comment, depth]);

    return (
        <View style={[styles.commentContainer, depth > 0 && { marginLeft: depth * 20 }]}>
            {/* Render comment content */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.userContainer}>
                        <Image source={{ uri: comment.user.avatar }} style={styles.avatar} />

                        <TouchableOpacity style={styles.BackgroundComment} onLongPress={() => handleCommentPress()}>
                            <View style={{ padding: 10, flexDirection: 'column' }}>
                                <Text style={styles.fullname}>{comment.user.fullname}</Text>
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
                    <View style={{ flexDirection: "row", alignItems: 'center', marginStart: 50 }}>
                        <Text style={{ marginRight: 5, fontWeight: 'bold' }}>{DateOfTimePost(comment.create_at)}</Text>
                        {
                            !comment.parent &&
                            <>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>᛫</Text>
                                <TouchableOpacity onPress={() => onReply(comment.id)} style={styles.replyButton}>
                                    <Text style={{ fontWeight: 'bold' }}>Trả lời</Text>
                                </TouchableOpacity>
                            </>
                        }
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginLeft: 5 }}>᛫</Text>
                        <TouchableOpacity style={styles.replyButton} onLongPress={()=>setModaReactionlVisible(true)}>
                            <Text style={{ fontWeight: 'bold' }}>Thích</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* // */}
            
            {
                !isHide  && !comment.parent ?
                replies.length > 0 &&(
                    <View style = {{left: 45, top: 2}}>
                <TouchableOpacity onPress={() => setIsHide(true)}>
                <Text style={{fontWeight:'500', fontSize: 14}}>Xem thêm bình luận...</Text>
                </TouchableOpacity>
            </View>
                )
                    :
                    <View style={styles.repliesContainer}>
                        {replies.map(reply => (
                            <CommentItem key={reply.id} comment={reply} onReply={onReply} depth={depth + 1} render={render} />
                        ))}
                    </View>
                    
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
            {/* <ReactionButton
            isVisible={modalReactionVisible}
            onClose={(setModaReactionlVisible(false))}/> */}
                
        </View>
    );
};

export default CommentItem;
const styles = StyleSheet.create({
    repliesContainer: {
        marginLeft: 10
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    line: {

    },
    BackgroundComment: {
        marginLeft: 5,
        borderRadius: 10,
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center"
    }
    ,
    commentContainer: {
        justifyContent: "center",
        padding: 10,
    },
    userContainer: {
        flexDirection: 'row',

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


