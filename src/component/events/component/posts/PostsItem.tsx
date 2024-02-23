import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import FeedbackWrapper from './FeedbackWrapper'
import { FormarTime } from '../../../../format/FormatDate'
import { create } from 'react-test-renderer'
import { userType } from '../../screens/ProfileScreen'
export type PostsItemType = {
    id: number;
    content: string;
    image: string;
    event_id: number;
    user: userType;
    like: number | null
    create_time:Date
}


const PostsItem = ({ posts }: { posts: PostsItemType }) => {
    
    return (
        <View>

            <View style={styles.container}>
                <View style={[styles.flexRow,{marginVertical:10}]}>
                    <View style={[styles.flexRow, { marginEnd: 10 }]}>
                        {
                            <Image source={{ uri: posts.user.avatar }} style={styles.imagePage} />
                        }

                        <Text style={[styles.namePage, styles.text, { color: '#000' }]}>{posts.user.fullname}</Text>
                    </View>
                    <View style={styles.flexRow}>
                        {
                            <Image source={require('../../../../media/icon/icon-hour-light.png')} />
                        }
                        <Text style={[styles.time, styles.text, { color: '#000' }]}>{FormarTime(posts.create_time)}</Text>
                    </View>
                </View>
                {
                    posts.image != null && <Image style={styles.imageFull} source={{ uri: posts.image }} />
                }

                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.content} numberOfLines={2}>{posts.content}</Text>
                    </View>
                </View>
                <FeedbackWrapper posts={posts} />
            </View>
        </View>
    )
}

export default PostsItem

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        minHeight:150,
        maxHeight:400,
        marginBottom:20,
        width: '100%',
        borderRadius: 12,
    },
    imageFull: {
        width: '100%',
        height: '60%',
        borderRadius: 12,

    },
    category: {
        color: '#4e4b66',
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 19.5,
        marginVertical: 5,
    },
    text: {
        fontFamily: 'poppins',
        lineHeight: 24,
        letterSpacing: 0.12,
    },
    content: {
        color: '#000',
        fontWeight: '400',
        fontSize: 16,
        padding: 10
    },
    namePage: {
        color: '#4e4b66',
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 19.5,
        marginStart: 5
    },
    imagePage: {
        width: 30,
        height: 30,
        borderRadius: 30
    },
    time: {
        color: '#4e4b66',
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 19.5,
        marginStart: 5
    },

})