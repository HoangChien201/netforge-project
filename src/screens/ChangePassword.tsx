import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { COLOR } from '../constant/color';
import ModalFail from '../component/Modal/ModalFail';
import ModalPoup from '../component/Modal/ModalPoup';
import ButtonLogin from '../component/form/ButtonLogin';
import InputLogin from '../component/formlogin/Input';
import Loading from '../component/Modal/Loading';
import { resetPassword } from '../http/PhuHTTP';
import { useMyContext } from '../component/navigation/UserContext';

interface resetPass {
    newPassword: string,
    confirmPassword: string,
    oldPassword: string
}
export type valid = {
    newPassword: boolean,
    confirmPassword: boolean,
    oldPassword: boolean,
}

const ChangePassword = () => {
  const navigation = useNavigation()
  const isFocus = useIsFocused()
  const {user} = useMyContext();
  const email = user.email;
//   const stPassword = await AsyncStorage.getItem('password');
//   console.log(stPassword)

  useEffect(() => {
    if (isFocus) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        }
      });
    }
  }, [isFocus]);


  const [isLoading,setIsLoading] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [status,setStatus] = useState(true);
    const [valueF, setValueF] = useState<resetPass>({ newPassword: "",confirmPassword: "" , oldPassword: ""});
    const [valid, setValid] = useState<valid>({ newPassword: true , confirmPassword: true, oldPassword:true});
    

    function onChangText(key: string, values: string) {
        setValueF({
            ...valueF,
            [key]: values 
        })
    }

    const showModalFalse =() => {
        setShowModal(true);
        setStatus(false);
        setTimeout(() => {
            setShowModal(false);
            setIsLoading(false);
        }, 2000);
    }

    const handleChangePassword = async() => {
        const { newPassword, confirmPassword, oldPassword} = { ...valueF };
        let isValidNewPass = newPassword.trim().length > 0;
        let isValidConfirmPass = confirmPassword.trim() === newPassword.trim();
        let isValidOldPassword = oldPassword.trim().length > 0;
        setValid({
            newPassword: isValidNewPass,
            confirmPassword: isValidConfirmPass,
            oldPassword: isValidOldPassword,
        });

        if (isValidNewPass && isValidConfirmPass) {
            try {
                const response = await resetPassword(confirmPassword, email);
                setIsLoading(true);
                if (response) {
                    setShowModal(true);
                    setStatus(true);
                    setIsLoading(false);
                    setTimeout(() => {
                        setShowModal(false);
                        // navigation.navigate(UserRootStackEnum.LoginScreen);
                    }, 2000);
                } else {
                    showModalFalse();
                }
            } catch (error) {
                showModalFalse();
            }
        }
        
    }

    return (
    <View style={styles.container}>
        
        <Loading isLoading= {isLoading}/>
        <View>
            <View style={{marginTop: 16}}>
                {/* <Text style={styles.txt2}>
                    Vui lòng cập nhập lại mật khẩu mới của bạn.</Text>    */}
            </View>
                <InputLogin invalid={!valid.oldPassword} label="Mật khẩu cũ" value={valueF.oldPassword} onchangText={onChangText.bind(this, 'oldPassword')} iconPass password={true} />
                <InputLogin invalid={!valid.newPassword} label="Mật khẩu mới" value={valueF.newPassword} onchangText={onChangText.bind(this, 'newPassword')} iconPass password={true} />
                <InputLogin invalid={!valid.confirmPassword} label="Xác nhận lại mật khẩu mới" value={valueF.confirmPassword} onchangText={onChangText.bind(this, 'confirmPassword')} iconPass password={true} />
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingVertical: 20,
          }}></View>
        <View style={styles.btnResetPass}>
          <ButtonLogin
            textLogin
            chilren="Cập nhập"
            textColor="#fff"
            onPress={handleChangePassword}
          />
        </View>
      {/* </KeyboardAvoidingView> */}
      {status ? (
            <ModalPoup text="Đặt lại mật khẩu thành công!" visible={showModal} />
        ) : (
            <ModalFail text="Đặt lại mật khẩu thất bại!" visible={showModal} />
            )}
    </View>
  );
};

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: "#ffff",
        padding: 18 
    },
    viewAll: {
        flex: 1,
    },
    viewContent: {
        backgroundColor: "#ffff", 
        flex: 1, 
        borderTopEndRadius: 30, 
        borderTopStartRadius: 30, 
        padding: 18
    },
    txt1: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 36,
        paddingLeft:30
    },
    txt2: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#4e4b66'
    },
    image: {
        width: 20,
        height: 15,
        tintColor: "white"
    },
    viewToolbar: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingTop:20,
    },
    btnResetPass: {
        alignItems:'center'
    }
});
