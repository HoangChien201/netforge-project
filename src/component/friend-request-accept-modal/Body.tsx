import { Animated, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { getFriends, getRequest, getSuggest } from '../../http/QuyetHTTP';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLOR } from '../../constant/color';
import RequestList from './RequestList';
import WaitAcceptList from './WaitAcceptList';
import SuggestList from './SuggestList';
type Bob={
    reload:any,
    showModalFriend:any,
    setShowModalFriend:(value:boolean)=>void,
    setDot:(value:any)=>void, 
    setReload :(value:boolean)=>void,
}

const Body:React.FC<Bob> = ({reload, showModalFriend, setShowModalFriend, setDot, setReload }) => {
    const [textHeader, setTextHeader] = useState('Lời mời kết bạn');
    const [textShowRA, setTextShowRA] = useState('Lời mời');
    const [showRA, setShowRA] = useState(true);
    const [dataFriends, setDataFriends] = useState([]);
    const [dataRequest, setDataRequest] = useState([]);
    const [dataWaitAccept, setDataWaitAccept] = useState([]);
    const [dataSuggest, setDataSuggest] = useState([]);
    const [data,setData]=useState([]);
    const status1 = 1;
    const status2 = 2;
    const slideAnim = useRef(new Animated.Value(-500)).current; // Initial position off screen
    const slideAnim1 = useRef(new Animated.Value(-100)).current;
    useEffect(() => {
        getFriendList(status2);
        getRequestList(status1);
        getWaitAcceptList();
        getSuggestList();
    }, []);

    useEffect(() => {
        getFriendList(status2);
        getSuggestList();
    }, [dataFriends || dataRequest || dataSuggest || dataWaitAccept]);

    useEffect(() => {
        const total = dataRequest.length + dataWaitAccept.length;
        setDot(total);
        
        //
        const requestIds = new Set(dataRequest.map(request => request.user.id));
        const acceptIds = new Set(dataWaitAccept.map(accept => accept.user.id));

        const filteredData = dataSuggest.filter(suggest =>
            !requestIds.has(suggest.id) && !acceptIds.has(suggest.id)
        );

        setData(filteredData);
        //console.log('dữ liệu nè: ' +JSON.stringify(filteredData));
        
    }, [dataFriends, dataRequest, dataWaitAccept]);

    useEffect(() => {
        if (showModalFriend) {
            slideIn();
        } else {
            slideOut();
        }
    }, [showModalFriend]);
    // lấy danh sách bạn bè
    const getFriendList = async (status:number) => {
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
            //console.log('suggest: ' + JSON.stringify(result));
        } catch (error) {
            console.log(error);
        }
    };

    const getRequestList = async (num:number) => {
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
    const OpenCloseRA = () => {
        setShowRA(!showRA);
        if (showRA) {
           // setShowRA(false);
            setTextHeader('Yêu cầu đã gửi');
            setTextShowRA('Lời mời');
        } else {
           // setShowRA(true);
            setTextHeader('Lời mời kết bạn');
            setTextShowRA('Yêu cầu');
        }
    };

    const handleCloseModal = () => {
        slideOut();
        setTimeout(() => setShowModalFriend(false), 300); // Delay to match slide out animation
    };

    const ITEM_HEIGHT = 80; // Height of each list item
    const calculateHeight = (data:any) => {
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
                        <Animated.View style={[styles.listRA, { height: calculateHeight(dataWaitAccept), opacity: slideAnim1.interpolate({ inputRange: [0, 100], outputRange: [1, 0] }) }]}>
                            <WaitAcceptList dataWaitAccept={dataWaitAccept} setDataWaitAccept={setDataWaitAccept} setReload={setReload} />
                        </Animated.View>
                        :
                        <Animated.View style={[styles.listRA, { height: calculateHeight(dataRequest), opacity: slideAnim1.interpolate({ inputRange: [0, 100], outputRange: [1, 0] }) }]}>
                            <RequestList dataRequest={dataRequest} setDataRequest={setDataRequest} setReload={setReload} />
                        </Animated.View>
                    }
                    <View style={[{ height: calculateHeight(dataFriends), marginTop:15 }]}>
                        <SuggestList data={data} setData={setData} setReload={setReload} />
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
        marginStart: -80,
    },
    textShowRA: {
        fontSize: 18,
        color: COLOR.primary300,
        fontWeight: '500',
    },
    buttonShowRA: {
        marginEnd: 10,
        backgroundColor: COLOR.PrimaryColor1,
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
