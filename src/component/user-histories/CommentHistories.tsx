import { ActivityIndicator, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { GetTimeComment } from '../../format/FormatDate'
import { useMyContext } from '../navigation/UserContext'
import { useNavigation } from '@react-navigation/native'
import { COLOR } from '../../constant/color';
type Comment = {
    dataComment: any,
    load:any
}
const CommentHistories: React.FC<Comment> = ({ dataComment,load }) => {
    // const [sortedData, setSortedData] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();
    const { user } = useMyContext();
    const [loading, setLoading] = useState(true);
    if (!dataComment || dataComment.length == 0 && load == true) {
        return (
            <View style={styles.containerEmpty}>
                <Text style={styles.textEmpty}>Hãy tương tác với mọi người để lưu giữ kỉ niệm!</Text>
            </View>
        )
    }
    const showPostModal = () => {
        setShowModal(true);
        console.log('click');

    };
    function navigationScreen(screen: string) {
        navigation.navigate(`${screen}`)
    };

    return (
        <View style={styles.container}>
                <View style={styles.listContainer}>
                    {dataComment.map((item: { content: any; create_at: any; posts: { id: number; creater: { fullname: string } } }, index: { toString: () => React.Key | null | undefined; }) => {
                        const postId = item.posts.id;
                        return (
                            <TouchableOpacity
                                key={index.toString()}
                                style={styles.itemContainer}
                                onPress={() => navigation.navigate('CommentsScreen', { postId })}
                            >
                                <View style={styles.infor}>
                                    {user.avatar ?
                                        <Image source={{ uri: user.avatar }} style={styles.avatar} />
                                        :
                                        <View style={[styles.avatar, { backgroundColor: 'gray' }]} ></View>
                                    }
                                    <Icon name='aliwangwang' size={18} color={'#0099FF'} style={styles.icon} />
                                </View>
                                <Text style={styles.contain} numberOfLines={2} ellipsizeMode="tail" >
                                    <Text style={styles.text1}>Bạn đã bình luận về </Text>
                                    <Text style={styles.text}>bài viết</Text>
                                    <Text style={styles.text1}> của </Text>
                                    <Text style={styles.text1}>{item.posts.creater.fullname}</Text>
                                    <Text style={styles.text1}>" {item.content} "</Text>
                                </Text>
                                <View style={{ width: 60, height: '100%', alignItems: 'flex-end' }}>
                                    <Text style={{ color: 'gray', fontSize: 12, marginTop: 30 }}>{GetTimeComment(item.create_at)} trước</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
        </View>
    );
};

export default CommentHistories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        height: '100%',
        marginBottom: 40
    },
    header: {
        marginBottom: 10,
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    infor: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    icon: {
        position: 'absolute',
        right: -4,
        bottom: -3,
    },
    contain: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-around'

    },
    listContainer: {
        paddingBottom: 40,
        height: '100%'
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold'
    },
    textEmpty: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
    },
    text1: {
        fontSize: 16,
        color: 'black',
        overflow: 'hidden'
    },
    containerEmpty: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
});
