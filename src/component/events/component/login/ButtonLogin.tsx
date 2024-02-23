import { StyleSheet, Text, View ,TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { navigationType } from '../../../navigation/ManageNavigation'
import { UserRootStackEnum } from '../../../stack/UserRootStackParams'
import { useMyContext } from '../../../navigation/UserContext'


const ButtonLogin = ({text,navigation,onSubmit}:{text:string,navigation:navigationType,onSubmit:any}) => {
  //setuser vào context
  return (
    <View style={{justifyContent:'center',display:'flex',alignItems:'center'}}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onSubmit}>
        <Text style={styles.text}>{text}</Text>
        <Image style={{position:'absolute',end:10}} source={require('../../../../media/icon/Next.png')}/>
      </TouchableOpacity>
      
      
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
        height:58,
        borderRadius:12
    },
    text:{
      color:'#fff',
      fontWeight:'500',
      fontSize:16
    }
})