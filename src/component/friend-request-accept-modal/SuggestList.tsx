import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useSendNotification } from '../../constant/notify';
import { sendRequest } from '../../http/QuyetHTTP';
type Suggest = {
    data: any,
    setData: () => void,
    setReload: any
}
const SuggestList: React.FC<Suggest> = ({ data, setData, setReload }) => {
    const [result, setResult] = useState('');
    const [textReqState, setTextReqState] = useState({});
    const [disabledButtons, setDisabledButtons] = useState({});
    const {sendNRequestFriend} = useSendNotification()
    // gửi yêu cầu kết bạn
    const status = 1;
    const sendRequestFriend = async (id: number, status: number) => {
        setDisabledButtons((prevState) => ({
            ...prevState,
            [id]: true,
        }));
        try {
            const result = await sendRequest(id, status);
            if (result.status==1) {
                setTextReqState((prevState) => ({
                    ...prevState,
                    [id]: 'Đã gửi'
                }));
                console.log('đã gửi lời mời');
                console.log(result);
                const data ={
                    receiver:id
                }
                sendNRequestFriend(data)
            }
        } catch (error) {
            setDisabledButtons((prevState) => ({
                ...prevState,
                [id]: false,
            }));
        }
    }

    if (!data || data.length === 0) {
        return <View style={styles.containerEmpty}>
        <Text style={styles.headerText}>Không có gợi ý bạn bè</Text>
        </View>
        

    }
    useEffect(() => {
        console.log(data);

    }, []);
    const log = (id) => {
        console.log("id friend: " + id);

    }
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Gợi ý cho bạn</Text>
            {data.map((friend: { user: { id: string | number; avatar: any; fullname: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined } }) => (
                <View key={friend.id.toString()}>
                    <View style={styles.itemWA}>
                        <View style={styles.user}>
                            {friend.avatar ? <Image source={{ uri: friend.avatar }} style={styles.avatarne} /> :
                                <View style={{ height: 48, width: 48, borderRadius: 50, borderWidth: 1, borderColor: 'gray', backgroundColor: '#DDDDDD', }} />
                            }
                            <Text style={styles.userName}>{friend.fullname}</Text>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity style={textReqState[friend.id] === 'Đã gửi' ? styles.buttonAccept : styles.buttonReject}
                                onPress={() => { sendRequestFriend(friend.id, status) }} disabled={textReqState[friend.id] === 'Đã gửi' || disabledButtons[friend.id]} >
                                <Text style={textReqState[friend.id] === 'Đã gửi' ? styles.textAccept1 : styles.textAccept}>
                                    {textReqState[friend.id] === 'Đã gửi' ? 'Đã gửi' : 'kết bạn'}
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    containerEmpty:{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',

    },
    headerText: {
        marginStart: 10,
        fontWeight: '500',
        fontSize: 18,
        color: 'black',
        
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,

    },
    buttonReject: {
        height: 30,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    textAccept: {
        fontSize: 14,
        color: 'blue',
        fontWeight: 'bold',
        fontStyle: 'normal',
        textTransform: 'capitalize'

    },
    avatarne: {
        height: 48,
        width: 48,
        borderRadius: 50,

    },
    textAccept1: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
        fontStyle: 'normal',
        textTransform: 'capitalize'

    },
})