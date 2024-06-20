import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const Scanner = () => {
    const [data, setData] = useState('');
  return (
    <View>
       <QRCodeScanner
        onRead={({data}) => setData(data)}
        flashMode={RNCamera.Constants.FlashMode.torch}
        reactivate= {true}
        reactivateTimeout={500}
        topContent={
            <View>
                <Text>{data}</Text>
            </View>
        }
      />
    </View>
  )
}

export default Scanner

const styles = StyleSheet.create({})