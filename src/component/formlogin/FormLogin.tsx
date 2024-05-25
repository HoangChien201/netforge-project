import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'


import { COLOR } from '../../constant/color'
import { emailPattern } from '../../constant/valid'

import ButtonLogin from '../form/ButtonLogin'
import InputLogin from './Input'
import Remember from './Remember'


interface user{
  email:string,
  password:string,

}
export type valid ={
  email:boolean,
  password:boolean,
}

const FormLogin= ({setModal}:{setModal:()=>void}) => {
  const [valueF,setValueF] = useState<user>({email:"hoangduy@gmail.com",password:"123"})
  const [valid,setValid] = useState<valid>({email:true,password:true})

  function onChangText(key:string,values:string){
    setValueF({
      ...valueF,
      [key]:values
    })
    
  }
    
  const submit = async ()=>{
      const {email,password} = {...valueF}
     
      
      let emailValues: boolean | string = email.trim();
      const isValid =  emailPattern.test(emailValues)
      emailValues = emailValues.includes('')

      let passwordValues:boolean | string = password.trim();
      passwordValues = passwordValues.length > 0;

      console.log("email",emailValues);
      console.log("pass",passwordValues);
      console.log("isvalid",isValid);
   

      if( !isValid || !passwordValues){
        setValid({email:isValid,password:passwordValues})
        console.log("ob",valid);
        
        return
      }
      setModal(true)
      setTimeout(() => {
        setModal(false)
      }, 1000);

      
  }
  return (
    <View>
    
      <InputLogin invalid={!valid.email} label="Email" value={valueF.email} onchangText={onChangText.bind(this,'email')} iconE />
      <InputLogin invalid={!valid.password} label="Password" value={valueF.password} onchangText={onChangText.bind(this,'password')} iconPass password={true} />
      <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
          <Remember/>
          <TouchableOpacity>
            <Text>Forgot password?</Text>
          </TouchableOpacity>

      </View>
      <View>
        <ButtonLogin textLogin chilren='Login' textColor='#fff' onPress={submit}/>
      </View>
    </View>
  )
}

export default FormLogin

const styles = StyleSheet.create({})