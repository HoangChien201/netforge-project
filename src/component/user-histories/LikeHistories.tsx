import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useMyContext } from '../navigation/UserContext';
import { GetTimeComment } from '../../format/FormatDate';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Modal/Loading'
import { COLOR } from '../../constant/color';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
type Like = {
    dataLike: any,
    load:any
}
const LikeHistories: React.FC<Like> = ({ dataLike, load }) => {
    const navigation = useNavigation();
    const [totalData, setTotalData] = useState([]);
    const user = useSelector((state : RootState)=>state.user.value)
    const [sortedData, setSortedData] = useState<any[]>([]);
    const [dataLikeP, setDataLikeP] = useState<any[]>([]);
    const [dataLikeC, setDataLikeC] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        renderItem;
    }, [dataLike]);
    const noData =()=>{
    if (!load) {
        return (
            (dataLike.map(renderItem))
        )
    } else {
        return (
            <View style={styles.containerEmpty}>
                <Text style={styles.textEmpty}>Hãy tương tác với mọi người để lưu giữ kỉ niệm!</Text>
            </View>
        )
    }
    }
    // useEffect(() => {
    //     // Set a timeout to simulate loading
    //     const timer = setTimeout(() => {
    //         setLoading(false);
    //     }, 1000);

    //     // Clean up the timer
    //     return () => clearTimeout(timer);
    // }, []);
    const getReactionDetails = (reaction: any) => {
        switch (reaction) {
            case 1:
                return { text: "Thích ", iconName: "like1", iconColor: '#0000FF', linkImage: require("../../media/Dicons/thumb-up.png") };
            case 2:
                return { text: "Ha ha ", iconName: "heart", iconColor: '#FF0000', linkImage: require("../../media/Dicons/happy-face.png") };
            case 3:
                return { text: "Thương thương ", iconName: "meho", iconColor: '#FFFF00', linkImage: require("../../media/Dicons/smile.png") };
            case 4:
                return { text: "Yêu thích ", iconName: "dislike1", iconColor: '#FF7F00', linkImage: require("../../media/Dicons/heartF.png") };
            case 5:
                return { text: "Tức giận ", iconName: "question", iconColor: 'blue', linkImage: require("../../media/Dicons/wow.png") };
            default:
                return { text: "Tức giận ", iconName: "question", iconColor: 'blue', linkImage: require("../../media/Dicons/angry.png") };
        }
    };

    const renderItem = (item: { reaction: any, posts: { id: number }, creater: { fullname: string } }, index: { toString: () => React.Key | null | undefined; }) => {
        const { text, iconName, iconColor, linkImage } = getReactionDetails(item.reaction);
        const postId = item.posts ? item.posts.id : item.id;

        return (
            <TouchableOpacity style={styles.itemContainer} key={index.toString()}
                onPress={() => navigation.navigate('CommentsScreen', { postId })}
            >
                <View style={styles.infor}>
                    <Image source={{ uri: user?.avatar }} style={styles.avatar} />
                    <Image source={linkImage} style={styles.icon} />
                </View>
                <View style={styles.contain}>
                    {item.posts ? (
                        <Text numberOfLines={2} ellipsizeMode="tail" >
                            <Text style={styles.text}>Bạn đã bày tỏ </Text>
                            <Text style={styles.text1}>{text}</Text>
                            <Text style={styles.text}>bài viết</Text>
                            <Text style={styles.text}> của </Text>
                            <Text style={styles.text1}>{item.posts?.creater.fullname}</Text>
                        </Text>
                    ) : (
                        <Text numberOfLines={2} ellipsizeMode="tail" >
                            <Text style={styles.text}>Bạn đã </Text>
                            <Text style={styles.text1}>{text}</Text>
                            <Text style={styles.text}>bình luận</Text>
                            <Text style={styles.text}> của </Text>
                            <Text style={styles.text1}>{item?.user.fullname}</Text>
                        </Text>
                    )}
                </View>
                <View style={{ width: 60, height: '100%', alignItems: 'flex-end' }}>
                    <Text style={{ color: 'gray', fontSize: 12, marginTop: 30 }}>{GetTimeComment(item.create_at)} trước</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {dataLike.length>0 ?
            noData()
        :
            null
        }            
        </View >
    );
};

export default LikeHistories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginBottom: 80,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
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
        height: 18,
        width: 18,
    },
    contain: {
        flex: 1,
    },
    text: {
        fontSize: 14,
        color: 'black',
    },
    text1: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    textEmpty: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
    },
    containerEmpty: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
});
