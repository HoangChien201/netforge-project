import { StyleSheet, Text, View ,TouchableOpacity, Image} from 'react-native'
import React from 'react'


const ButtonLogin = () => {
  return (
    <View style={{justifyContent:'center',display:'flex',alignItems:'center'}}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={{color:'#fff'}}>SIGN IN</Text>
        <Image style={{position:'absolute',end:10}} source={require('../../../../media/icon/Next.png')}/>
      </TouchableOpacity>
      <Text style={{marginTop:30,marginBottom:30}}>OR</Text>
    </View>
  )
}

export default ButtonLogin

const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection:'row',
        marginTop:24,
        backgroundColor:'#525CEB',
        width:300,
        justifyContent:'center',
        alignItems:'center',
        height:45,
        borderRadius:12
        
    }
})