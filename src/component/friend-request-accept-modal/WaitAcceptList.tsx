import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../../constant/color'
import { cancelWaitAccept, acceptRequest } from '../../http/QuyetHTTP'
import EmptyWA from './EmptyWA'
const WaitAcceptList = ({ dataWaitAccept, setDataWaitAccept, setReload }) => {
    const cancelReq = async (friendId) => {
        try {
            await cancelWaitAccept(friendId);
            setDataWaitAccept(prevData => prevData.filter(friend => friend.idReq !== friendId));
        } catch (error) {
            console.log(error);

        }
    };
    const acceptReq = async (friendId) => {
        try {
            await acceptRequest(friendId);
            setDataWaitAccept(prevData => prevData.filter(friend => friend.idReq !== friendId));
        } catch (error) {
            console.log(error);

        }
    };

    if (!dataWaitAccept || dataWaitAccept.length === 0) {
        return <EmptyWA />; // Hoặc hiển thị một thông báo khác tùy ý
    }
    return (
        <ScrollView style={styles.container}>
            {dataWaitAccept.map(friend => (
                <View style={styles.itemWA} key={friend.idReq}>
                    <View style={styles.user}>
                        <Image source={{ uri: friend.avatar }} style={styles.avatarne} />
                        <Text style={styles.userName}>{friend.name}</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.buttonReject} onPress={() => {
                            cancelReq(friend.idReq)
                        }}>
                            <Text style={styles.textAccept}>Từ chối</Text>
                        </TouchableOpacity>
                        <View style={{ width: 10 }}></View>
                        <TouchableOpacity style={styles.buttonAccept}onPress={() => {
                            acceptReq(friend.idReq)
                        }}>
                            <Text style={styles.textAccept}>Chấp nhận</Text>
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
        marginTop: 2,
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
        width: 80,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    textAccept: {
        fontSize: 14,
        color: 'white',
        fontWeight: '400'
    },
    avatarne: {
        height: 40,
        width: 40,
        marginStart: 10
    }

})