import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {COLOR} from '../constant/color';
import {navigationType} from '../component/stack/UserStack';
import {emailPattern} from '../constant/valid';
import Loading from '../component/Modal/Loading';
import ButtonLogin from '../component/form/ButtonLogin';
import {UserRootStackEnum} from '../component/stack/UserRootStackParams';
import {NavigationProp, ParamListBase, RouteProp, useNavigation, useRoute,} from '@react-navigation/native';
import InputLogin from '../component/formlogin/Input';
import { resetPassword } from '../http/PhuHTTP';
import ModalPoup from '../component/Modal/ModalPoup';
import ModalFail from '../component/Modal/ModalFail';
import Icon from 'react-native-vector-icons/Ionicons';

interface resetPass {
    newPassword: string,
    confirmPassword: string,
}
export type valid = {
    newPassword: boolean,
    confirmPassword: boolean,
}

export const ResetPassword:React.FC = () => {
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const [isLoading,setIsLoading] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [status,setStatus] = useState(true);
    const [valueF, setValueF] = useState<resetPass>({ newPassword: "",confirmPassword: "" });
    const [valid, setValid] = useState<valid>({ newPassword: true , confirmPassword: true});
    
    const route: RouteProp<{ params: { email: string } }, 'params'> = useRoute();
    const { email } = route.params;

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
        //const token = await AsyncStorage.getItem('TokenForgot');
        const { newPassword, confirmPassword} = { ...valueF };
        let isValidNewPass = newPassword.trim().length > 0;
        let isValidConfirmPass = confirmPassword.trim() === newPassword.trim();

        setValid({
            newPassword: isValidNewPass,
            confirmPassword: isValidConfirmPass
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
                        navigation.navigate(UserRootStackEnum.LoginScreen);
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
        <View  style={styles.viewToolbar}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{alignItems:"center"}}>
                    <Icon name="arrow-back" size={24} color="#fff"  />
                </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: 75}}>    
        <View style={{position: 'absolute', right: 0, top: 0}}>
            <Image source={require('../media/Dicons/Ellipse.png')} />
        </View>
        <View style={[styles.viewAll]}>
            <Text style={styles.txt1}>Cập nhập mật khẩu mới</Text>
        </View>
        </View>
        <KeyboardAvoidingView style={styles.viewContent}>
        <Loading isLoading= {isLoading}/>
        <View>
            <View style={{marginTop: 16}}>
                <Text style={styles.txt2}>
                    Vui lòng cập nhập lại mật khẩu mới của bạn.</Text>   
            </View>
                {/* <InputLogin invalid={!valid.oldPassword} label="Mật khẩu cũ" value={valueF.oldPassword} onchangText={onChangText.bind(this, 'oldPassword')} iconPass password={true} /> */}
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
      </KeyboardAvoidingView>
      {status ? (
            <ModalPoup text="Đặt lại mật khẩu thành công!" visible={showModal} />
        ) : (
            <ModalFail text="Đặt lại mật khẩu thất bại!" visible={showModal} />
            )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: COLOR.PrimaryColor,
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
