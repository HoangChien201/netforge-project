import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLOR } from '../../constant/color'
import { DateOfTimePost } from '../../format/DateOfTimePost'
import PushNotification from 'react-native-push-notification';
import { useNavigation } from '@react-navigation/native';


type Item = {
    notification: any
}
const ItemLike: React.FC<Item> = ({ notification }) => {
    const navigation = useNavigation();
    function navigationScreen(screen: string) {
        navigation.navigate(`${screen}`)
    }
    const reaction = notification.reaction.type
    const displayDate = DateOfTimePost(notification.timestamp);
    const postId = notification.postId
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
        <TouchableOpacity style={styles.container} key={notification.id.toString()}
        onPress={()=> navigation.navigate('CommentsScreen',{postId})}

        >
            <View style={styles.iconFriend} >
                <Image style={styles.avatar} source={{ uri: notification.userInfo.avatar }} />
                <Image source={linkImage} style={styles.iconHeart} />
            </View>
            <View style={styles.text}>
                <Text style={styles.textUser_Post}>{notification.title} </Text>
                <Text>{notification.body}</Text>
            </View>
            <View style={styles.viewTime}>
                <Text style={styles.textTime}>{displayDate}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default ItemLike

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
        flex: 1
    },
    avatar: {
        height: 44,
        width: 44,
        borderRadius: 44,
        borderWidth: 1,
        borderColor: COLOR.PrimaryColor1,
    },
    iconHeart: {
        position: 'absolute',
        end: -2,
        bottom: -2,
        height: 20,
        width: 20
    },
    text: {
        marginStart: 10,
        flex: 5,
        overflow: 'hidden'
    },
    textUser_Post: {
        fontSize: 16,
        fontWeight: '600',
        fontStyle: "normal",
        color: 'black',

    },
    text1: {
        fontSize: 16,
        fontWeight: '400',
        fontStyle: "normal",
        color: 'black'
    },
    textTime: {
        fontSize: 11,
        fontWeight: '300',
        fontStyle: "normal",
        color: 'black',
        position: 'absolute',
        top: 2
    },
    headerText: {
        fontSize: 18,
        fontWeight: '400',
        fontStyle: "normal",
        color: 'black',
        marginStart: 5
    },
    viewTime: {
        flex: 1.5
    }
})