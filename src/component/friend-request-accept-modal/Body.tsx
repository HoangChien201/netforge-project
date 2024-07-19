import { Animated, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { getAllUser, getFriends, getRequest, getSuggest } from '../../http/QuyetHTTP';
import Icon from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';

import { COLOR } from '../../constant/color';
import RequestList from './RequestList';
import WaitAcceptList from './WaitAcceptList';
import { useFocusEffect } from '@react-navigation/native';
type Bob = {
    reload: any,
    showModalFriend: any,
    setShowModalFriend: (value: boolean) => void,
    setDot: (value: any) => void,
    setReload: (value: boolean) => void,
}

const Body: React.FC<Bob> = ({ reload, showModalFriend, setShowModalFriend, setDot, setReload }) => {
    const [textHeader, setTextHeader] = useState('Lời mời kết bạn');
    const [textShowRA, setTextShowRA] = useState('Lời mời');
    const [showRA, setShowRA] = useState(true);
    const [dataFriends, setDataFriends] = useState([]);
    const [dataRequest, setDataRequest] = useState([]);
    const [dataWaitAccept, setDataWaitAccept] = useState([]);
    const [dataSuggest, setDataSuggest] = useState([]);
    const [data, setData] = useState([]);
    const status1 = 1;
    const status2 = 2;
    const slideAnim = useRef(new Animated.Value(-500)).current;
    const swiperRef = useRef(null);
    const OpenCloseRA = () => {
        setShowRA(!showRA);
        if (swiperRef.current) {
            if (showRA) {
                setTextShowRA('Lời mời');
                swiperRef.current.scrollTo(-1);
            } else {
                setTextShowRA('Yêu cầu');
                swiperRef.current.scrollTo(1);
            }
        }
    };
    useEffect(() => {
        getRequestList(status1);
        getWaitAcceptList();
    }, [showModalFriend]);
    useEffect(() => {
        getRequestList(status1);
        getWaitAcceptList();
    }, []);

    useEffect(() => {
        const total = dataRequest.length + dataWaitAccept.length;
        setDot(total);

    }, [dataRequest || dataWaitAccept]);

    useEffect(() => {
        if (showModalFriend) {
            slideIn();
        } else {
            slideOut();
        }
    }, [showModalFriend]);
    const getRequestList = async (num: number) => {
        try {
            const result = await getFriends(num);
            //console.log('danh sách bạn bè 1: ' + JSON.stringify(result));
            setDataRequest(result);
            //console.log('request: ' + JSON.stringify(result));
        } catch (error) {
            console.log(error);
        }
    };

    const getWaitAcceptList = async () => {
        try {
            const result = await getRequest();
            //console.log('danh sách bạn bè chờ chấp nhận: ' + JSON.stringify(result));
            setDataWaitAccept(result);
            //console.log('Accept: ' + result);
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
    useEffect(() => {
        // Cập nhật giá trị của slideAnim mỗi khi showRA thay đổi
        Animated.timing(slideAnim, {
            toValue: showRA ? 0 : 0, // Chuyển về 0 nếu showRA là true, ngược lại về -100
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [showRA]);


    const handleCloseModal = () => {
        slideOut();
        setTimeout(() => setShowModalFriend(false), 300); // Delay to match slide out animation
    };

    return (
        <Modal transparent visible={showModalFriend}>
            <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleCloseModal}>
                        <Icon name='close' size={24} color={'white'} style={styles.buttonCloseModal} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Yêu cầu kết bạn</Text>
                    <TouchableOpacity onPress={OpenCloseRA} style={styles.buttonShowRA}>

                        <Text style={styles.textShowRA}>{textShowRA}</Text>
                        <Icon name='doubleright' color={COLOR.PrimaryColor1} size={16} />
                    </TouchableOpacity>
                </View>
                <Swiper ref={swiperRef} loop={false} showsButtons={false}>
                    <View>
                        <WaitAcceptList dataWaitAccept={dataWaitAccept} setDataWaitAccept={setDataWaitAccept} setShowModalFriend={setShowModalFriend} />
                    </View>
                    <View>
                        <RequestList dataRequest={dataRequest} setDataRequest={setDataRequest} setReload={setReload} setShowModalFriend={setShowModalFriend} />
                    </View>
                </Swiper>
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

    },
    header: {
        backgroundColor: COLOR.PrimaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
    },
    buttonCloseModal: {
        height: 24,
        width: 24,
        marginStart: 5,
    },
    textHeader: {
        fontSize: 20,
        color: COLOR.primary300,
        fontWeight: '500',
        marginStart: -110,
    },
    textShowRA: {
        fontSize: 16,
        color: COLOR.primary300,
        fontWeight: '400',
        borderRightWidth: 1,
        marginEnd: 2,
        paddingEnd: 3,
        borderRightColor: COLOR.PrimaryColor1
    },
    buttonShowRA: {
        marginEnd: 10,
        // backgroundColor: COLOR.PrimaryColor1,
        borderRadius: 10,
        height: 30,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
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
