import { StyleSheet, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'


import { emailPattern } from '../../constant/valid'
import TouchId from './TouchId'
import ButtonLogin from '../form/ButtonLogin'
import InputLogin from './Input'
import Remember from './Remember'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { login } from '../../http/userHttp/user'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { UserRootStackEnum } from '../stack/UserRootStackParams'
import { onUserLogin } from '../../screens/call-video/Utils'
import { useDispatch } from 'react-redux'
import { setUsers } from '../store/userSlice'


interface user {
  email: string,
  password: string,

}
export type valid = {
  email: boolean,
  password: boolean,
}


const FormLogin = ({ setModal, setStatus, setIsLoading }: { setModal: (value: boolean) => void, setStatus: (value: boolean) => void, setIsLoading: (value: boolean) => void }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [valueF, setValueF] = useState<user>({ email: 'hoangchien@gmail.com', password: '135790' })

  const [valid, setValid] = useState<valid>({ email: true, password: true })

  const dispatch = useDispatch();


  function onChangText(key: string, values: string) {
    setValueF({
      ...valueF,
      [key]: values
    })

  }

  const handleForgotPassword = () => {
    navigation.navigate(UserRootStackEnum.ForgotPassword);
  }


  const submit = async () => {
    //await AsyncStorage.clear();
    const { email, password } = { ...valueF };
    const trimmedEmail = email.trim();
    const isValidEmail = emailPattern.test(trimmedEmail);
    const trimmedPassword = password.trim();
    const isValidPassword = trimmedPassword.length > 0;

    if (!isValidEmail || !isValidPassword) {
      setValid({ email: isValidEmail, password: isValidPassword });
    } else {
      setValid({ email: true, password: true });
      setIsLoading(true);
      try {

        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        const result = await login(email, password);

        if (result) {
          const { data } = result
          handleLoginResult(data)
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setValid({ email: false, password: false });
        console.log("Login error", error);
      }
    }
  };

  const handleLoginResult = (data) => {
    if (data) {
      AsyncStorage.setItem('token', data.token);
      const { id, avatar, fullname } = data
      setModal(true);
      setStatus(true);
      setTimeout(() => {
        setModal(false);
      }, 1000);

      //login zego
      onUserLogin(id, fullname, avatar, navigation).then(() => {
        AsyncStorage.setItem('token', data.token);
        dispatch(setUsers(data))
      })

    } else {
      setModal(true);
      setStatus(false);
      setTimeout(() => {
        setModal(false);
      }, 1000);
    }
  };

  const handleAuthSuccess = async (isAuth: any) => {
    const stEmail = await AsyncStorage.getItem('email');
    const stPassword = await AsyncStorage.getItem('password');
    if (isAuth) {
      if (stEmail !== null && stPassword !== null) {
        const email = String(stEmail);
        const password = String(stPassword);
        try {
          const result = await login(email, password);
          await AsyncStorage.setItem('token', result?.data.token);
          handleLoginResult(result?.data);

        } catch (error) {
          console.log("Touch ID login error", error);
          console.log('email: ' + JSON.stringify(stEmail) + 'pass :' + JSON.stringify(stPassword));
        }
      } else {
        ToastAndroid.showWithGravity(
          "Bạn cần đăng nhập trước",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER)
      }
    }



  };
  return (
    <View>
      <InputLogin invalid={!valid.email} label="Email" value={valueF.email} onchangText={onChangText.bind(this, 'email')} iconE />
      <InputLogin invalid={!valid.password} label="Mật khẩu" value={valueF.password} onchangText={onChangText.bind(this, 'password')} iconPass password={true} />
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 12 }}>
        <Remember />

      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14 }}>
        <ButtonLogin textLogin chilren='Đăng nhập' textColor='#fff' onPress={submit} />
        <TouchId onAuthSuccess={handleAuthSuccess} />
      </View>
    </View>
  )
}

export default FormLogin

const styles = StyleSheet.create({})