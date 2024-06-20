import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import { ProfileRootStackEnum } from '../component/stack/ProfileRootStackParams';

const QRcodeScreen = () => {
    const navigation = useNavigation()
    let logoFromFile = require('../media/quyet_icon/netforge.png'); 

    
  const handleToScanner = () => {
    navigation.navigate(ProfileRootStackEnum.Scanner);
  }


  return (
        <View style={styles.container}>
          <QRCode 
            value="Kết bạn nè cu"
            logo={logoFromFile}
            logoSize={80}
            size={250}
            logoBackgroundColor='transparent'
          />
          <TouchableOpacity onPress = {handleToScanner}>
                <Text style={{color:"#000",fontSize:17,fontWeight:'400'}}>Scan</Text>
            </TouchableOpacity>
        </View>
  )
}

export default QRcodeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
});