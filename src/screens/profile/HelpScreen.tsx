import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ModalBirtday from '../../birtday/ModalBirtday';
import { useMyContext } from '../../component/navigation/UserContext';
import {getFriends } from '../../http/QuyetHTTP';
import { socket } from '../../http/SocketHandle';

const HelpScreen = () => {
  const {user} = useMyContext();
  const [friend, setFriend] = useState([])
  const [isVisibleBirtday, setIsVisibleBirtday] = useState(false);
  const navigation = useNavigation()
  const isFocus = useIsFocused()
  useEffect(()=>{
    getFriendAll()
  },[])

// happy birthday to you
  useEffect(() => {
    const today = new Date()
    const userBirthday = new Date(user.dateOfBirth)
    if (today.getDate() === userBirthday.getDate() &&
    today.getMonth() === userBirthday.getMonth()) {
      console.log(today);
   setIsVisibleBirtday(true);
   console.log('hehe');
}
}, []);
  useEffect(() => {
    if(isFocus){
      navigation.getParent()?.setOptions({
          tabBarStyle: {
              display: 'none',
          }
      });
    }
}, [isFocus]);
//happy birthday friend
  useEffect(() => {
    friend.forEach(friend => {
      const birthday = new Date()
      const friendBirthday = new Date(friend.user.dateOfBirth)
      const id = friend.user.id;
      const fullname = friend.user.fullname;
      const avatar = friend.user.avatar;
      if(birthday.getDate() == friendBirthday.getDate() && birthday.getMonth() == friendBirthday.getMonth()){
        console.log('Hôm nay là sinh nhật của', friend.user.fullname);
        handleSendNotification(id,fullname,avatar);
      }
    });
  }, [friend]);

// get all friends
  const getFriendAll = async() => {
    try {
      const result = await getFriends(2)
      setFriend(result)
      
    } catch (error) {
      console.log('Lỗi khi lấy danh sách bạn bè', error);
    }
  }

  const handleSendNotification = (id,fullname,avatar) => {
    const data = {
      type:7,
      idF:id,
      userInfo: {
        receiver:user.id,
        sender: user.id,
        fullname:fullname,
        avatar: avatar,
      }
    }
    // sendNCommentPost(data)
    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };

  return (
    <View style = {{}}>
      <ModalBirtday IsVisible={isVisibleBirtday} onClose = {()=>{setIsVisibleBirtday(false)}}/>
    </View>
  )
}

export default HelpScreen

const styles = StyleSheet.create({})