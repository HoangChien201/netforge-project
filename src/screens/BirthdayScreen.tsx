import { Modal, Pressable, StyleSheet, Text, View, } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons'

import ItemBirthday from '../birtday/ItemBirthday';
import { socket } from '../http/SocketHandle';
import { FriendType } from '../component/message/ModalNewMessage';
import { getFriends } from '../http/QuyetHTTP';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { RootState } from '../component/store/store';


const BirthDayScreen = ({ visible, setVisible }: { visible: boolean, setVisible: any }) => {
    const user = useSelector((state:RootState)=>state.user.value)
    const [friend, setFriend] = useState<Array<FriendType>>([])
    const [todayFriends, setTodayFriends] = useState<Array<FriendType>>([]);

    const navigation = useNavigation()
    const isFocus = useIsFocused()

    useEffect(() => {
        if (isFocus) {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: 'none',
                }
            });
        }
    }, [isFocus]);
    useFocusEffect(
        useCallback(()=>{
            getFriendAll()
        },[visible == true])
    )
    

    //happy birthday friend
    useEffect(() => {
        const today = new Date();
        const friendsToday = friend.filter(friend => {
            const friendBirthday = new Date(friend.user.dateOfBirth);
            return today.getDate() === friendBirthday.getDate() && today.getMonth() === friendBirthday.getMonth();
            
        });

        //sendnotifi

        // friendsToday.forEach(friend => {
        //   const { id, fullname, avatar } = friend.user;
        //   console.log('Hôm nay là sinh nhật của', fullname);
        //   handleSendNotification(id, fullname, avatar);
        // });
        setTodayFriends(friendsToday);

    

    }, [friend]);



    // get all friends
    const getFriendAll = async () => {
        try {
            const result = await getFriends(2)
            setFriend(result)

        } catch (error) {
            console.log('Lỗi khi lấy danh sách bạn bè', error);
        }
    }

    const handleSendNotification = (id, fullname, avatar) => {
        const data = {
            type: 7,
            idF: id,
            userInfo: {
                receiver: user.id,sender: user.id,
                fullname: fullname,
                avatar: avatar,
            }
        }
        // sendNCommentPost(data)
        socket.emit('notification', data);
    };

    return (
        <Modal
            animationType='slide'
            style={styles.modal}
            visible={visible}
        >
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative', height: 50, backgroundColor: '#fff' }}>
            <Pressable onPress={()=>setVisible(false)} style={{ position: 'absolute', left: 15 }}>
            <Ionicon name='arrow-back' size={24} color={'#000'} />
            </Pressable>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#000' }}>Sinh nhật</Text>
            </View>
        </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginLeft: 12, top: 10 }}>Hôm nay</Text>
                {
                    todayFriends.length > 0 ? (
                        <FlatList
                            data={todayFriends}
                            keyExtractor={(item) => item.user.id.toString()}
                            renderItem={({ item }) => <ItemBirthday item={item} />} // Sử dụng component ItemBirthday
                        />
                    ) : (
                        <View style = {{justifyContent: 'center', alignItems: 'center', top: 150}}>
                            <FastImage style={{ width: 120, height: 120 }} source={require('../media/icon_tuong/cake-birthday.gif')} />
                            <Text style = {{fontSize: 18, fontWeight: '700', marginTop: 5}}>Hôm nay không có sinh nhật</Text>
                        </View>
                    )
                }
             
            </View>
        </Modal>
    )
}

export default BirthDayScreen

const styles = StyleSheet.create({
    modal:{

    },
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
    },
    toolbar: {
        width: '100%',
        height: 55,
        justifyContent:"center",
        padding:14
    }
})