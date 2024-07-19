import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EmptyReq from './EmptyReq'
import {cancelRequest} from '../../http/QuyetHTTP'
import { useNavigation } from '@react-navigation/native';

type Req ={
    dataRequest:any, 
    setDataRequest:(value:any)=>void, 
    setReload:(value:any)=>void, 
    setShowModalFriend:(value:any) => void,
}
const RequestList:React.FC<Req> = ({ dataRequest, setDataRequest, setReload,setShowModalFriend }) => {
    const navigation = useNavigation();
const cancelReq = async (friendId: number)=>{
    try {
        await cancelRequest(friendId);
        setDataRequest((prevData: any[]) => prevData.filter(friend => friend.user.id !== friendId));
    } catch (error) {
        console.log(error);
        console.log(friendId);
        
    }
}
const openProfile = (id: any)=>{
    const userId = id;
    navigation.navigate('FriendProfile', {userId});
    setShowModalFriend(false);
}
    if (!dataRequest || dataRequest.length === 0) {
        return <EmptyReq/>; // Hoặc hiển thị một thông báo khác tùy ý
    }
    return (
        <View style={styles.container}>
            {dataRequest.map((friend: { user: { id: React.Key | null | undefined | any; avatar: any; fullname: string | undefined |any } }) => (
                
                <TouchableOpacity style={styles.itemWA} key={friend.user.id}
                onPress={() => openProfile(friend.user.id)}
                >
                    <View style={styles.user}>
                        {friend.user.avatar? <Image source={{uri: friend.user.avatar}} style={styles.avatarne}/>  : 
                        <View style={{height:48, width:48, borderRadius:50, borderWidth:1,borderColor:'gray', backgroundColor:'#DDDDDD',marginStart:10,}}/>
                        }
                        
                        <Text style={styles.userName}>{friend.user.fullname}</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.buttonReject} onPress={()=>{
                            cancelReq(friend.user.id)
                        }}>
                            <Text style={styles.textAccept}>Hủy bỏ</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default RequestList

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 2,

    },
    itemWA: {
        flexDirection: 'row',
        height: 60,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
        marginTop: 5,
        justifyContent: 'space-between'
    },
    user: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userName: {
        fontSize: 18,
        color: 'black',
        fontWeight: '400',
        marginTop: 10,
        marginStart: 5
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 5
    },
    buttonAccept: {
        height: 30,
        width: 80,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,

    },
    buttonReject: {
        height: 30,
        width: 70,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    textAccept: {
        fontSize: 14,
        color: 'white',
        fontWeight: '500'
    },
    avatarne:{
        height:48,
        width:48,
        marginStart:10,
        borderRadius:50
    }


})