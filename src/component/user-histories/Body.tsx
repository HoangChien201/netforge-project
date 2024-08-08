import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CommentHistories from './CommentHistories'
import LikeHistories from './LikeHistories'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLOR } from '../../constant/color'
import { getUserHistories } from '../../http/QuyetHTTP';
import { useNavigation } from '@react-navigation/native'
import Swiper from 'react-native-swiper';
import Loading from '../Modal/Loading'
import SkelotonHistory from './SkelontonHistory'
const { width } = Dimensions.get('window');

type BodyH = {}

const Body: React.FC<BodyH> = ({ }) => {
    const [view, setView] = useState(true);
    const swiperRef = useRef(null);
    const [dataLike, setDataLike] = useState<any>({});
    const [dataComment, setDataComment] = useState<any[]>([]);
    const navigation = useNavigation();
    const [load, setLoad] = useState(false);
    const [loadWheel, setLoadWheel] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    function navigationScreen(screen: string) {
        navigation.navigate(`${screen}`)
    };

    const getData = async () => {
        setLoad(true)
        try {
            const result = await getUserHistories();
            const likePosts = result.likePosts || [];
            const likeComments = result.likeComments || [];
            setDataLike([...likeComments, ...likePosts]);
            setDataComment(result.comments);
            setLoad(false);
            setRefreshing(false)
            setLoadWheel(false)
        } catch (error) {
            console.log('Lỗi lấy useHistories: ' + error);
            setLoad(false);
            setRefreshing(false)
            setLoadWheel(false)
        }
    };

    useEffect(() => {
        setLoadWheel(true)
        getData();
    }, []);
    const loadData = useCallback(() => {
        setRefreshing(true);
        getData();
    }, []);
    const handleIndexChanged = (index) => {
        setCurrentIndex(index);
    };

    const handleButtonPress = (index) => {
        if (swiperRef.current) {
            swiperRef.current.scrollBy(index - currentIndex, true);
        }
    };

    const memoizedLikeHistories = useMemo(() => {
        return <LikeHistories dataLike={dataLike} load={load} />;
    }, [dataLike, load]);

    const memoizedCommentHistories = useMemo(() => {
        return <CommentHistories dataComment={dataComment} load={load} />;
    }, [dataComment, load]);

    return (
        <View style={styles.container}>
            <Loading isLoading={loadWheel}/>
            <View style={styles.header}>
                <View style={styles.typeHis}>
                    <TouchableOpacity style={[styles.likeButton, currentIndex === 0 && styles.activeButton]} onPress={() => { handleButtonPress(0) }}>
                        <Icon name='like1' size={18} color={COLOR.PrimaryColor} />
                        <Text style={styles.textLike}> Cảm xúc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.likeButton, currentIndex === 1 && styles.activeButton]} onPress={() => { handleButtonPress(1) }}>
                        <Icon name='aliwangwang' size={18} color={COLOR.PrimaryColor} />
                        <Text style={styles.textLike} > Bình luận</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.container]}>
                {dataLike? 
                <Swiper ref={swiperRef} loop={false} showsButtons={false} style={{ marginBottom: 50 }}
                    onIndexChanged={handleIndexChanged}
                >
                    <View>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Lịch sử thích</Text>
                        </View>
                        <ScrollView style={styles.page}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={loadData} />
                            }
                        >
                            {memoizedLikeHistories}
                        </ScrollView>
                    </View>

                    <View>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Lịch sử bình luận</Text>
                        </View>
                        <ScrollView style={styles.page}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={loadData} />
                            }
                        >
                            {memoizedCommentHistories}
                        </ScrollView>
                    </View>
                </Swiper>
                : <SkelotonHistory/>}
            </View>
        </View>
    )
}

export default Body

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        zIndex: 999,
        height: '100%',
        paddingBottom: 30
    },
    header: {},
    typeHis: {
        flexDirection: 'row',
        height: 50,
        marginTop: 8,
        marginStart: 5
    },
    likeButton: {
        height: 32,
        width: 96,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: COLOR.primary300,
        flexDirection: 'row',
        margin:5
    },
    commentButton: {
        height: 32,
        width: 106,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: COLOR.primary300,
        marginStart: 8,
        flexDirection: 'row'
    },
    activeButton: {
        backgroundColor: COLOR.primary150
    },
    textLike: {},
    back: {
        flexDirection: 'row',
        backgroundColor: COLOR.PrimaryColor,
        height: 50,
        alignItems: 'center',
    },
    textHead: {
        color: COLOR.primary350,
        fontSize: 20,
        marginStart: 5,
        fontWeight: '500'
    },
    page: {
        width: (width),
        height: '100%',
        marginBottom: 100
    },
    headerText: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500',
        marginStart: 10
    },
});
