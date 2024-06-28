import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLOR } from '../../constant/color'

const ItemComment = () => {
    


    return (
        <View style={styles.container}>
            <View style={styles.iconFriend} >
                <Image style={styles.avatar} source={require('../../media/quyet_icon/smile_p.png')}/>
                <Icon style={styles.iconHeart} name='aliwangwang' size={18} color={'blue'} />
            </View>
            <View style={styles.text}>
                <Text>
                <Text style={styles.textUser_Post}>XXX </Text>
                <Text style={styles.text1}>đã bình luận bài viết </Text>
                <Text style={styles.textUser_Post}>XXXX </Text>
                <Text style={styles.text1}>của bạn</Text>
                </Text>
                
                <Text style={styles.textTime}>10 phút trước</Text>
            </View>
        </View>
    )
}

export default ItemComment

const styles = StyleSheet.create({
    container: {
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    iconFriend: {
        height: 44,
        width: 44,
        borderWidth: 1,
        borderColor: COLOR.PrimaryColor1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 6
    },
    avatar:{

    },
    iconHeart:{
        position:'absolute',
        end:-2,
        bottom:-2,
    },
    text: {
        marginStart: 10
    },
    textUser_Post: {
        fontSize: 16,
        fontWeight: '600',
        fontStyle: "normal",
        color: 'black'
    },
    text1: {
        fontSize: 16,
        fontWeight: '400',
        fontStyle: "normal",
        color: 'black'
    },
    textTime: {
        fontSize: 13,
        fontWeight: '300',
        fontStyle: "normal",
        color: 'black'
    },
    headerText: {
        fontSize: 18,
        fontWeight: '400',
        fontStyle: "normal",
        color: 'black',
        marginStart: 5
    }
})