import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, FlatList, Modal } from 'react-native'
import React, { useMemo, useState, useRef, useEffect } from 'react'
import UserPost from '../component/formComments/UserPost';
import InputCmt from '../component/formComments/InputCmt';
import CommentItem from '../component/formComments/CommentItem';
import { getComments, addComments } from '../http/TuongHttp';
import { useNavigation } from '@react-navigation/native'
import { navigationType } from '../component/stack/UserStack'
import Video from 'react-native-video';
import { DateOfTimePost } from '../format/DateOfTimePost';


const CommentsScreen = () => {
    // const navigation = useNavigation<navigationType>()
    const [replyTo, setReplyTo] = useState(null);
    const [comment, setComments] = useState([]);
    const [imagePath, setImagePath] = useState(null);
    const [commentCount, setCommentCount] = useState(0);
    const scrollViewRef = useRef();

// hàm lấy danh sách comments
    const fetchComments = async () => {
        try {
            const response = await getComments();
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
    // hàm render comments
    useEffect(() => {
        fetchComments();
    }, []);

    const handleMediaSelected = (media) => {
        setImagePath(media);
    };

    const RenderItem = ({ item }) => {
        const { id, content, image, create_at, user } = item
        // console.log('hình nè', image);
        const isVideo = image && image.match(/\.(mp4|mov)$/i); //kiểm tra nếu nó là video hay không

        return (
            <View style={styles.itemRecentContai}>
                <View style={styles.itemRecent}>
                    <Image source={{uri:user.avatar}} style={styles.imageItem} />
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.InfoCmt}>
                            <View style={styles.boderView}>
                                <View style={{ margin: 10 }}>
                                    <Text style={styles.nameItem}>{user.fullname}</Text>
                                    <Text style={styles.textCmt}>{content}</Text>
                                   <TouchableOpacity >
                                   {image && !isVideo ? (
                                        <Image
                                            source={{ uri: image }}
                                            resizeMode='cover'
                                            style={{ width: 150, height: 200, borderRadius: 10 }}
                                        />
                                        
                                    ) : null}
                                    </TouchableOpacity>
                                    
                                    {image && isVideo ? (
                                        <Video
                                            source={{ uri: image }}
                                            style={{ width: 150, height: 200, borderRadius: 10, overflow:'hidden' }}
                                            resizeMode="cover"
                                            controls={true}
                                        
                                        />
                                    ) : null}
                                  
                                </View>
                            </View>
                            <Image source={require('../media/icon_tuong/heart.png')} style={{ width: 20, height: 20, marginTop: 5 }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, marginStart: 12 }}>
                            <Text style={{ fontWeight: '500' }}>{DateOfTimePost(create_at)} giờ</Text>
                          <TouchableOpacity style={{ marginStart: 5 }}  onPress={() => handleReply(item.id)}>
                                <Text style={{ fontWeight: '900' }}>Reply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    useEffect(() => {
        if (commentCount > 0) {
            // Nếu có bình luận mới, scrollView sẽ cuộn xuống bình luận mới
            scrollViewRef.current.scrollToEnd({ animated: false });
        }
    }, [commentCount]);
    return (
        <View style={styles.container}>
            <UserPost />
            <View style={{ height: "85%"}}>

                <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} >
                     {   comment.map(comment => (
                            <CommentItem key={comment.id} comment={comment} onReply={handleReply} render = {fetchComments}/>
                        ))
                    }
                </ScrollView>
            </View>

            <InputCmt
                fetchComments={fetchComments}
                parent={replyTo} // Truyền ID bình luận cha khi trả lời
                onMediaSelected={handleMediaSelected} // Xử lý khi người dùng chọn hình ảnh hoặc video
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
    itemRecentContai:{
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