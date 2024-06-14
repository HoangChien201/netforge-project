import { Animated, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { getFriends, getRequest, getSuggest } from '../../http/QuyetHTTP';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLOR } from '../../constant/color';
import RequestList from './RequestList';
import WaitAcceptList from './WaitAcceptList';
import SuggestList from './SuggestList';

const Body = ({ showModalFriend, setShowModalFriend, setDot, setReload }) => {
    const [textHeader, setTextHeader] = useState('Yêu cầu kết bạn');
    const [textShowRA, setTextShowRA] = useState('Lời mời');
    const [showRA, setShowRA] = useState(true);
    const [dataFriends, setDataFriends] = useState([]);
    const [dataRequest, setDataRequest] = useState([]);
    const [dataWaitAccept, setDataWaitAccept] = useState([]);
    const [dataSuggest, setDataSuggest] = useState([]);
    const status1 = 1;
    const status2 = 2;
    const slideAnim = useRef(new Animated.Value(-500)).current; // Initial position off screen

    useEffect(() => {
        getFriendList(status2);
        getRequestList(status1);
        getWaitAcceptList();
        getSuggestList();
    }, [setReload]);

    useEffect(() => {
        const total = dataRequest.length + dataWaitAccept.length;
        setDot(total);
    }, [dataFriends, dataRequest, dataWaitAccept]);

    useEffect(() => {
        if (showModalFriend) {
            slideIn();
        } else {
            slideOut();
        }
    }, [showModalFriend]);
    // lấy danh sách bạn bè
    const getFriendList = async (status) => {
        try {
            const result = await getFriends(status);
            //console.log('danh sách bạn bè 2: ' + JSON.stringify(result));
            //setDataFriends(result);
        } catch (error) {
            console.log(error);
        }
    };
    // lấy danhn sách gợi ý
    const getSuggestList = async () => {
        try {
            const result = await getSuggest();
            //console.log('danh sách gợi ý: ' + JSON.stringify(result));
            setDataSuggest(result);
        } catch (error) {
            console.log(error);
        }
    };

    const getRequestList = async (num) => {
        try {
            const result = await getFriends(num);
            //console.log('danh sách bạn bè 1: ' + JSON.stringify(result));
            setDataRequest(result);
        } catch (error) {
            console.log(error);
        }
    };

    const getWaitAcceptList = async () => {
        try {
            const result = await getRequest();
            //console.log('danh sách bạn bè chờ chấp nhận: ' + JSON.stringify(result));
            setDataWaitAccept(result);
        } catch (error) {
            console.log(error);
        }
    };

    const slideIn = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideOut = () => {
        Animated.timing(slideAnim, {
            toValue: -500,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const OpenCloseRA = () => {
        if (showRA) {
            setShowRA(false);
            setTextHeader('Yêu cầu đã gửi');
            setTextShowRA('Lời mời');
        } else {
            setShowRA(true);
            setTextHeader('Lời mời kết bạn');
            setTextShowRA('Yêu cầu');
        }
    };

    const handleCloseModal = () => {
        slideOut();
        setTimeout(() => setShowModalFriend(false), 300); // Delay to match slide out animation
    };

    const ITEM_HEIGHT = 80; // Height of each list item
    const calculateHeight = (data) => {
        if (data.length === 0) {

        } else {
            data.length * ITEM_HEIGHT;
        }
    }


    return (
        <Modal transparent visible={showModalFriend}>
            <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleCloseModal}>
                        <Icon name='close' size={24} color={'white'} style={styles.buttonCloseModal} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>{textHeader}</Text>
                    <TouchableOpacity onPress={OpenCloseRA} style={styles.buttonShowRA}>
                        <Text style={styles.textShowRA}>{textShowRA}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {showRA ?
                        <View style={[styles.listRA, { height: calculateHeight(dataWaitAccept) }]}>
                            <WaitAcceptList dataWaitAccept={dataWaitAccept} setDataWaitAccept={setDataWaitAccept} setReload={setReload} />
                        </View>
                        :
                        <View style={[styles.listRA, { height: calculateHeight(dataRequest) }]}>
                            <RequestList dataRequest={dataRequest} setDataRequest={setDataRequest} setReload={setReload} />
                        </View>
                    }
                    <View style={[{ height: calculateHeight(dataFriends) }]}>
                        <SuggestList dataSuggest={dataSuggest} setDataSuggest={setDataSuggest} setReload={setReload} />
                    </View>
                </ScrollView>
            </Animated.View>
        </Modal>
    );
};

export default Body;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000,
    },
    header: {
        backgroundColor: COLOR.PrimaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
    },
    buttonCloseModal: {
        height: 24,
        width: 24,
        marginStart: 5,
    },
    textHeader: {
        fontSize: 20,
        color: COLOR.primary300,
        fontWeight: '400',
        marginStart: -80,
    },
    textShowRA: {
        fontSize: 18,
        color: COLOR.primary300,
        fontWeight: '400',
    },
    buttonShowRA: {
        marginEnd: 10,
        backgroundColor: COLOR.primary200,
        borderRadius: 10,
        height: 30,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listRA: {
        alignItems: 'center',
    },
    dot: {
        height: 5,
        width: 5,
        position: 'absolute',
        end: 10,
        top: 5,
        backgroundColor: 'red',
        borderRadius: 5,
    },
});
