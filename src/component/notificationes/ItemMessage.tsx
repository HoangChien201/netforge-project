
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLOR } from '../../constant/color'
import { DateOfTimePost } from '../../format/DateOfTimePost'
import { useNavigation } from '@react-navigation/native'
type Item = {
    notification: any
}
const ItemMessage:React.FC<Item> = ({ notification }) => {
    const navigation = useNavigation();
    const displayDate = DateOfTimePost(notification.timestamp);
    return (
        <TouchableOpacity style={styles.container} key={notification.id.toString()}
        onPress={()=> navigation.navigate('MessageStack')}
        >
        <View style={styles.iconFriend} >
            <Image style={styles.avatar} source={{ uri: notification.userInfo.avatar }} />
            <Icon style={styles.iconHeart} name='message1' size={18} color={COLOR.PrimaryColor} />
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

export default ItemMessage

const styles = StyleSheet.create({
    container: {
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginTop:5 
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
        overflow:'hidden'
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
        top:2
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