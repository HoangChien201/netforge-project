import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, FlatList, Modal } from 'react-native'
import React, { useMemo, useState, useRef, useEffect } from 'react'
import UserPost from '../component/formComments/UserPost';
import InputCmt from '../component/formComments/InputCmt';
import CommentItem from '../component/formComments/CommentItem';
import { getComments, addComments, getPostById } from '../http/TuongHttp';
import { useNavigation } from '@react-navigation/native'
import { navigationType } from '../component/stack/UserStack'
import Video from 'react-native-video';
import { DateOfTimePost } from '../format/DateOfTimePost';
import { number } from 'yup';
import { useRoute } from '@react-navigation/native';
import ItemPost from '../component/listpost/ItemPost';
const CommentsScreen = () => {
    const navigation = useNavigation<navigationType>()
    const [post, setPosts] = useState(null);
    const [replyTo, setReplyTo] = useState(null);
    const [comment, setComments] = useState([]);
    const [imagePath, setImagePath] = useState(null);
    const [commentCount, setCommentCount] = useState(0);
    const scrollViewRef = useRef();
    const route = useRoute();
    const { postId } = route.params;
    console.log('postId', postId);
    // lấy bài viết chi tiết
    const fetchPosts = async () => {
        try {
            //goo
            const response: any = await getPostById(postId);
            console.log("posts", response);
            setPosts(response)
            fetchComments();
            console.log("repon", response);
        } catch (error) {
            console.log(error);
        }
    };

    // hàm lấy danh sách comments
    const fetchComments = async () => {
        try {
            //goo
            const response: any = await getComments(postId);
            setComments(response.reverse());
            setCommentCount(response.length);
        } catch (error) {
            console.log(error);
        }
    };
    // Hàm xử lý khi người dùng chọn trả lời một bình luận
    const handleReply = (parent) => {
        setReplyTo(parent); // Thiết lập bình luận cha để trả lời
        console.log(parent);
    };
    // // hàm render comments
    useEffect(() => {

        fetchPosts();
    }, []);

    const handleMediaSelected = (media) => {
        setImagePath(media);
    };

    useEffect(() => {
        if (commentCount > 0) {
            // Nếu có bình luận mới, scrollView sẽ cuộn xuống bình luận mới
            scrollViewRef.current.scrollToEnd({ animated: false });
        }
    }, [commentCount]);
    return (
        <View style={styles.container}>

            <View style={{ height: "100%", backgroundColor: 'white' }}>

                <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} >
                    {
                        post && (
                            <View>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 1}}>
                                    <Image source={require('../media/icon_tuong/back.png')} style={styles.IconBack} />
                                </TouchableOpacity>
                                <ItemPost key={post.id} data={post} />
                            </View>
                        )
                    }
                    {comment.length === 0 ? (
                        <View style={styles.ViewNoComment}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ width: 200, height: 200, marginBottom: 20 }} source={require('../media/icon_tuong/chat.png')} />
                                <Text style={styles.textNoComment1}>Chưa có bình luận nào</Text>
                                <Text style={styles.textNoComment2}>Hãy là người đầu tiên bình luận.</Text>
                            </View>
                        </View>
                    ) : (
                        comment.map(comment => (
                            <CommentItem key={comment.id} comment={comment} onReply={handleReply} render={fetchComments} />
                        ))
                    )
                    }
                </ScrollView>
            </View>

            <InputCmt
                fetchComments={fetchComments}
                parent={replyTo} // Truyền ID bình luận cha khi trả lời
                onMediaSelected={handleMediaSelected} // Xử lý khi người dùng chọn hình ảnh hoặc video
                postId={postId}
                onCommentAdded={() => {
                    fetchComments(); // Gọi lại danh sách bình luận sau khi thêm bình luận
                    setReplyTo(null) // Đặt lại trạng thái trả lời
                    setImagePath(null); // Xóa đường dẫn hình ảnh sau khi thêm bình luận
                }}
            />



        </View>
    )
}

export default CommentsScreen

const styles = StyleSheet.create({
    textNoComment2: {
        fontSize: 16,
        fontWeight: '500'
    },
    textNoComment1: {
        fontWeight: 'bold',
        fontSize: 20
    },
    ViewNoComment: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 500
    },
    itemRecentContai: {
        backgroundColor: '#f2f2f2'
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    textCmt: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000'
    },
    nameItem: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    boderView: {
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'pink',
        marginStart: 10,
        marginRight: 10
    },
    itemRecent: {

        margin: 10,
        flexDirection: 'row',
    },
    InfoCmt: {
        width: 'auto',
        flexDirection: 'row',
    },
    imageItem: {
        marginTop: 5,
        width: 40,
        height: 40,
        borderRadius: 100
    },
    UserContai: {
        borderBottomWidth: 1,
        borderBottomColor: '#989898'
    },
    iconOption: {
        width: 28,
        height: 28
    },
    Status: {
        fontSize: 13,
        fontWeight: '600',
        color: 'gray'
    },
    NameUser: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    ViewNameUser: {
        marginStart: -158,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageUser: {
        marginStart: -160,
        width: 45,
        height: 45,
        borderRadius: 100
    },
    IconBack: {
        
        width: 28,
        height: 28
    },
    ViewUser: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    boderInput: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 280,
        backgroundColor: 'white',
        borderRadius: 50,
        height: 40
    },
    btnSend: {
        marginRight: 10
    },
    inputSend: {
        width: 250
    },
    ImageCmt: {
        marginStart: 10
    },
    ViewSendCmt: {
        backgroundColor: '#F4F4F4',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        height: '100%'
    }
})