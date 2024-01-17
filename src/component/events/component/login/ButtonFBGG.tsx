import { Pressable, StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'


const ButtonFBGG = () => {
  return (
    <View>
      <View style={{alignItems:'center'}} >
        <Pressable style={styles.button}>
            <Image source={require('../../../../media/icon/Google.png')} />
            <Text style={{marginLeft:13}}>Login with Google</Text>
        </Pressable>
        <View style={{alignItems:'center'}} >
        <Pressable style={styles.button}>
            <Image source={require('../../../../media/icon/Facebook.png')} />
            <Text style={{marginLeft:13}}>Login with Facebook</Text>
        </Pressable>
      </View>
      <View style={styles.account}>
            <Text>Don't have an account? </Text>
            <Pressable><Text style={{color:'#3559E0'}}>Sign up</Text></Pressable>
      </View>
      </View>
    </View>
  )
}

export default ButtonFBGG

const styles = StyleSheet.create({
    button:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:300,
        backgroundColor:'#F5F7F8',
        borderRadius:12,
        height:50,
        
    },
    account:{
        flexDirection:'row',
        marginTop:25
    }
})