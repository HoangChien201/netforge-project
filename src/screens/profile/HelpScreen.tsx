import { StyleSheet, View,  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ModalBirtday from '../../birtday/ModalBirtday';
import Sound from 'react-native-sound';
import { FriendType } from '../../component/message/ModalNewMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../../component/store/store';

const HelpScreen = () => {
  const user = useSelector((state : RootState)=>state.user.value)
  const [friend, setFriend] = useState<Array<FriendType>>([])
  const [todayFriends, setTodayFriends] = useState<Array<FriendType>>([]);
  const [birthdaySound, setBirthdaySound] = useState(null);
  const [isVisibleBirtday, setIsVisibleBirtday] = useState(false);

  const navigation = useNavigation()
  const isFocus = useIsFocused()


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
    const userBirthday = new Date(user?.dateOfBirth)
    if (today.getDate() === userBirthday.getDate() &&
      today.getMonth() === userBirthday.getMonth()) {
      setIsVisibleBirtday(true);
      if (birthdaySound) {
        birthdaySound.play()

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