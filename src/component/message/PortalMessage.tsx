import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Portal } from 'react-native-portalize';
import { BlurView } from '@react-native-community/blur'
import MessageItemContent from './MessageItemContent';
import { useMyContext } from '../navigation/UserContext';
import ReactionOptionComponent from './ReactionOptionComponent';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

interface PortalMessageProp {
    selectedMessage: any,
    messageCordinates: any,
    setSelectedMessage: any,
    optionReactionOnSubmit:any
}

const PortalMessage: React.FC<PortalMessageProp> = (props) => {
    const { selectedMessage, messageCordinates, setSelectedMessage,optionReactionOnSubmit } = props
    const { user } = useMyContext()

    const sender = (typeof (selectedMessage?.sender) === 'object' ? selectedMessage?.sender.id : selectedMessage?.sender) === user.id

    function onPress() {
        setSelectedMessage(null)
    }

    //animated

    if (!selectedMessage) return

    return (
        <Portal>
            <BlurView style={styles.container} blurAmount={20}>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onPress}
                    style={styles.container}>
                    <View style={[
                        styles.messageStyle,
                        { top: messageCordinates?.y,
                            alignSelf:'center'
                         },
                    ]}>
                        <MessageItemContent
                            message={selectedMessage}
                            sender={sender} />
                    </View>
                    <View style={[styles.reactionStyle, { top: messageCordinates.y ? messageCordinates.y - 70 : 0 }]}>
                        <ReactionOptionComponent
                         reactionOfMsg={selectedMessage.reactions} 
                         messageCordinates={messageCordinates} 
                         ontionOnpress={optionReactionOnSubmit}
                         setSelectedMessage={setSelectedMessage} />
                    </View>
                </TouchableOpacity>
            </BlurView>
        </Portal>
    )
}

export default PortalMessage

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    messageStyle: {
        position: "absolute"
    },
    reactionStyle: {
        position: "absolute",
        alignSelf: 'center',
    }
})