import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { COLOR } from '../../constant/color'
import { cancelWaitAccept, acceptRequest } from '../../http/QuyetHTTP'
import EmptyWA from './EmptyWA'
type Wait ={
    dataWaitAccept:any, 
    setDataWaitAccept:(value:any)=>void,
    setShowModalFriend:(value:any) => void,
}
const WaitAcceptList:React.FC<Wait> = ({ dataWaitAccept, setDataWaitAccept, setShowModalFriend}) => {
    const navigation = useNavigation();
    const cancelReq = async (friendId:number) => {
        try {
            await cancelWaitAccept(friendId);
            setDataWaitAccept(prevData => prevData.filter(friend => friend.user.id !== friendId));
        } catch (error) {
            console.log(error);

        }
    };
    const acceptReq = async (friendId:number) => {
        try {
            await acceptRequest(friendId);
            setDataWaitAccept(prevData => prevData.filter(friend => friend.user.id  !== friendId));
        } catch (error) {
            console.log(error);

        }
    };

    if (!dataWaitAccept || dataWaitAccept.length === 0) {
        return <EmptyWA ></EmptyWA>;
    }
    const openProfile = (id: any)=>{
        const userId = id;
        navigation.navigate('FriendProfile', {userId});
        setShowModalFriend(false);
    }
    return (
        <ScrollView style={styles.container}>
            {dataWaitAccept.map(friend => (
                <View style={styles.itemWA} key={friend.user.id}>
                    <View style={styles.user}>
                    {friend.user.avatar? <Image source={{uri: friend.user.avatar}} style={styles.avatarne}/>  : 
                        <View style={{height:48, width:48, borderRadius:50, borderWidth:1,borderColor:'gray', backgroundColor:'#DDDDDD',marginStart:10,}}/>
                        }
                        <Text style={styles.userName}>{friend.user.fullname}</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.buttonAccept}onPress={() => {
                            acceptReq(friend.user.id)
                        }}>
                            <Icon name='check' size={22} color={'white'}/>
                            {/* <Text style={styles.textAccept}>Chấp nhận</Text> */}
                        </TouchableOpacity>
                        <View style={{ width: 10 }}></View>
                        <TouchableOpacity style={styles.buttonReject} onPress={() => {
                            cancelReq(friend.user.id)
                        }}>
                            <Icon name='close' size={22} color={'white'}/>
                            {/* <Text style={styles.textAccept}>Từ chối</Text> */}
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}

export default WaitAcceptList

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 2
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
        height: 32,
        width: 32,
        backgroundColor: COLOR.PrimaryColor1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,


    },
    buttonReject: {
        height: 32,
        width: 32,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32
    },
    textAccept: {
        fontSize: 14,
        color: 'white',
        fontWeight: '400'
    },
    avatarne: {
        height: 45,
        width: 45,
        marginStart: 10,
        borderRadius:40
    }

})