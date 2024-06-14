import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommentHistories from './CommentHistories'
import LikeHistories from './LikeHistories'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLOR } from '../../constant/color'
import { getUserHistories } from '../../http/QuyetHTTP'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

const { width } = Dimensions.get('window');

const Body = ({ showModalHistories, setShowModalHistories }) => {
    const [view, setView] = useState(true);
    const translateX = useSharedValue(0);
    const [data, setData] = useState([]);
    const [dataLikeP, setDataLikeP] = useState([]);
    const [dataLikeC, setDataLikeC] = useState([]);
    const [dataComment, setDataComment] = useState([]);
    const getData = async () => {
        try {
            const result = await getUserHistories();
            setData(result);
            setDataLikeP(result.likePosts);
            setDataLikeC(result.likeComments);
            setDataComment(result.comments)
            // console.log('dataH' + JSON.stringify(result));
            // console.log('data likeP: ' + JSON.stringify(result.likePosts));
            // console.log('data likeC: ' + JSON.stringify(result.likeComments));
            // console.log('data Comment: ' + JSON.stringify(result.comments));
        } catch (error) {
            console.log('lỗi lấy useHistories: ' + error);

        }

    }
    useEffect(() => {
        getData();
    }, [])
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        };
    });

    const switchToLike = () => {
        setView(true);
        translateX.value = withTiming(0, { duration: 300 });
    };

    const switchToComment = () => {
        setView(false);
        translateX.value = withTiming(-width, { duration: 300 });
    };
    const ShowModalHistories = () => {
        setShowModalHistories(false);
    };
    return (
        <Modal style={styles.container} visible={showModalHistories}
            animationType="fade"
        >
            <View style={styles.header}>
                <View style={styles.back}>
                    <TouchableOpacity onPress={ShowModalHistories}>
                        <Icon name='left' size={24} color={'white'} />
                    </TouchableOpacity>

                    <Text style={styles.textHead}>Lịch sử hoạt động</Text>
                </View>

                <View style={styles.typeHis}>
                    <TouchableOpacity style={styles.likeButton} onPress={switchToLike}>
                        <Icon name='like1' size={18} color={COLOR.PrimaryColor} />
                        <Text style={styles.textLike}> Thích</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.commentButton} onPress={switchToComment}>
                        <Icon name='aliwangwang' size={18} color={COLOR.PrimaryColor} />
                        <Text style={styles.textLike} > Bình luận</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Animated.View style={[styles.container, animatedStyle]}>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Lịch sử thích</Text>
                    </View>
                    <ScrollView style={styles.page}>
                        <LikeHistories dataLikeP={dataLikeP} dataLikeC={dataLikeC} />
                    </ScrollView>
                </View>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Lịch sử bình luận</Text>
                    </View>
                    <ScrollView style={styles.page}>

                        <CommentHistories dataComment={dataComment} />

                    </ScrollView>
                </View>

            </Animated.View>
        </Modal>
    )
}

export default Body

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'row',
        width: '200%'
    },
    header: {},
    typeHis: {
        flexDirection: 'row',
        height: 40,
        marginTop: 8,
        marginStart: 5
    },
    likeButton: {
        height: 32,
        width: 76,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: COLOR.primary150,
        flexDirection: 'row',
    },
    commentButton: {
        height: 32,
        width: 96,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: COLOR.primary150,
        marginStart: 8,
        flexDirection: 'row'
    },
    textLike: {},
    back: {
        flexDirection: 'row',
        backgroundColor: COLOR.PrimaryColor,
        height: 40,
        alignItems: 'center',
    },
    textHead: {
        color: COLOR.primary350,
        fontSize: 18,
        marginStart: 5
    },
    page: {
        width: (width),
        height: '100%',
        // Each page should take up the full width of the screen
    },
    headerText: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500',
        marginStart:10
    },
});