import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { userType } from '../../screens/ProfileScreen'
import { GetTimeComment } from '../../../../format/FormatDate'

export type CommentType={
    comment_id:number;
    posts_id:number,
    user:userType,
    content:string,
    create_time:string
}

const CommentItem = ({ item }:{item:CommentType}) => {
    //color-mode
    //

    return (
        <View style={styles.container}>
            <Image source={{uri:item.user.avatar}} style={styles.avatar} />
            <View style={styles.content}>
                <View>
                    <Text style={[styles.name]}>{item.user.fullname}</Text>
                    <Text style={[styles.comment]}>{item.content}</Text>
                </View>
                <View style={styles.interactWrapper}>
                    <Text style={styles.time}>{GetTimeComment(item.create_time)}</Text>
                    {/* <IconText text={like+' likes'} textColor={modeDark ? grayDark :grayDark} icon='heart' colorIcon={modeDark ? grayDark :grayDark} size={14} />
                    {
                        commentsReply && <TouchableOpacity>
                            <IconText text="reply" icon='return-down-back' colorIcon={modeDark ? grayDark :grayDark} size={14} onPress={replyPress.bind(this, { name: author, id: id })} />
                        </TouchableOpacity>
                    } */}

                </View>

            </View>
        </View>
    )
}

export default CommentItem

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 8,
        width: '100%',
        minHeight: 90,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginEnd: 8
    },
    content: {
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 24,
        letterSpacing: 0.12,
        color:'#000'

    },
    comment: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0.12,
        color:'#000'
    },
    interactWrapper: {
        flexDirection: "row",
        marginVertical: 4
    },
    time: {
        marginEnd: 10
    },

})