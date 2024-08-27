import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { url } from '../../constant/url'
import { Image } from 'react-native'
import { getLikeCommentHTTP } from '../../http/ChienHTTP'
import { EmojiReaction } from '../../constant/emoji'
import { reactionComment, REACTIONS_IMAGE } from './ListReactionComment'

const ShowReactionCommentComponent = ({ comment }:{comment:number}) => {
    const [reactions, setReactions] = useState<Array<reactionComment>>([])

    async function getReactions() {
        if (!comment) return

        const result = await getLikeCommentHTTP(comment)

        if (!result) return

        setReactions(result)
    }

    useEffect(() => {
        getReactions()
    }, [])
    return (
        <BottomSheetView style={styles.container}>
            <Text style={styles.title}>Cảm súc</Text>
            <FlatList
                data={reactions}
                renderItem={({ item }) => {
                    const indexReaction = REACTIONS_IMAGE.find(itemIndex => itemIndex.type === item.reaction)

                    return (
                        <View style={{
                             flexDirection:'row',
                             justifyContent:'space-between',
                             marginVertical:5,
                             alignItems:"center"
                        }}>
                            {
                                typeof item.user === 'object' &&
                                <View style={{
                                        flex:0.7,
                                        flexDirection:'row',
                                        alignItems:"center"
                                    }}>
                                    <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
                                    <Text style={styles.fullname}>{item.user.fullname}</Text>
                                </View>
                            }
                            <Image style={styles.reaction} source={indexReaction?.Emoji} />
                        </View>
                    )
                }}
            />
        </BottomSheetView>
    )
}

export default ShowReactionCommentComponent

const styles = StyleSheet.create({
    reaction: {
        width: 20,
        height: 20,
    },
    avatar: {
        height:40,
        width:40,
        borderRadius:40
    },
    fullname: {
        color:'#000',
        fontSize:16,
        marginStart:20,
        fontWeight:'600'
    },
    title:{ 
        alignSelf:'center',
        color:'#000',
        fontSize:20,
        fontWeight:'bold',
        marginBottom:20
    },
    container: {
        paddingHorizontal:20
       
    }
})
