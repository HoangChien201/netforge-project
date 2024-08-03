import { View,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Portal } from 'react-native-portalize';
import { BlurView } from '@react-native-community/blur'
import MessageItemContent from './MessageItemContent';
import ReactionOptionComponent from './ReactionOptionComponent';
import OptionMessageComponent from './OptionMessageComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface PortalMessageProp {
    selectedMessage: any,
    messageCordinates: any,
    setSelectedMessage: any,
    optionReactionOnSubmit: any;
    heightLayout: any,
    deleteMessage:any,
    setReply:any
}

const PortalMessage: React.FC<PortalMessageProp> = (props) => {
    const { selectedMessage, messageCordinates, setSelectedMessage, optionReactionOnSubmit, heightLayout,deleteMessage,setReply } = props
    const user = useSelector((state:RootState)=>state.user.value)

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
                        {
                            top: messageCordinates?.y,
                            right: sender ? 10 : undefined,
                            left: !sender ? 10 : undefined
                        },
                    ]}>
                        <MessageItemContent
                            message={selectedMessage}
                            sender={sender} />
                    </View>
                    <View style={[styles.reactionStyle, { top: messageCordinates.y ? messageCordinates.y - 80 : 0 }]}>
                        <ReactionOptionComponent
                            reactionOfMsg={selectedMessage.reactions}
                            messageCordinates={messageCordinates}
                            ontionOnpress={optionReactionOnSubmit}
                            setSelectedMessage={setSelectedMessage} />
                    </View>

                    <View style={[{
                        top: messageCordinates.y ? messageCordinates.y + heightLayout + 10 : 0,
                        right: sender ? 10 : undefined,
                        left: !sender ? 10 : undefined,
                        position:'absolute'
                    }
                    ]}>
                        <OptionMessageComponent setSelectedMessage={setSelectedMessage} deleteMessage={deleteMessage} message={selectedMessage} setReply={setReply}/>
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
    },
})