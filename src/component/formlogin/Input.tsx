import { View, Text, StyleSheet, TextInput } from "react-native"
import React, { useState } from "react"
import { Image } from "react-native"
import Iconbutton from "./Iconbutton"

type props = {
    label: string,
    value: string
    onchangText: (value: string) => void,
    requireField?: any,
    password?: boolean,
    iconE?: boolean,
    iconP?: boolean,
    iconPass?: boolean,
    invalid?:boolean,
    labels?:string

}

const Input = (props: props) => {
    const { labels,label, onchangText, value, requireField, password, iconE, iconP, iconPass, invalid } = props;
    const [hidePassword, setHidePassword] = useState<boolean | undefined>(password)

    function Secure() {
        if (hidePassword) {
            setHidePassword(false);
        } else {
            setHidePassword(true);
        }
    }

    const EyePass = () =>{
        return(
            hidePassword ? <View style={{position:"absolute",end:10,top:20}}>
                <Iconbutton name='eye-slash' size={20} color='#DCDCDC' onPress={Secure}/>
            </View>:
             <View style={{position:"absolute",end:10,top:20}}>
             <Iconbutton name='eye' size={20} color='#DCDCDC' onPress={Secure}/>
         </View>
        )
    }

    const onchantext = (value: string) => {
        onchangText(value)
    }
    return (
        <View style={[invalid && {margin:0},{margin:9}]}>
            {/* <Text style={[styles.label]}>{label} {requireField && <Text style={{color:"#C30052"}}>*</Text>}</Text> */}
            <TextInput placeholder={"Nhập"+" "+labels} style={[styles.input,invalid && styles.validation]} secureTextEntry={hidePassword} value={value} onChangeText={onchantext} />
            {iconE && <Image style={styles.iconMail} source={require('../../media/icon/Mail.png')} />}
            {iconPass && <Image style={styles.iconMail} source={require('../../media/icon/Password.png')} />}
            {iconP && <Image style={{
                position: 'absolute',
                top: 22,
                start: 10,
                width:15,
                height:15
            }} source={require('../../media/Dicons/user.png')} />}
            {
                password && <EyePass/>
            }
            {
                invalid && <Text style={{fontSize:10,position:"absolute",bottom:-15,left:10,color:"red",fontWeight:"400", fontFamily: "poppins"
                }}> {label} !</Text>
            }
         
        </View>
    )
}
export default Input

const styles = StyleSheet.create({
    input: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        height: 60,
        paddingLeft: 35,
        backgroundColor:'#F5F5F5'
    },
    label: {
        width: 80,
        height: 21,
        fontFamily: "poppins",
        fontWeight: "400",
        lineHeight: 21,
        fontSize: 14,
        letterSpacing: 0.12,
        marginVertical: 5
    },
    iconMail: {
        position: 'absolute',
        top: 19,
        start: 10
    },
  validation:{
        borderRadius: 6,
        borderColor:"#C30052",
        borderWidth:1,
        height: 60,
        paddingLeft: 35,
    }
})
  