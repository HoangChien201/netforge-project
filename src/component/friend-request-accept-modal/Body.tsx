import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSuggest, getRequest, getWaitAccept } from '../../http/QuyetHTTP'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLOR } from '../../constant/color'
import RequestList from './RequestList'
import WaitAcceptList from './WaitAcceptList'
import SuggestList from './SuggestList'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Body = ({ showModalFriend, setShowModalFriend ,setDot, setReload}) => {
    const [textHeader, setTextHeader] = useState('Yêu cầu kết bạn');
    const [textShowRA, setTextShowRA] = useState('Lời mời');
    const [showRA, setShowRA] = useState(true);
    const [dataSuggest, setDataSuggest] = useState([]);
    const [dataRequest, setDataRequest] = useState([]);
    const [dataWaitAccept, setDataWaitAccept] = useState([]);
    let viewHeight = dataSuggest.length > 5 ? 500 : 250;

    const getSuggestList = async () => {
        try {
            const result = await getSuggest();
            setDataSuggest(result)
        } catch (error) {
            console.log(error);

        }
    };
    const getRequestList = async () => {
        try {
            const result = await getRequest();
            setDataRequest(result)
        } catch (error) {
            console.log(error);

        }
    };
    const getWaitAcceptList = async () => {
        try {
            const result = await getWaitAccept();
            setDataWaitAccept(result)
        } catch (error) {
            console.log(error);

        }
    };
    useEffect(() => {
        getSuggestList();
        getRequestList();
        getWaitAcceptList();
        setReload
    }, [setReload]);
    useEffect(() => {
        const total =  dataRequest.length + dataWaitAccept.length;
        setDot(total);
    }, [dataSuggest, dataRequest, dataWaitAccept]); 
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
        setShowModalFriend(false);
    };
    return (
        <Modal style={styles.container} animationType="slide" visible={showModalFriend}>

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
                <View style={[styles.listRA, { height: viewHeight }]}>
                    {showRA ? <WaitAcceptList dataWaitAccept={dataWaitAccept} setDataWaitAccept={setDataWaitAccept} setReload={setReload}/> : <RequestList dataRequest={dataRequest} setDataRequest={setDataRequest} setReload={setReload}/>}
                </View>

                <View>
                    <SuggestList dataSuggest={dataSuggest} setDataSuggest={setDataSuggest} setReload={setReload} />
                </View>
            </ScrollView>
        </Modal>
    )
}

export default Body

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    header: {
        backgroundColor: COLOR.PrimaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40
    },
    buttonCloseModal: {
        height: 24,
        width: 24,
        marginStart: 5
    },
    textHeader: {
        fontSize: 20,
        color: COLOR.primary300,
        fontWeight: '400',
        marginStart: -80

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
        justifyContent: 'center'
    },
    listRA: {
        alignItems: 'center',
    },
    dot:{
        height:5,
        width:5,
        position:'absolute',
        end:10,
        top:5,
        backgroundColor:'red',
        borderRadius:5
    }



})