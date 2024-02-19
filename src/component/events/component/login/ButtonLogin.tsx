import { StyleSheet, Text, View ,TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { navigationType } from '../../../navigation/ManageNavigation'
import { UserRootStackEnum } from '../../../stack/UserRootStackParams'
import { useMyContext } from '../../../navigation/UserContext'


const ButtonLogin = ({text,navigation}:{text:string,navigation:navigationType}) => {
  //setuser vào context
  const {setUser} = useMyContext();
  return (
    <View style={{justifyContent:'center',display:'flex',alignItems:'center'}}>
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>setUser("haha")}>
        <Text style={{color:'#fff'}}>{text}</Text>
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
        height:45,
        borderRadius:12
        
    }
})