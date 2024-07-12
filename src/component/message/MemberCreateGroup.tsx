import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { FriendType } from './ModalNewMessage'

const MemberCreateGroup = ({ members, friends ,remove}: { members: Array<number>, friends: Array<FriendType>,remove:any }) => {

    function MemberItem({ item }: { item: number }) {
        const member = friends.find(f => f.user.id === item)
        return (
            <View style={styles.memberItem}>
                <Image source={{ uri: member?.user.avatar }} style={styles.avatar} />
                <TouchableOpacity style={styles.iconClose} activeOpacity={0.8} onPress={()=>remove(member?.user.id)}>
                    <AntDesignIcon name='closecircle' size={18} color={'#000'} />
                </TouchableOpacity>

            </View>
        )
    }
    return (
        <View style={styles.container}> 
            <FlatList
                data={members}
                renderItem={({ item }) => {
                    return (
                        <MemberItem item={item}/>
                )
                }}
                keyExtractor={(item) => item.toString()}
                horizontal={true}
            />
        </View>
    )
}

export default MemberCreateGroup

const styles = StyleSheet.create({
    container:{
        marginVertical:10
    },
    memberItem: {
        height:50,
        width:50,
        marginEnd:20
    },
    iconClose: {
        position:"absolute",
        right:0,
        top:0,
        backgroundColor:'#fff',
        borderRadius:15
    },
    avatar: {
        width:'100%',
        height:"100%",
        borderRadius:50,
    },
})