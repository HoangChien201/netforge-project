import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import CommentHistories from './CommentHistories'
import LikeHistories from './LikeHistories'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLOR } from '../../constant/color'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

const { width } = Dimensions.get('window');

const Body = () => {
    const [view, setView] = useState(true);
    const translateX = useSharedValue(0);

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

    return (
        <Modal style={styles.container} visible={true}>
            <View style={styles.header}>
                <View style={styles.back}>
                    <Icon name='left' size={24} color={'white'} />
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
                <View style={styles.page}>
                    <LikeHistories />
                </View>
                <View style={styles.page}>
                    <CommentHistories />
                </View>
            </Animated.View>
        </Modal>
    )
}

export default Body

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'row', // Add this line to enable horizontal scrolling
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
        width: width, // Each page should take up the full width of the screen
    },
});
