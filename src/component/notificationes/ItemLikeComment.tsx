import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLOR } from '../../constant/color'
import { DateOfTimePost } from '../../format/DateOfTimePost'
import { useNavigation } from '@react-navigation/native';
import { navigationRef } from '../navigation/NavigationRef'
import { CommentsScreenNavigationProp } from '../stack/NetworkRootStackParams'


type Item = {
    notification: any
}
const ItemLikeComment: React.FC<Item> = ({ notification }) => {
    const navigation: CommentsScreenNavigationProp = useNavigation();
    function navigationScreen(screen: string) {
        navigation.navigate(`${screen}`)
    }
    const reaction = notification.data[0].reaction.type
    const displayDate = DateOfTimePost(notification.data[0].timestamp);
    const postId = notification?.data[0].postId || notification?.data[0].postId1

    const getReactionDetails = (reaction: any) => {
        switch (reaction) {
            case 1:
                return { text: "thích ", iconName: "like1", iconColor: '#0000FF', linkImage: require("../../media/Dicons/thumb-up.png") };
            case 2:
                return { text: "ha ha ", iconName: "heart", iconColor: '#FF0000', linkImage: require("../../media/Dicons/happy-face.png") };
            case 3:
                return { text: "thương thương ", iconName: "meho", iconColor: '#FFFF00', linkImage: require("../../media/Dicons/smile.png") };
            case 4:
                return { text: "yêu thích ", iconName: "dislike1", iconColor: '#FF7F00', linkImage: require("../../media/Dicons/heartF.png") };
            case 5:
                return { text: "tức giận ", iconName: "question", iconColor: 'blue', linkImage: require("../../media/Dicons/wow.png") };
            default:
                return { text: "Tức giận ", iconName: "question", iconColor: 'blue', linkImage: require("../../media/Dicons/angry.png") };
        }
    };
    const { text, iconName, iconColor, linkImage } = getReactionDetails(reaction);
    return (
        <TouchableOpacity style={styles.container} key={notification.idv4.toString()}
            onPress={() => navigation.navigate('CommentsScreen', { postId })}
        //onPress={log}
        >
            <View style={styles.iconFriend} >
                <Image style={styles.avatar} source={{ uri: notification.data[0].userInfo.avatar }} />
                {notification.data[1] ?
                    <Image style={styles.avatar1} source={{ uri: notification.data[1]?.userInfo.avatar }} />
                    :
                    null
                }
                {notification.data[2] ?
                    <Image style={styles.avatar2} source={{ uri: notification.data[2]?.userInfo.avatar }} />
                    :
                    null
                }
                {notification.data[3] ?
                    <Image style={styles.avatar3} source={{ uri: notification.data[3]?.userInfo.avatar }} />
                    :
                    null
                }
                <Image source={linkImage} style={styles.iconHeart} />
            </View>
            <View style={styles.text}>
                <Text numberOfLines={2} >
                    <Text style={styles.textUser_Post} numberOfLines={2} >{notification.data[0].userInfo.fullname}</Text>
                    {notification.data[1] ?
                        <Text style={styles.textUser_Post}>, {notification.data[1].userInfo.fullname}</Text>
                        :
                        null
                    }
                    {notification.data[2] ?
                        <Text style={styles.textUser_Post}>, ... </Text>
                        :
                        null
                    }
                    <Text style={styles.textUser_Post}> đã bày tỏ cảm xúc bình luận </Text>
                    <Text style={styles.text1} numberOfLines={1} ellipsizeMode="tail"  >" {notification.data[0].body} "</Text>
                </Text>

            </View>
            <View style={styles.viewTime}>
                <Text style={styles.textTime}>{displayDate}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default ItemLikeComment

const styles = StyleSheet.create({
    container: {
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginTop: 5
    },
    iconFriend: {
        // height: 44,
        // width: 44,
        // borderWidth: 1,
        // borderColor: COLOR.PrimaryColor1,
        // borderRadius: 44,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 6,
        flex: 0.8
    },
    avatar: {
        height: 44,
        width: 44,
        borderRadius: 44,
        borderWidth: 1,
        borderColor: COLOR.PrimaryColor1,
        zIndex: 40
    },
    avatar1: {
        height: 22,
        width: 22,
        borderRadius: 44,
        borderWidth: 1,
        borderColor: COLOR.PrimaryColor1,
        position: 'absolute',
        start: 0, bottom: -2,
        zIndex: 50
    },
    avatar2: {
        height: 16,
        width: 16,
        borderRadius: 44,
        borderWidth: 1,
        borderColor: COLOR.PrimaryColor1,
        position: 'absolute',
        start: 10, bottom: -2,
        zIndex: 51
    },
    avatar3: {
        height: 14,
        width: 14,
        borderRadius: 44,
        borderWidth: 1,
        borderColor: COLOR.PrimaryColor1,
        position: 'absolute',
        start: 20, bottom: -2,
        zIndex: 52
    },
    iconHeart: {
        position: 'absolute',
        end: -6,
        bottom: -4,
        height: 20,
        width: 20,
        zIndex: 55
    },
    text: {
        marginStart: 10,
        flex: 5,
        flexDirection: 'column',
        overflow: 'hidden',
    },
    textUser_Post: {
        fontSize: 15,
        fontWeight: '500',
        fontStyle: "normal",
        color: 'black',

    },
    text1: {
        fontSize: 15,
        fontWeight: '500',
        fontStyle: "normal",
        color: COLOR.PrimaryColor,
        marginEnd: 5
    },

    textTime: {
        fontSize: 9,
        fontWeight: '300',
        fontStyle: "normal",
        color: 'black',
        position: 'absolute',
        end: 5,
        bottom: 8
    },
    headerText: {
        fontSize: 18,
        fontWeight: '400',
        fontStyle: "normal",
        color: 'black',
        marginStart: 5
    },
    viewTime: {
        flex: 0.9,
        height: '100%'
    }
})