import { View, Text, StyleSheet, TextInput, Animated  } from "react-native"
import React, { useCallback, useState } from "react"
import { Image } from "react-native"
import Iconbutton from "../form/Iconbutton"
import { COLOR } from "../../constant/color"


type props = {
    label: string,
    value: string
    onchangText: (value: string) => void,
    requireField?: any,
    password?: boolean,
    iconE?: boolean,
    iconP?: boolean,
    iconPass?: boolean,
    invalid?:boolean

}

const InputLogin = (props: props) => {
    const { label, onchangText, value, requireField, password, iconE, iconP, iconPass, invalid } = props;
    const [hidePassword, setHidePassword] = useState<boolean | undefined>(password)

    const ref = React.useRef<TextInput>(null);

  console.log("2");
  
    const handleFocus = useCallback(() => {
        if (ref.current) {
            ref.current.setNativeProps({
            style: { borderColor: COLOR.primary200, borderBottomWidth: 1 } // Đặt màu border khi focus
          });
        }
       
      },[]);
    
      const handleBlur = useCallback(() => {
        if (ref.current) {
            ref.current.setNativeProps({
            style: { borderColor: 'black', borderBottomWidth: 1 } // Xóa màu border khi blur
          });
        }
      },[]);

    function Secure() {
        if (hidePassword) {
            setHidePassword(false);
        } else {
            setHidePassword(true);
        }
    }

    const EyePass = () =>{
        return(
            hidePassword ? <View style={{position:"absolute",end:10,top:45}}>
                <Iconbutton name='eye-slash' size={20} color='#DCDCDC' onPress={Secure}/>
            </View>:
             <View style={{position:"absolute",end:10,top:45}}>
             <Iconbutton name='eye' size={20} color='#DCDCDC' onPress={Secure}/>
         </View>
        )
    }

    const onchantext = (value: string) => {
        onchangText(value)
    }
    return (
        
        <View  style={[invalid && {margin:0},{margin:9}]}>
            <Text  style={[styles.label]}>{label} {requireField && <Text style={{color:"#C30052"}}>*</Text>}</Text>
            <TextInput  onFocus={handleFocus} onBlur={handleBlur} ref={ref} placeholder={"Enter"+" "+label} style={[styles.input,invalid && styles.validation]} secureTextEntry={hidePassword} value={value} onChangeText={onchantext} />
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
                }}>Vui lòng nhập đúng định dạng {label} !</Text>
            }
         
        </View>
    )
}
export default InputLogin

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
        height: 50,
        paddingLeft: 35,

    },
    label: {
        width: 80,
        height: 21,
        fontFamily: "poppins",
        fontWeight: "400",
        lineHeight: 21,
        fontSize: 14,
        letterSpacing: 0.12,
        marginVertical: 5,
        marginLeft:10,
        color:"black"
    },
    iconMail: {
        position: 'absolute',
        top: 45,
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