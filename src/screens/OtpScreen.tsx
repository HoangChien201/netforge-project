import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
// import Tittle from '../component/otp/Tittle'
import { OtpInput } from 'react-native-otp-entry';
import ButtonLogin from '../component/form/ButtonLogin';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { UserRootStackEnum } from '../component/stack/UserRootStackParams';
import { checkOTP } from '../http/PhuHTTP';
import Loading from '../component/Modal/Loading';
import ModalPoup from '../component/Modal/ModalPoup';
import ModalFail from '../component/Modal/ModalFail';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ButtonLogin from '../component/login/ButtonLogin';



const OtpScreen = () => {
    const myRef = useRef(null);
    const [textOTP,setTextOTP] = useState<string>('')
    const [number,setNumber] = useState<number>(600)
    console.log("otp ne",textOTP);
    
    
    // useEffect(()=>{
    //    const time= setTimeout(()=>{
    //         setNumber(pre=>pre-1)
            
    //     },1000);
    //     if(!time) clearTimeout(time)
    // },[number])
   
   
    const [isLoading,setIsLoading] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [status,setStatus] = useState(true);
    const navigation:NavigationProp<ParamListBase> = useNavigation();

    const route = useRoute();
    
    

    const showModalFalse =() => {
        setShowModal(true);
        setStatus(false);
        setTimeout(() => {
            setShowModal(false);
            setIsLoading(false);
        }, 2000);
    }

    
    const handleVerifyOtp = async () => {
        const token = await AsyncStorage.getItem('TokenForgot');
        console.log("check token",token);
        // const otpValue = otp.join('');
        
            try {
                const response = await checkOTP( parseInt(textOTP), token);
                console.log("textOtp",textOTP);
                setIsLoading(true);
                if (response) {
                    //const email = response.email;
                    setShowModal(true);
                    setStatus(true);
                    setIsLoading(false);
                    setTimeout(() => {
                        setShowModal(false);
                        navigation.navigate(UserRootStackEnum.ResetPassword);
                    }, 2000);
                } else {
                    showModalFalse();
                }
            } catch (error) {
                 showModalFalse();
                console.log(error);
            }
            
      
    };


    return (
        <View style={styles.container}>
            <Loading isLoading= {isLoading}/>

            <View>
                <Image source={require('../media/icon/Back.png')} />
            </View>
            {/* <Tittle title='Verification' content={content} /> */}
            <View style={{marginTop:20}}>
                <OtpInput numberOfDigits={5}
                    focusColor="black"
                    focusStickBlinkingDuration={500}
                    onTextChange={(text) =>setTextOTP(text) }
                    onFilled={(text) => console.log(`OTP is ${text}`)}
                    theme={{
                        pinCodeContainerStyle: styles.pinCodeContainer,
                    }}
                />

            </View>
            <ButtonLogin textLogin children='Xác nhận OTP' textColor='#fff' onPress={handleVerifyOtp} />
            <View style={styles.number}>
                <Text>Re-send code in</Text>
                <Text style={{color:number > 0?'blue':'red',marginLeft:5}}>0:{number}</Text>
            </View>
            {status ? (
            <ModalPoup text="OTP hợp lệ!" visible={showModal} />
        ) : (
            <ModalFail text="OTP không hợp lệ!" visible={showModal} />
            )}

        </View>
    )
}

export default OtpScreen

const styles = StyleSheet.create({
    container: {
        margin: 24,
        flex: 1,
        backgroundColor: '#fff'
    },
    pinCodeContainer:{
        width:'18%'
    },
    number:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:25
    }
})