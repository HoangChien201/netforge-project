import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import ButtonLogin from './ButtonLogin'
import { COLOR } from '../../constant/color'
import { emailPattern } from '../../constant/valid'
import { regiter } from '../http/userHttp/user'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'

interface user{
  email:string,
  password:string,
  fullname:string,
  confirmpassword:string
}
export type valid ={
  email:boolean,
  password:boolean,
  fullname:boolean,
  confirmpassword:boolean
}

const Form= ({setModal}:{setModal:(values:boolean)=>void}) => {
  const navigation:NavigationProp<ParamListBase> = useNavigation();
  const [valueF,setValueF] = useState<user>({email:"hoangduy@gmail.com",password:"123",fullname:"Lê Hoàng Duy",confirmpassword:"123"})
  const [valid,setValid] = useState<valid>({email:true,password:true,fullname:true,confirmpassword:true})

  function onChangText(key:string,values:string){
    setValueF({
      ...valueF,
      [key]:values
    })
    
  }
    
  const submit = async ()=>{
      const {email,password,fullname,confirmpassword} = {...valueF}
      let fullnameValues:boolean | string = fullname.trim();
      fullnameValues = fullnameValues.includes('');
      
      let emailValues: boolean | string = email.trim();
      const isValid =  emailPattern.test(emailValues)
      emailValues = emailValues.includes('')

      let passwordValues:boolean | string = password.trim();
      passwordValues = passwordValues.length > 0;

      console.log("email",emailValues);
      console.log("pass",passwordValues);
      console.log("isvalid",isValid);
      console.log("fullnameValues",fullnameValues);

      const passwordconfirm = password === confirmpassword
      console.log("com",passwordconfirm);
      
      

      if( !passwordconfirm || !isValid || !emailValues || !passwordValues || !fullnameValues){
        setValid({email:isValid,password:passwordValues,fullname:fullnameValues,confirmpassword:passwordconfirm})
        console.log("ob",valid);
        
        return
      }

      const result = await regiter(email,fullname,password);
      console.log(result);
      
      if(result){
        setModal(true)
        setTimeout(() => {
          setModal(false)
          navigation.goBack()
        }, 1000);
      
        console.log("hihi"); 
      }


      
  }
  return (
    <View>
      <Input invalid={!valid.fullname} label="Fullname" value={valueF.fullname} onchangText={onChangText.bind(this,'fullname')} iconP />
      <Input invalid={!valid.email} label="Email" value={valueF.email} onchangText={onChangText.bind(this,'email')} iconE />
      <Input invalid={!valid.password} label="Password" value={valueF.password} onchangText={onChangText.bind(this,'password')} iconPass password={true} />
      <Input invalid={!valid.confirmpassword} label="Confirm Password" value={valueF.confirmpassword} onchangText={onChangText.bind(this,'confirmpassword')} iconPass password={true} />
      <View>
        <ButtonLogin chilren='Sign Up' textColor='#fff' onPress={submit}/>
      </View>
    </View>
  )
}

export default Form

const styles = StyleSheet.create({})