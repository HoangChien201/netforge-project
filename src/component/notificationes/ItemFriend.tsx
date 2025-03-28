
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLOR } from '../../constant/color'
import { DateOfTimePost } from '../../format/DateOfTimePost'
import { useNavigation } from '@react-navigation/native';
import { navigationRef } from '../navigation/NavigationRef'
import { FriendScreenNavigationProp } from '../stack/NetworkRootStackParams'
type Item = {
    notification: any
}
const ItemFriend: React.FC<Item> = ({ notification }) => {
    const navigation: FriendScreenNavigationProp = useNavigation();
    const userId = Number(notification.data[0].friendId)
    function navigationScreen(screen: string) {
        navigation.navigate(`${screen}`)
    }
    const displayDate = DateOfTimePost(notification.data[0].timestamp);
    return (
        <TouchableOpacity style={styles.container} key={notification.idv4.toString()}
            onPress={() => navigation.navigate("FriendScreen")}
        >
            <View style={styles.iconFriend} >
                <Image style={styles.avatar} source={{ uri: notification.data[0].userInfo.avatar }} />
                <Icon style={styles.iconHeart} name='person-add' size={18} color={COLOR.PrimaryColor} />
            </View>
            <View style={styles.text}>
                <Text numberOfLines={2}  >

                    <Text style={styles.textUser_Post}>{notification.data[0].title} </Text>
                    <Text
                        style={styles.text1}
                        numberOfLines={1} ellipsizeMode="tail"
                    >{notification.data[0].body}</Text>
                </Text>

            </View>
            <View style={styles.viewTime}>
                <Text style={styles.textTime}>{displayDate}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default ItemFriend

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