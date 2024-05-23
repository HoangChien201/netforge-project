import { StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native'
import React from 'react'
import {EmojiData } from '../../constant/emoji'

const EmojiList = ({onSelectEmoji}) => {
    return (
        <FlatList
            data={EmojiData}
            numColumns={11}
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
        fontSize: 24,
    },
    listContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})