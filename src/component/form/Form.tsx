import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Input from './Input';
import ButtonLogin from './ButtonLogin';
import { emailPattern } from '../../constant/valid';
import { regiter } from '../../http/userHttp/user';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { UserRootStackEnum } from '../stack/UserRootStackParams';

interface User {
  email: string;
  password: string;
  fullname: string;
  confirmpassword: string;
}

interface Valid {
  email: boolean;
  password: boolean;
  fullname: boolean;
  confirmpassword: boolean;
  emailError?: string;  // Thêm trường lỗi cho email
}

const Form = ({ setModal }: { setModal: (values: boolean) => void }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [valueF, setValueF] = useState<User>({
    email: "",
    password: "",
    fullname: "",
    confirmpassword: ""
  });
  const [valid, setValid] = useState<Valid>({
    email: true,
    password: true,
    fullname: true,
    confirmpassword: true
  });

  const onChangText = (key: keyof User, values: string) => {
    setValueF({
      ...valueF,
      [key]: values
    });
  };

  const submit = async () => {
    const { email, password, fullname, confirmpassword } = valueF;

    // Kiểm tra fullname không được để trống
    const fullnameValid = fullname.trim().length > 0;

    // Kiểm tra email theo pattern và không để trống
    const emailValid = emailPattern.test(email.trim());

    // Kiểm tra password không để trống
    const passwordValid = password.trim().length > 0;

    // Kiểm tra password confirmation khớp
    const passwordConfirmValid = password === confirmpassword;

    // Nếu có bất kỳ trường nào không hợp lệ, đặt state valid và dừng submit
    if (!fullnameValid || !emailValid || !passwordValid || !passwordConfirmValid) {
      setValid({
        email: emailValid,
        password: passwordValid,
        fullname: fullnameValid,
        confirmpassword: passwordConfirmValid
      });
      return;
    }

    try {
      // Gọi API đăng ký và xử lý kết quả
      const result = await regiter(email, password, fullname);

      if (result === undefined) {
    
        setValid(prev => ({
          ...prev,
          email: true,
          emailError: 'Email đã tồn tại ! vui lòng nhập email khác' 
        }));
        return;
      }
     


      setModal(true);
      setTimeout(() => {
        setModal(false);
        navigation.navigate(UserRootStackEnum.LoginScreen,{username:valueF.email,pass:valueF.password})
      }, 1000);
    } catch (error) {
      console.error(error);

    }
  };

  return (
    <View style={{marginTop:0}}>
      <Input
        invalid={!valid.fullname}
        label="Họ tên không được để trống"
        labels='Họ tên'
        value={valueF.fullname}
        onchangText={onChangText.bind(this, 'fullname')}
        iconP
      />
      <Input
        invalid={!valid.email}
        label="Vui lòng nhập đúng định dạng Email"
        labels='Email'
        value={valueF.email}
        onchangText={onChangText.bind(this, 'email')}
        iconE
      />
      {valid.emailError && <Text style={styles.errorText}>{valid.emailError}</Text>}
      <Input
        invalid={!valid.password}
        label="Mật khẩu không trùng khớp"
        labels='Mật khẩu'
        value={valueF.password}
        onchangText={onChangText.bind(this, 'password')}
        iconPass
        password
      />
      <Input
        invalid={!valid.confirmpassword}
        label="Mật khẩu không trùng khớp"
        labels='Nhập lại mật khẩu'
        value={valueF.confirmpassword}
        onchangText={onChangText.bind(this, 'confirmpassword')}
        iconPass
        password
      />
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <ButtonLogin chilren='Đăng kí' textColor='#fff' onPress={submit} />
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 0,
    marginLeft: 21,
    fontSize:10,fontWeight:"400", fontFamily: "poppins"
  },
});
