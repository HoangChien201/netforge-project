import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { navigationType } from '../../navigation/ManageNavigation'
import TextLogin from '../component/login/TextLogin'
import TextInputLogin from '../component/login/TextInputLogin'
import Remember from '../component/login/Remember'
import ButtonLogin from '../component/login/ButtonLogin'
import ButtonFBGG from '../component/login/ButtonFBGG'
import { SignIn } from '../../../http/user/UserHTTP'
import { useMyContext } from '../../navigation/UserContext'
import Loading from '../component/ui/Loading'

interface typeLogin {

}

export default function LoginScreen({ navigation }: { navigation: navigationType }) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [isLoading, setIsLoading] = useState(false)
  //setuser vào context
  const { setUser } = useMyContext();


  async function onSubmit() {
    setIsLoading(true)
    try {
      if (!email || !password) {
        Alert.alert("Nhập chưa đủ trường")
        setIsLoading(false)

      }
      else {
        const response = await SignIn(email, password)
        setUser(response.data)
        console.log(response.data);
        navigation.goBack()

        setIsLoading(false)

      }
    } catch (error) {
      setIsLoading(false)

    }

  }

  function updateValue(type: string, value: string) {

    if (type === 'email') {
      setEmail(value)
    }
    else if (type === 'password') {
      setPassword(value)
    }
  }

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={require('../../../media/icon/logo-main.jpg')}></Image>
        </View>
        <TextLogin text='Đăng nhập' />
        <TextInputLogin email={email} password={password} updateValue={updateValue} />
        {/* <Remember /> */}
        <ButtonLogin text='Đăng nhập' navigation={navigation} onSubmit={onSubmit} />
        {/* <Text style={{textAlign:'center',marginTop:30,marginBottom:30}}>OR</Text> */}
        {/* <ButtonFBGG text='Sign up'/> */}
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24
  },
  container: {
    marginHorizontal: 24,
    marginVertical: 24
  }

})