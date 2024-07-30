import { StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native'
import React from 'react'
import {EmojiData } from '../../constant/emoji'
type Em ={
    onSelectEmoji:(value:any)=>void
}
const EmojiList:React.FC<Em> = ({onSelectEmoji}) => {
    return (
        <FlatList
            data={EmojiData}
            numColumns={8}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onSelectEmoji(item.emoji)}>
                    <Text style={styles.emoji}>{item.emoji}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
        />
    );
}

export default EmojiList

const styles = StyleSheet.create({
    emoji: {
        fontSize: 32,
        color:'white'
    },
    listContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})