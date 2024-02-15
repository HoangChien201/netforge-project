import { StyleSheet, Text, TextInput, View, } from 'react-native'
import React from 'react'

const Information = () => {
    return (
        <View>
            <TextInput style={styles.eventName} placeholder='Event name' />
            <TextInput
                style={styles.aboutEvent}
                placeholder="About your event"
                numberOfLines={3}
                multiline
            />
        </View>
    )
}

export default Information

const styles = StyleSheet.create({
    eventName: {
        height: 48,
        width: '100%',
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: '400',
    },
    aboutEvent: {
        fontSize: 16,
        borderTopWidth:1,
        fontFamily: 'Arial',
        fontWeight: '400',
    },
})