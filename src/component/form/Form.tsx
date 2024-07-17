import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Input from './Input';
import ButtonLogin from './ButtonLogin';
import { emailPattern } from '../../constant/valid';
import { regiter } from '../../http/userHttp/user';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

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
}

const Form = ({ setModal }: { setModal: (values: boolean) => void }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [valueF, setValueF] = useState<User>({
    email: "hoangduy@gmail.com",
    password: "123",
    fullname: "Lê Hoàng Duy",
    confirmpassword: "123"
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

    // Gọi API đăng ký và xử lý kết quả
    const result = await regiter(email, password, fullname);
    console.log(result);

    if (result) {
      setModal(true);
      setTimeout(() => {
        setModal(false);
        navigation.goBack();
      }, 1000);
    }
  };

  return (
    <View>
      <Input
        invalid={!valid.fullname}
        label="Fullname"
        value={valueF.fullname}
        onchangText={onChangText.bind(this, 'fullname')}
        iconP
      />
   
      
      <Input
        invalid={!valid.email}
        label="Email"
        value={valueF.email}
        onchangText={onChangText.bind(this, 'email')}
        iconE
      />
    
      
      <Input
        invalid={!valid.password}
        label="Password"
        value={valueF.password}
        onchangText={onChangText.bind(this, 'password')}
        iconPass
        password
      />
  
      
      <Input
        invalid={!valid.confirmpassword}
        label="Confirm Password"
        value={valueF.confirmpassword}
        onchangText={onChangText.bind(this, 'confirmpassword')}
        iconPass
        password
      />
   

      <View style={{ width: '100%',justifyContent:'center',alignItems:'center' }}>
        <ButtonLogin chilren='Đăng kí' textColor='#fff' onPress={submit} />
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 5,
    marginLeft: 10,
  },
});
