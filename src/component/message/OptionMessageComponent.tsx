import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import IconFont from 'react-native-vector-icons/FontAwesome'
import { messageType } from './MessageItem';
import { deleteMessageAPI } from '../../http/ChienHTTP';
import { socket } from '../../http/SocketHandle';
import { useMyContext } from '../navigation/UserContext';

const OptionMessageComponent = ({ deleteMessage, message, setReply }: { deleteMessage: any, message: messageType, setReply: any }) => {
    const {user} = useMyContext()
    function ReplyHandle() {
        setReply(message)
    }

    async function DelteMessageHandle() {
        const resultDelete = await deleteMessageAPI(message.id)

        if (resultDelete['status'] <= 0) return

        socket.emit('message', message)

        deleteMessage(message.id)

    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={ReplyHandle} activeOpacity={0.8} style={[styles.optionStyle, {
                borderBottomWidth: message.sender.id === user.id ? 1 : 0,
            }]}>
                <Text style={styles.nameOption}>Trả lời</Text>
                <IconFont name='reply' size={18} color={'#000'} />
            </TouchableOpacity>
            {
                message.sender.id === user.id &&
                <TouchableOpacity onPress={DelteMessageHandle} activeOpacity={0.8} style={styles.optionStyle}>
                    <Text style={[styles.nameOption, { color: 'red' }]}>Xóa</Text>
                    <IconFont name='trash' size={18} color={'red'} />
                </TouchableOpacity>
            }
        </View>
    )
}

export default OptionMessageComponent

const styles = StyleSheet.create({
    optionStyle: {
        flexDirection: 'row',
        justifyContent: "space-between",
        borderBottomColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    nameOption: {
        color: '#000',
        fontWeight: '600',
        fontSize: 17
    },
    container: {
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
    }
})