import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { COLOR } from '../../constant/color';
import UseMedia from './UseMedia';
import { useMyContext } from '../navigation/UserContext';
import { messageType } from './MessageItem';
import { MessageProvider } from './class/MessageProvider';


const TextingComponent = ({ addMessage, reply, setReply }: { addMessage: any, reply: messageType | null, setReply: any }) => {
    const [valueInput, setValueInput] = useState<string>()
    const { user } = useMyContext()
    function onSubmit(messageMedia?: any | null) {
        if (messageMedia?.id) {
            addMessage(messageMedia)
            return
        }

        const messageCreate = new MessageProvider({
            message:valueInput ? valueInput.trimEnd() : '😂',
            type:'text',
            sender:user.id,
            parent:reply ? reply : null
        })
        
        addMessage(messageCreate)

        setValueInput('')
    }
    function OnChangeText(text: string) {
        setValueInput(text)
    }

    return (
        <View style={styles.container}>
            <UseMedia onSubmit={onSubmit} reply={reply} />
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder='Nhập'
                    value={valueInput}
                    multiline={true}
                    onChangeText={OnChangeText}
                />
            </View>
            <View style={styles.submitWrapper}>
                {
                    valueInput ?
                        <MCIcon name='send' size={30} color={COLOR.PrimaryColor} onPress={onSubmit} />
                        :
                        <TouchableOpacity onPress={onSubmit}>
                            <Text style={{ fontSize: 24, alignSelf: 'center' }}>😂</Text>
                        </TouchableOpacity>
                }
            </View>
            {
                reply &&
                <View style={styles.replyStyle}>
                    <View>
                        <Text style={styles.title}>Trả lời tin nhắn của
                            <Text style={{ fontWeight: '600', color: '#000' }}> {reply.sender.id === user.id ? "bạn" : reply.sender.fullname}</Text>
                        </Text>
                        <Text style={styles.message}>{reply.type !== 'text' ? 'Hình ảnh' : reply.message.toString()}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={.7} onPress={() => setReply(null)}>
                        <MCIcon name='close' size={24} color={'#000'} />
                    </TouchableOpacity>
                </View>

            }
        </View>
    )
}

export default TextingComponent

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.9
    },
    title: {},
    message: {},
    replyStyle: {
        height: 50,
        backgroundColor: "rgba(255,255,255,.9)",
        width: '100%',
        position: 'absolute',
        top: -50,
        padding: 15,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    camera: {
        flex: 0.1,
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    inputWrapper: {
        flex: 0.7,
        borderColor: '#000',
        borderRadius: 20,
        borderWidth: 1,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        minHeight: 40,

    },
    submitWrapper: {
        flex: 0.1,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 10
    },
    container: {
        backgroundColor: 'rgba(255,255,255,1)',
        flexDirection: 'row',
        alignItems: 'flex-end',
        minHeight: 50,
        paddingVertical: 10
    }
})