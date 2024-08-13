import { StyleSheet, View,  } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModalBirtday from '../../birtday/ModalBirtday';
import Sound from 'react-native-sound';
import { useSelector } from 'react-redux';
import { RootState } from '../../component/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalShowBirthday = () => {
  
  const user = useSelector((state : RootState)=>state.user.value)
  const [birthdaySound, setBirthdaySound] = useState(null);
  const [isVisibleBirtday, setIsVisibleBirtday] = useState(false);

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


  return (
    <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
      <ModalBirtday IsVisible={isVisibleBirtday} onClose={() => {
        if (birthdaySound) {
          birthdaySound.stop()
        }
        AsyncStorage.setItem(`isShowBirthday-${user?.id}`, 'true');
        setIsVisibleBirtday(false)
      }} />
     
    </View>
  )
}

export default ModalShowBirthday
