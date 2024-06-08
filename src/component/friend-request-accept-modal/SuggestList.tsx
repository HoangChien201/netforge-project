import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { sendRequest } from '../../http/QuyetHTTP'
const SuggestList = ({ dataSuggest, setDataSuggest, setReload }) => {
    const [result, setResult] = useState('');
    const [textReqState, setTextReqState] = useState({});
    // gửi yêu cầu kết bạn
    const sendRequestFriend = async (friendId) => {
        try {
            const result = await sendRequest(friendId);
            if (result) {
                // Cập nhật trạng thái textReqState để hiển thị "Đã gửi"
                setTextReqState((prevState) => ({
                    ...prevState,
                    [friendId]: 'Đã gửi'
                }));
                // reload
            }
        } catch (error) {

        }
    }

    if (!dataSuggest || dataSuggest.length === 0) {
        return <Text>No data available</Text>; // Hoặc hiển thị một thông báo khác tùy ý
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Gợi ý cho bạn</Text>
            {dataSuggest.map(friend => (
                <View key={friend._id}>
                    <View style={styles.itemWA}>
                        <View style={styles.user}>
                            <Image source={{ uri: friend.avatar }} style={styles.avatarne} />
                            <Text style={styles.userName}>{friend.name}</Text>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity style={styles.buttonReject} onPress={() => { sendRequestFriend(friend._id) }} disabled={textReqState[friend._id] === 'Đã gửi'}>
                                <Text style={styles.textAccept}>
                                    {textReqState[friend._id] || 'Kết bạn'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            ))}

        </View>
    )
}

export default SuggestList

const styles = StyleSheet.create({
    container: {

    },
    headerText: {
        marginStart: 10,
        fontWeight: '500',
        fontSize: 18,
        color: 'black'
    },

    itemWA: {
        flexDirection: 'row',
        height: 70,
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
        marginTop: 3,
        justifyContent: 'space-between',
        marginStart:3,
        marginBottom:3,
        marginEnd:3
    },
    user: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: 10
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
        backgroundColor: 'blue',
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

    }
})