import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';




const LikeHistories = ({ dataLikeC, dataLikeP }) => {
    const [totalData, setTotalData] = useState([]);

    useEffect(() => {

        setTotalData([...dataLikeC, ...dataLikeP]);

    }, []);
    const getReactionDetails = (reaction) => {
        switch (reaction) {
            case 1:
                return { text: "Thích ", iconName: "like1", iconColor: '#0000FF' };
            case 2:
                return { text: "Yêu mến ", iconName: "heart", iconColor: '#FF0000' };
            case 3:
                return { text: "Phẫn nộ ", iconName: "meho", iconColor: '#FFFF00' };
            case 4:
                return { text: "Không thích ", iconName: "dislike1", iconColor: '#FF7F00' };
            default:
                return { text: "Không rõ ", iconName: "question", iconColor: 'blue' };
        }
    };
    const renderItem = ({ item }) => {
        const { text, iconName, iconColor } = getReactionDetails(item.reaction);
        return (
            <View style={styles.itemContainer}>
                <View style={styles.infor}>
                    <Image source={require('../../media/quyet_icon/smile_p.png')} style={styles.avatar} />
                    <Icon name={iconName} size={18} color={iconColor} style={styles.icon} />
                </View>
                <View style={styles.contain}>
                    {item.type === 'post' ? (
                        <Text >
                            <Text>Bạn đã </Text>
                            <Text>{text}</Text>
                            <Text style={styles.text}>Bài viết</Text>
                            <Text> của </Text>
                            <Text style={styles.text}>{item.posts.creater.fullname}</Text>
                        </Text>
                    ) : (
                        <>
                            <Text >
                                <Text>Bạn đã </Text>
                                <Text>{text}</Text>
                                <Text style={styles.text}>bình luận</Text>
                                <Text> của </Text>
                                <Text style={styles.text}>{item.user.fullname}</Text>
                            </Text>

                        </>
                    )}
                </View>
            </View>)
    };

    return (
        <View style={styles.container}>
            {totalData.length > 0 ? <FlatList
                data={totalData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            /> :
                <View>
                    <Text style={styles.textEmpty}>Bạn chưa có hoạt động nào</Text>
                </View>
            }

        </View>
    );
};

export default LikeHistories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        marginBottom: 10
    },
    headerText: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500'
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
        paddingBottom: 20,
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    textEmpty: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400'
    },
});
