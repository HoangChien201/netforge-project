import { ActivityIndicator, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { GetTimeComment } from '../../format/FormatDate'
import { useMyContext } from '../navigation/UserContext'
import PostDetail from '../post-detail-screen/Body';
import { useNavigation } from '@react-navigation/native'
import { COLOR } from '../../constant/color';
type Comment = {
    dataComment: any
}
const CommentHistories: React.FC<Comment> = ({ dataComment }) => {
    const [sortedData, setSortedData] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();
    const { user } = useMyContext();
    const [loading, setLoading] = useState(true);
    if (!dataComment || dataComment.length === 0) {
        <View>
            <Text style={styles.textEmpty}>Bạn chưa có hoạt động nào</Text>
        </View>
    }
    useEffect(() => {
        const sorted = [...dataComment].sort((a: { create_at: any | Date; }, b: { create_at: any | Date; }) => new Date(b.create_at) - new Date(a.create_at));
        setSortedData(sorted);
        //console.log(sorted);
    }, [dataComment]);
    useEffect(() => {
        // Set a timeout to simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        // Clean up the timer
        return () => clearTimeout(timer);
    }, []);

    const showPostModal = () => {
        setShowModal(true);
        console.log('click');

    };
    function navigationScreen(screen: string) {
        navigation.navigate(`${screen}`)
    };

    return (
        <View style={styles.container}>
            {/* {!sortedData ? (
                <View>
                    <Text style={styles.textEmpty}>Bạn chưa có hoạt động nào</Text>
                </View>
            ) : (

                <View style={styles.listContainer}>
                    {sortedData.map((item: { content: any; create_at: any; }, index: { toString: () => React.Key | null | undefined; }) => (
                        <View key={index.toString()} style={styles.itemContainer}>
                            <View style={styles.infor}>
                                {user.avatar ?
                                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                                    :
                                    <View style={[styles.avatar, { backgroundColor: 'gray' }]} ></View>
                                }
                                <Icon name='aliwangwang' size={18} color={'#0099FF'} style={styles.icon} />
                            </View>
                            <View style={styles.contain}>
                                <Text style={styles.text1} >Bạn đã bình luận về </Text>
                                <Pressable>
                                    <Text style={styles.text} onPress={navigationScreen.bind(this, 'PostsDetail')}>bài viết</Text>
                                </Pressable>
                                <Text style={styles.text1}> của </Text>
                                <Text style={styles.text1}> {item.posts.creater.fullname}</Text>
                                <Text style={styles.text1}>: " {item.content} "</Text>
                            </View>
                            <View style={{ width: 60, height: '100%', alignItems: 'flex-end' }}>
                                <Text style={{ color: 'gray', fontSize: 12, marginTop: 30 }}>{GetTimeComment(item.create_at)} trước</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )} */}
            {loading ? (
                <ActivityIndicator size="large" color={COLOR.PrimaryColor} />
            )

                :
                <View style={styles.listContainer}>
                    {sortedData.map((item: { content: any; create_at: any; }, index: { toString: () => React.Key | null | undefined; }) => (
                        <View key={index.toString()} style={styles.itemContainer}>
                            <View style={styles.infor}>
                                {user.avatar ?
                                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                                    :
                                    <View style={[styles.avatar, { backgroundColor: 'gray' }]} ></View>
                                }
                                <Icon name='aliwangwang' size={18} color={'#0099FF'} style={styles.icon} />
                            </View>
                            <View style={styles.contain}>
                                <Text style={styles.text1} >Bạn đã bình luận về </Text>
                                <Pressable>
                                    <Text style={styles.text} onPress={navigationScreen.bind(this, 'PostsDetail')}>bài viết</Text>
                                </Pressable>
                                <Text style={styles.text1}> của </Text>
                                <Text style={styles.text1}> {item.posts.creater.fullname}</Text>
                                <Text style={styles.text1}>: " {item.content} "</Text>
                            </View>
                            <View style={{ width: 60, height: '100%', alignItems: 'flex-end' }}>
                                <Text style={{ color: 'gray', fontSize: 12, marginTop: 30 }}>{GetTimeComment(item.create_at)} trước</Text>
                            </View>
                        </View>
                    ))}
                </View>
            }
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
        flexWrap: 'wrap'

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
    },
});
