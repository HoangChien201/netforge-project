import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { messageType } from './MessageItem'
import { MessageScreenNavigationProp } from '../../screens/message/MessageScreen'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export type GroupChatType = {
    "id": number,
    "name": string | null,
    "type": string,
    "image": string | null,
    "members": Array<{
        user: {
            id: number,
            fullname: string,
            avatar: string
        }
    }>,
    "messages": Array<messageType>

}
const STATUS_SEEN = 2
const ListMessageItem = ({ group }: { group: GroupChatType }) => {
    const user=useSelector((state:RootState)=>state.user.value)
    
    const navigation: MessageScreenNavigationProp = useNavigation()

    let avatar = ''
    let name = ''
    let members:Array<number>=[]

    let id_user = null
    if (group.type === 'group') {
        avatar = group.image ? group.image : '';
        name = group.name ? group.name : '';
    }
    else {
        const userSend = group.members.find(member => member.user?.id !== user?.id)
        if (userSend) {
            avatar = userSend?.user.avatar
            name = userSend.user.fullname
            id_user = userSend.user.id
        }
        else {
            avatar = '../../media/quyet_icon/netforge.png';
            name = "Netforge"
        }
    }
    const onPress = () => {
            navigation.navigate('MessageScreen',{
                group_id: group.id,
                fullname: name,
                avatar: avatar,
                messages: group.messages,
                members:group.members

            })
    }
    const messageLastest = group.messages[0]
    const messageUnSeen =
        (messageLastest.reads.length <= 0) &&
        (typeof messageLastest.sender === 'object' ? messageLastest.sender.id !== user?.id : messageLastest.sender !== user?.id)

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container]} >
                <View style={styles.avatarContainer}>
                    {
                        <Image style={styles.avatar} source={{ uri: avatar }} />
                    }

                </View>
                <View style={styles.content}>
                    <Text style={[styles.name,
                    messageUnSeen ? styles.nameUnSeen : undefined
                    ]}>{name ? name : 'Group '+ group?.id}</Text>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <Text style={styles.nameSender}>{messageLastest.sender.id === user?.id ? 'Bạn: ' : undefined}</Text>
                        <Text style={[styles.message,
                        messageUnSeen ? styles.textMessageUnSeen : undefined]}>
                            {messageLastest.type === 'text' ? messageLastest.message.toString() : messageLastest.type}
                        </Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>

    )
}

export default ListMessageItem

const styles = StyleSheet.create({
    nameSender: {

    },
    nameUnSeen: {
        fontWeight: 'bold',
        color: '#000'
    },
    textMessageUnSeen: {
        fontWeight: 'bold',
        color: '#000'
    },
    message: {
        fontSize: 13,
        color: '#B4B5B1'
    },
    name: {
        fontSize: 18,
        color: '#000',
        fontWeight: '500'
    },
    content: {
        height: '100%',
        justifyContent: "space-evenly"
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    avatarContainer: {
        height: 60,
        width: 60,
        marginEnd: 10
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        borderBottomColor: 'rgba(200,200,200,0.9)',
        borderBottomWidth: .2,
        marginBottom: 10
    },
})