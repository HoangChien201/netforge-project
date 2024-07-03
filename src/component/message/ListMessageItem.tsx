import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useMyContext } from '../navigation/UserContext'

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
    }>
}

const ListMessageItem = ({ group }: { group: GroupChatType }) => {
    // const {user} = useMyContext()
    // console.log('user',user.id);
    
    const navigation = useNavigation()
    
    let avatar=''
    let name=''
    let id = null
    if(group.type === 'group'){
        avatar=group.image ? group.image : '';
        name=group.name ? group.name : ''
    }
    else{
        const userSend=group.members.find(member=>member.user.id !==1)
        if(userSend){
            avatar=userSend?.user.avatar
            name=userSend.user.fullname
            id=userSend.user.id
        }
        else{
            avatar='../../media/quyet_icon/netforge.png';
            name="Netforge"
        }
    }
    const onPress = () => {
        navigation.navigate('MessageScreen',{
            group_id:group.id,
            name:name,
            avatar:avatar,
            id:id
        })
        console.log("name: ", name);
        console.log("user ID: ", id)
    }
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container} >
                <View style={styles.avatarContainer}>
                    {
                        <Image style={styles.avatar} source={{ uri:avatar }} />
                    }

                </View>
                <View style={styles.content}>
                    <Text style={styles.name}>{name}</Text>
                    {/* <Text style={styles.message}>ListMessageItem</Text> */}

                </View>
            </View>
        </TouchableOpacity>

    )
}

export default ListMessageItem

const styles = StyleSheet.create({
    message: {
        fontSize: 13,
        color: '#B4B5B1'
    },
    name: {
        fontSize: 18,
        color: '#000',
        fontWeight: '700'
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
        borderBottomColor:'rgba(200,200,200,0.9)',
        borderBottomWidth:.2,
        marginBottom:10
    },
})