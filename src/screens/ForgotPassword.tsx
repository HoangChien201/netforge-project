import {
    StyleSheet, Text, View,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,
    Alert
} from 'react-native'
import React, { useState } from 'react'
import { sendMail } from '../http/PhuHTTP';
import { COLOR } from '../constant/color';
import InputLogin from '../component/formlogin/Input';
import { emailPattern } from '../constant/valid';
import Loading from '../component/Modal/Loading';
import ButtonLogin from '../component/form/ButtonLogin';
import { UserRootStackEnum } from '../component/stack/UserRootStackParams';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import ModalPoup from '../component/Modal/ModalPoup';
import ModalFail from '../component/Modal/ModalFail';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface user {
    email: string,
}
export type valid = {
    email: boolean,
}

const ForgotPassword:React.FC = () => {
    const navigation:NavigationProp<ParamListBase> = useNavigation();
    const [isLoading,setIsLoading] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [status,setStatus] = useState(true);
    const [valueF, setValueF] = useState<user>({ email: ""});
    const [valid, setValid] = useState<valid>({ email: true});
    function onChangText(key: string, values: string) {
        setValueF({
        ...valueF,
        [key]: values
    });
    }

    const showModalFalse =() => {
        setShowModal(true);
        setStatus(false);
        setTimeout(() => {
            setShowModal(false);
            setIsLoading(false);
            navigation.navigate(UserRootStackEnum.ForgotPassword);
        }, 2000);
    }

    const handelSendMail = async () => {
        const { email} = { ...valueF };
        const trimmedEmail = email.trim();
        const isValidEmail = emailPattern.test(trimmedEmail);
        if (!isValidEmail) {
            setValid({ email: isValidEmail});
        } else {
            setValid({ email: true});
            setIsLoading(true);
            try {
                const response= await sendMail(email);
                console.log(response.token);
                const token = response.token; 
         await AsyncStorage.setItem('TokenForgot',token)
                if (response) {
                    setShowModal(true);
                    setStatus(true);
                    setIsLoading(false);
                    setTimeout(() => {
                        setShowModal(false);
                        navigation.navigate(UserRootStackEnum.OtpScreen);
                    }, 2000);
                }
            } catch (error: any) {
                if (error.response && error.response.status === 404) {
                    showModalFalse();
                } else {
                    showModalFalse();
                }
                console.log("Error sending mail:", error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <View  style={styles.viewToolbar}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{flexDirection:"row",alignItems:"center"}}>
                    <Image  source={require("../media/Dicons/back.png")} style={styles.image} />
                        <Text style={{ color: "white" }}>Back</Text>
                </TouchableOpacity>
            </View>
        <View style={{ flexDirection: "row", paddingVertical: 75 }}>
            <View style={{position:"absolute",right:0,top:0}}>
                <Image source={require('../media/Dicons/Ellipse.png')}/>
            </View>
            <View style={[styles.viewAll]}>
                <Text style={styles.txt1}>Bạn quên mật khẩu?</Text>
            </View>
        </View>
        <KeyboardAvoidingView style={styles.viewContent}>
            <Loading isLoading= {isLoading}/> 
            <View>
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.txt2}>
                        Vui lòng nhập địa chỉ email của bạn để thiết lập lại mật khẩu.</Text>
                </View>
                <InputLogin invalid={!valid.email} label="Email" value={valueF.email} 
                    onchangText={onChangText.bind(this, 'email')} 
                    iconE />
            </View>
            <View style={{flexDirection:'column',justifyContent:'space-between',paddingVertical:20}}>
            </View>
            <View style={styles.btnSendMail}>
                <ButtonLogin textLogin children='Gửi email' textColor='#fff' onPress={handelSendMail} />
            </View>
        </KeyboardAvoidingView>
        {status ? (
                    <ModalPoup text="Đã gửi email!" visible={showModal} />
                ) : (
                    <ModalFail text="Gửi email thất bại!" visible={showModal} />
                )}
    </View>
    )
}

export default ForgotPassword

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
    btnSendMail: {
        
    }
    
})

