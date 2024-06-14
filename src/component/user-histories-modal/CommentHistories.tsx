import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { GetTimeComment } from '../../format/FormatDate'
import { useMyContext } from '../navigation/UserContext'
const CommentHistories = ({ dataComment }) => {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.infor}>
                    <Image source={require('../../media/quyet_icon/smile_p.png')} style={styles.avatar} />
                    <Icon name='aliwangwang' size={18} color={'blue'} style={styles.icon} />
                </View>
                <View style={styles.contain}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text>
                            <Text>Bạn đã bình luận về </Text>
                            <Text style={styles.text}>bài viết</Text>
                        </Text>
                        <Text>{item.content}</Text>
                    </View>
                </View>
            </View>
        );
    };
    const { user, setUser } = useMyContext();
    return (
        <View style={styles.container}>
            {dataComment.length > 0 ? (
                <View style={styles.listContainer}>
                    {dataComment.map((item, index) => (
                        <View key={index.toString()} style={styles.itemContainer}>
                            <View style={styles.infor}>
                                {user.avatar ?
                                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                                    :
                                    <View style={[styles.avatar,{backgroundColor:'gray'}]} ></View>
                                }
                                <Icon name='aliwangwang' size={18} color={'blue'} style={styles.icon} />
                            </View>
                            <View style={styles.contain}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text>
                                        <Text>Bạn đã bình luận về </Text>
                                        <Text style={styles.text}>bài viết</Text>
                                    </Text>
                                    <Text>" {item.content} "</Text>
                                </View>
                            </View>
                            <View style={{ width: 60, height: '100%', alignItems: 'flex-end' }}>
                                <Text style={{ color: 'gray', fontSize: 12, marginTop: 30 }}>{GetTimeComment(item.create_at)} trước</Text>
                            </View>
                        </View>
                    ))}

                </View>
            ) : (
                <View>
                    <Text style={styles.textEmpty}>Bạn chưa có hoạt động nào</Text>
                </View>
            )}
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
        right: 0,
        bottom: 0,
    },
    contain: {
        flex: 1,
    },
    listContainer: {
        paddingBottom: 40,
        height: '100%'
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    textEmpty: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
    },
});
