import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Tittle from '../component/otp/Tittle'
import { OtpInput } from 'react-native-otp-entry';
import ButtonLogin from '../component/login/ButtonLogin';

const OtpScreen = () => {
    const myRef = useRef(null);
    const [textOTP,setTextOTP] = useState<string>('')
    const [number,setNumber] = useState<number>(60)
    useEffect(()=>{
       const time= setTimeout(()=>{
            setNumber(pre=>pre-1)
            
        },1000);
        if(!time) clearTimeout(time)
    },[number])
    

    
    const content = "We're send you the verification code on +1 2624 345384"
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../../../media/icon/Back.png')} />
            </View>
            <Tittle title='Verification' content={content} />
            <View style={{marginTop:20}}>
                <OtpInput numberOfDigits={4}
                    focusColor="black"
                    focusStickBlinkingDuration={500}
                    onTextChange={(text) =>setTextOTP(text) }
                    onFilled={(text) => console.log(`OTP is ${text}`)}
                    theme={{
                        pinCodeContainerStyle: styles.pinCodeContainer,
                    }}
                />

            </View>
            <ButtonLogin text='CONTINUE'/>
            <View style={styles.number}>
                <Text>Re-send code in</Text>
                <Text style={{color:number > 0?'blue':'red',marginLeft:5}}>0:{number}</Text>
            </View>
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
        width:'20%'
    },
    number:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:25
    }
})