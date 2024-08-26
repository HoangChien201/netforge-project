import React, { useState, useRef, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Pressable, Keyboard } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';

import InputCmt from '../component/formComments/InputCmt';
import CommentItem from '../component/formComments/CommentItem';
import { getComments, getPostById } from '../http/TuongHttp';
import { navigationType } from '../component/stack/UserStack'
import ItemPost from '../component/listpost/ItemPost';
import Modal_GetLikePosts from '../component/formComments/Modal_GetLikePosts';
import { ProfileRootStackEnum } from '../component/stack/ProfileRootStackParams';
import BODYMODAL from '../component/edit-post-modal/Body'
import DELETEPOST from '../component/listpost/DeletePostModal'
import { RootState } from '../component/store/store';
import SkelotonComment from '../component/formComments/SkelotonComment';
import { socket } from '../http/SocketHandle';
const CommentsScreen = () => {
    const navigation = useNavigation<navigationType>()
    const user = useSelector((state: RootState) => state.user.value)

    const [modalGetLikePostVisible, setModalGetLikePostVisible] = useState(false);
    const [commentUserId, setCommentUserId] = useState(null);
    const [text, setText] = useState(null);
    const [post, setPosts] = useState(null);
    const [replyTo, setReplyTo] = useState(null);
    const [comment, setComments] = useState(null);
    const [commentCount, setCommentCount] = useState(0);
    const [loadDatda, setLoadData] = useState(false);
    const [like, setLike] = useState([])
    const scrollViewRef = useRef();
    const route = useRoute();
    const { postId } = route.params;
    const [selectedId, setSelectedId] = useState(null);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [loadAfterUpdate, setLoadAfterUpdate] = useState(false);
    const [creator, setCreator] = useState();
    const [moveToHome, setMoveToHome] = useState(false)
    const handleKeyboardShow = useCallback(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none',
            }
        });
    }, []);
    const handleKeyboardHide = useCallback(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none',
            }
        });
    }, []);
    useFocusEffect(
        useCallback(() => {
            // Lắng nghe sự kiện hiển thị và ẩn bàn phím
            const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardHide);
            const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
            return () => {
                keyboardDidShowListener.remove();
                keyboardDidHideListener.remove();
            };
        }, [handleKeyboardShow, handleKeyboardHide]),
    );
    // lấy bài viết chi tiết
    const fetchPosts = async () => {
        try {
            //goo
            const response: any = await getPostById(postId);
            setPosts(response)
            setCreator(response.creater.id)
            fetchComments();
            setLoadData(false)
        } catch (error) {
            console.log('lỗi ở fetchPosts:', error);
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
            console.log('lỗi ở fetchComments:', error);
        }
    };
    // Hàm xử lý khi người dùng chọn trả lời một bình luận  
    const handleReply = (parent) => {
        setReplyTo(parent); // Thiết lập bình luận cha để trả lời
    };

    // // hàm render comments
    useEffect(() => {
        fetchPosts();
        socket.on(`notification-${user?.id}`,()=>{
            fetchPosts()
        })

        return ()=>{
            socket.off(`notification-${user?.id}`)
        }
    }, []);
    useEffect(() => {
        if (moveToHome == false) {
            fetchPosts();
            const timer = setTimeout(() => {
                if (!loadDatda) {
                    setLoadData(true);
                }
            }, 3000);

            return () => clearTimeout(timer);
        }


    }, [loadAfterUpdate]);
    useEffect(() => {
        if (moveToHome === true) {
            navigation.navigate('HomeScreen');
            setMoveToHome(false);
        }
    }, [moveToHome])
    //tat bottomtab
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
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


    const loggedInUserId = user?.id;
    const handleToProfile = (userId) => {
        // //setSelectedUserId(userId);
        if (userId === loggedInUserId) {
            //setIsModalVisible(false);
            navigation.navigate(ProfileRootStackEnum.ProfileScreen);
        } else {
            //setIsModalVisible(true);
            navigation.navigate(ProfileRootStackEnum.FriendProfile, { userId });
        }
    };


    const isFinishFetchAPI = comment && post


    return (

        <Pressable style={[styles.container]}>
            <BODYMODAL
                showModalEdit={showModalEdit}
                setShowModalEdit={setShowModalEdit}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                setLoadAfterUpdate={setLoadAfterUpdate}

            />
            <DELETEPOST
                showDelete={showDelete}
                setShowDelete={setShowDelete}
                postId={selectedId}
                setSelectedId={setSelectedId}
                setMoveToHome={setMoveToHome}
                setLoadAfterUpdate={setLoadAfterUpdate}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative', height: 50, backgroundColor: '#fff' }}>
                <Pressable onPress={() => { navigation.goBack() }} style={{ position: 'absolute', left: 15 }}>
                    <Icon name='arrow-back' size={28} color={'#000'} />
                </Pressable>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', color: '#000' }}>Bình Luận</Text>
                </View>
            </View>

            {
                !isFinishFetchAPI ?
                    <SkelotonComment />
                    :
                    <View>
                        <View style={{ height: "91%", backgroundColor: 'white' }}>

                            <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
                                {
                                    post && (
                                        <View style={{ margin: 0 }}>
                                            <ItemPost key={post.id} data={post} setShowModalEdit={setShowModalEdit} setSelectedId={setSelectedId}
                                                showDelete={showDelete} setShowDelete={setShowDelete} />
                                        </View>
                                    )
                                }
                                {
                                    post.like_count && (
                                        <TouchableOpacity onPress={() => setModalGetLikePostVisible(true)}>

                                            <View style={styles.ViewPostLike}>
                                                <Image style={{ width: 18, height: 18 }} source={require('../media/Dicons/thumb-up.png')} />
                                                <Text style={{ marginStart: 4, fontSize: 16, fontWeight: '500', color: '#000' }}>{post.like_count}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                                {comment.length < 1 ? (
                                    <View style={styles.ViewNoComment}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                            <Image style={{ width: 150, height: 150, marginBottom: 20 }} source={require('../media/icon_tuong/chat.png')} />
                                            <Text style={styles.textNoComment1}>Chưa có bình luận nào</Text>
                                            <Text style={styles.textNoComment2}>Hãy là người đầu tiên bình luận.</Text>
                                        </View>
                                    </View>
                                ) : (
                                    comment.map(comment => (
                                        <CommentItem key={comment.id} comment={comment} onReply={handleReply} render={fetchComments} parent={replyTo} setText={setText} setUserId={setCommentUserId} postId={postId} userPostId={post.creater} />
                                    ))
                                )
                                }
                            </ScrollView>
                        </View>

                        {
                            modalGetLikePostVisible ? (
                                <Modal_GetLikePosts
                                    isVisible={modalGetLikePostVisible}
                                    onClose={() => setModalGetLikePostVisible(false)}
                                    postId={postId}
                                    like={like}
                                    setLike={setLike} />
                            ) : (
                                <InputCmt
                                    userPostId={post.creater}
                                    comment={commentUserId}
                                    setText={setText}
                                    text={text}
                                    parent={replyTo} // Truyền ID bình luận cha khi trả lời
                                    fetchComments={fetchComments}
                                    onMediaSelected={handleMediaSelected} // Xử lý khi người dùng chọn hình ảnh hoặc video
                                    postId={postId}
                                    setParent={setReplyTo}
                                    creator={creator}
                                />
                            )
                        }
                    </View>
            }

        </Pressable>
    )
}

export default CommentsScreen

const styles = StyleSheet.create({

    spinnerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
    },
    ViewPostLike: {
        alignItems: 'center',
        flexDirection: 'row',
        marginStart: 16,
        bottom: 18
    },
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
        height: 300,
        marginBottom:10
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
        height: 28,
        marginRight: 10
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