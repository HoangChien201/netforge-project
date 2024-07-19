import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommentHistories from './CommentHistories'
import LikeHistories from './LikeHistories'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLOR } from '../../constant/color'
import { getUserHistories } from '../../http/QuyetHTTP';
import { useNavigation } from '@react-navigation/native'
const { width } = Dimensions.get('window');
type BodyH = {
}
const Body: React.FC<BodyH> = ({ }) => {
    const [view, setView] = useState(true);

    const [data, setData] = useState<any>({});
    const [dataComment, setDataComment] = useState<any[]>([]);
    const navigation = useNavigation();
    function navigationScreen(screen: string) {
        navigation.navigate(`${screen}`)
    };
    const getData = async () => {
        try {
            const result = await getUserHistories();
            setData(result);
            // setDataLikeP(result.likePosts);
            // setDataLikeC(result.likeComments);
            setDataComment(result.comments)
            //console.log('body data: ' + JSON.stringify(result));
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
    const switchToLike = () => {
        setView(true);
    };
    const switchToComment = () => {
        setView(false);
    };
    return (
        <View style={styles.container}
        >
            <View style={styles.header}>
                <View style={styles.typeHis}>
                    <TouchableOpacity style={styles.likeButton} onPress={switchToLike}>
                        <Icon name='like1' size={18} color={COLOR.PrimaryColor} />
                        <Text style={styles.textLike}> Cảm xúc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.commentButton} onPress={switchToComment}>
                        <Icon name='aliwangwang' size={18} color={COLOR.PrimaryColor} />
                        <Text style={styles.textLike} > Bình luận</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.container,]}>
                {view ?
                    <View>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Lịch sử thích</Text>
                        </View>
                        <ScrollView style={styles.page}>

                            <LikeHistories data={data} />
                        </ScrollView>
                    </View>
                    :
                    <View>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Lịch sử bình luận</Text>
                        </View>
                        <ScrollView style={styles.page}>

                            <CommentHistories dataComment={dataComment} />

                        </ScrollView>
                    </View>
                }



            </View>
        </View>
    )
}

export default Body

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        zIndex: 999,
        marginBottom:100
    },
    header: {

    },
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
        backgroundColor: COLOR.primary150,
        flexDirection: 'row',
    },
    commentButton: {
        height: 32,
        width: 106,
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
        // Each page should take up the full width of the screen
    },
    headerText: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500',
        marginStart: 10
    },
});