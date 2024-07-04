import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { url } from '../../constant/url'
import { Image } from 'react-native'
import { reactionType } from './MessageItem'
import { getReactionByMessageHTTP } from '../../http/ChienHTTP'
import { EmojiReaction } from '../../constant/emoji'

const ShowReactionComponent = ({ messageReactionsSelected }) => {
    console.log('reactionsSelected', messageReactionsSelected);
    const [reactions, setReactions] = useState<Array<reactionType>>([])

    async function getReactions() {
        if (!messageReactionsSelected) return

        const result = await getReactionByMessageHTTP(messageReactionsSelected)

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
                            <Image style={styles.reaction} source={EmojiReaction[item.reaction].source} />
                        </View>
                    )
                }}
            />
        </BottomSheetView>
    )
}

export default ShowReactionComponent

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
