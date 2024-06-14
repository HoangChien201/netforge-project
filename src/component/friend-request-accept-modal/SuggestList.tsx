import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { sendRequest } from '../../http/QuyetHTTP'
const SuggestList = ({ dataSuggest, setDataSuggest, setReload }) => {
    const [result, setResult] = useState('');
    const [textReqState, setTextReqState] = useState({});
    // gửi yêu cầu kết bạn
    const status = 1;
    const sendRequestFriend = async (id,status) => {
        try {
            const result = await sendRequest(id, status);
            if (result) {
                setTextReqState((prevState) => ({
                    ...prevState,
                    [id]: 'Đã gửi'
                }));
            }
        } catch (error) {

        }
    }

    if (!dataSuggest || dataSuggest.length === 0) {
        return <Text style={styles.headerText}>Không có gợi ý bạn bè</Text>;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Gợi ý cho bạn</Text>
            {dataSuggest.map(friend => (
                <View key={friend.user.id}>
                    <View style={styles.itemWA}>
                        <View style={styles.user}>
                            {friend.user.avatar ? <Image source={{ uri: friend.user.avatar }} style={styles.avatarne} /> :
                                <View style={{ height: 48, width: 48, borderRadius: 50, borderWidth: 1, borderColor: 'gray', backgroundColor: '#DDDDDD', }} />
                            }
                            <Text style={styles.userName}>{friend.user.fullname}</Text>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity style={styles.buttonReject} onPress={() => { sendRequestFriend(friend.user.id, status) }} disabled={textReqState[friend.user.id] === 'Đã gửi'} >
                                <Text style={styles.textAccept}>
                                    kết bạn
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
        marginStart: 3,
        marginBottom: 3,
        marginEnd: 3
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
        height: 48,
        width: 48,
        borderRadius: 50,

    }
})