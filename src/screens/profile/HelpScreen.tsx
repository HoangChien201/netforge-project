import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ModalBirtday from '../../birtday/ModalBirtday';
import { useMyContext } from '../../component/navigation/UserContext';
import { getFriends } from '../../http/QuyetHTTP';
import { socket } from '../../http/SocketHandle';
import Sound from 'react-native-sound';
import { FlatList } from 'react-native-gesture-handler';
import { date } from 'yup';
import ItemBirthday from '../../birtday/ItemBirthday';
import { FriendType } from '../../component/message/ModalNewMessage';

const HelpScreen = () => {
  const { user } = useMyContext();
  const [friend, setFriend] = useState<Array<FriendType>>([])
  const [todayFriends, setTodayFriends] = useState<Array<FriendType>>([]);
  const [birthdaySound, setBirthdaySound] = useState(null);
  const [isVisibleBirtday, setIsVisibleBirtday] = useState(false);

  const navigation = useNavigation()
  const isFocus = useIsFocused()
  // console.log('birt', birthdaySound);


  useEffect(() => {
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
  }, [])

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
    if (isFocus) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        }
      });
    }
  }, [isFocus]);

  return (
    <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
      <ModalBirtday IsVisible={isVisibleBirtday} onClose={() => {
        setIsVisibleBirtday(false)
        if (birthdaySound) {
          birthdaySound.stop()
        }
      }} />
     
    </View>
  )
}

export default HelpScreen

const styles = StyleSheet.create({})