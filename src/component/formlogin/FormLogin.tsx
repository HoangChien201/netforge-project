import { Alert, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { COLOR } from '../../constant/color'
import { emailPattern } from '../../constant/valid'
import TouchId from './TouchId'
import ButtonLogin from '../form/ButtonLogin'
import InputLogin from './Input'
import Remember from './Remember'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { login } from '../../http/userHttp/user'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { UserRootStackEnum } from '../stack/UserRootStackParams'
import { onUserLogin, onUserLogout } from '../../screens/call-video/Utils'
import { useDispatch } from 'react-redux'
import { setUsers } from '../store/userSlice'

interface User {
  email: string,
  password: string,
}

export type Valid = {
  email: string | null,   // Error message or null
  password: string | null, // Error message or null
}

const FormLogin = ({ setModal, setStatus, setIsLoading }: { setModal: (value: boolean) => void, setStatus: (value: boolean) => void, setIsLoading: (value: boolean) => void }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [valueF, setValueF] = useState<User>({ email: 'tuong123@gmail.com', password: '1234' })
  const [valid, setValid] = useState<Valid>({ email: null, password: null })
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
    const { email, password } = { ...valueF };
    const trimmedEmail = email.trim();
    const isValidEmail = emailPattern.test(trimmedEmail);
    const trimmedPassword = password.trim();
    const isValidPassword = trimmedPassword.length > 0;

    if (!isValidEmail || !isValidPassword) {
      setValid({
        email: isValidEmail ? null : 'Email không hợp lệ !',
        password: isValidPassword ? null : 'Mật khẩu không được để trống !',
      });
      return;
    }

    setValid({ email: null, password: null });
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      const result = await login(email, password);

      if (result) {
        const { data } = result;
        const { id, avatar, fullname } = data;
        console.log('Login success', data);
        onUserLogin(id, fullname, avatar, navigation).then(() => {
          AsyncStorage.setItem('AccessToken', data.token);
          dispatch(setUsers(data));
        });
      }else{
        setValid({
          email: "Email không đúng !",
          password: 'Mật khẩu không đúng !',
        });
    

      }

      setIsLoading(false);
   
    } catch (error) {
      setIsLoading(false);
      setValid({
        email: null,
        password: 'Thông tin đăng nhập không chính xác !',
      });
      console.log("Login error", error);
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
          await AsyncStorage.setItem('userToken', result?.data.token);
          handleLoginResult(result);
        } catch (error) {
          console.log("Touch ID login error", error);
          setValid({ email: null, password: 'Touch ID đăng nhập thất bại' });
        }
      } else {
        ToastAndroid.showWithGravity(
          "Bạn cần đăng nhập trước",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    }
  };

  const handleLoginResult = (data: any) => {
    if (data) {
      AsyncStorage.setItem('token', data.token);
      setModal(true);
      setStatus(true);
      setTimeout(() => {
        setModal(false);
      }, 1000);
      dispatch(setUsers(data));
    } else {
      setModal(true);
      setStatus(false);
      setTimeout(() => {
        setModal(false);
      }, 1000);
    }
  };

  return (
    <View>
      <InputLogin invalid={!!valid.email} label="Email" value={valueF.email} onchangText={onChangText.bind(this, 'email')} iconE errorMessage={valid.email} />
      <InputLogin invalid={!!valid.password} label="Mật khẩu" value={valueF.password} onchangText={onChangText.bind(this, 'password')} iconPass password={true} errorMessage={valid.password} />
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

export default FormLogin;

const styles = StyleSheet.create({});
