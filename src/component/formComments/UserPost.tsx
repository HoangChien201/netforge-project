import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { navigationType } from '../../component/stack/UserStack'


const UserPost = () => {
    const navigation = useNavigation<navigationType>()
  return (
    <View>
       <View style = {styles.UserContai}>
           <View style = {styles.ViewUser}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Image source={require('../../media/icon_tuong/back.png')} style = {styles.IconBack}/>
            </TouchableOpacity>
            
            <Image source={require('../../media/icon_tuong/imagecuatoi.jpg')} style = {styles.imageUser}/>
            <View style = {styles.ViewNameUser}>
                <Text style = {styles.NameUser}>Lê Tường nè</Text>
                <Text style = {styles.Status}>20 giờ</Text>
            </View>
           
            <TouchableOpacity>
            <Image style = {styles.iconOption} source={require('../../media/icon_tuong/option.png')}/>
            </TouchableOpacity>
            
           </View>
           </View>
    </View>
  )
}

export default UserPost

const styles = StyleSheet.create({
    UserContai:{
        borderBottomWidth: 1,
        borderBottomColor: '#989898'
    },
    iconOption:{
        width: 28,
        height: 28
    },
    Status:{
        fontSize: 13,
        fontWeight: '600',
        color: 'gray'
    },
    NameUser:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    ViewNameUser:{
        marginStart: -158,
        flexDirection: 'column',
        justifyContent: 'center',
        
    },
    imageUser:{
        marginStart: -160,
        width: 45,
        height: 45,
        borderRadius: 100
    },
    IconBack:{
        width: 28,
        height: 28
    },
    ViewUser:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        
    },
    
})