import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ModalBirtday from '../../birtday/ModalBirtday';
import { useMyContext } from '../../component/navigation/UserContext';
import {getFriends } from '../../http/QuyetHTTP';
import { socket } from '../../http/SocketHandle';
import Sound from 'react-native-sound';
import { FlatList } from 'react-native-gesture-handler';
import { date } from 'yup';
import ItemBirthday from '../../birtday/ItemBirthday';

const HelpScreen = () => {
  const {user} = useMyContext();
  const [friend, setFriend] = useState([])
  const [todayFriends, setTodayFriends] = useState([]);
  const [birthdaySound, setBirthdaySound] = useState(null);
  const [isVisibleBirtday, setIsVisibleBirtday] = useState(false);

  const navigation = useNavigation()
  const isFocus = useIsFocused()
  // console.log('birt', birthdaySound);
  
  
  useEffect(()=>{
    getFriendAll()
    const sound = new Sound('happy_birthday.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Lỗi âm thanh', error);
        return;
      }
      setBirthdaySound(sound); // Lưu sound vào state
    });

    return () => {
      // Release sound resource when the component unmounts
      if (birthdaySound) {
        birthdaySound.release();
      }
    }
  },[])

// happy birthday to you
  useEffect(() => {
    const today = new Date()
    const userBirthday = new Date(user.dateOfBirth)
    if (today.getDate() === userBirthday.getDate() &&
    today.getMonth() === userBirthday.getMonth()) {
      console.log(today);
   setIsVisibleBirtday(true);
   if (birthdaySound) {
    birthdaySound.play()
    // console.log('nhac',birthdaySound);
    
  }
}
}, [birthdaySound]);
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
    const today = new Date();
    const friendsToday = friend.filter(friend => {
      const friendBirthday = new Date(friend.user.dateOfBirth);
      return today.getDate() === friendBirthday.getDate() && today.getMonth() === friendBirthday.getMonth();
    });

    friendsToday.forEach(friend => {
      const { id, fullname, avatar } = friend.user;
      console.log('Hôm nay là sinh nhật của', fullname);
      handleSendNotification(id, fullname, avatar);
    });

    setTodayFriends(friendsToday);
    console.log(friendsToday);
    
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
    // console.log('Sent notification data:', data);
  };

  return (
    <View style = {{backgroundColor: '#fff', width: '100%', height: '100%'}}>
      <ModalBirtday IsVisible={isVisibleBirtday} onClose = {()=>{
        setIsVisibleBirtday(false)
        if(birthdaySound){
          birthdaySound.stop()
        }}}/>
        <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#000', marginLeft: 12, top: 10}}>Hôm nay</Text>
         {
          todayFriends ? (
            <FlatList
        data={todayFriends}
        keyExtractor={(item) => item.user.id.toString()}
        renderItem={({ item }) => <ItemBirthday item={item} />} // Sử dụng component ItemBirthday
        />
          ) : (
            <View style = {{justifyContent: 'center', alignItems: 'center'}}> 
              <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Hôm nay không có sinh nhật</Text>
            </View>

          )
         }
    </View>
  )
}

export default HelpScreen

const styles = StyleSheet.create({})