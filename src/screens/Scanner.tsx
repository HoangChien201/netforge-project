import { Alert, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { RNCamera } from 'react-native-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import ICON from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import jsQR from 'jsqr';
import { Buffer } from 'buffer';
import SCANMODAL from '../component/scanQR-modal/Body';
import { getUserById } from '../http/QuyetHTTP';
const Scanner = () => {
  const [data, setData] = useState('');
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([{}]);
  // const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);

  useEffect(() => {
    const numericData = Number(data);
    if (!isNaN(numericData) && data) {
      getUser(numericData);
      console.log('Scan nè: ' + numericData);
      setShow(true);
    } else {
      console.log('Data is not a valid number: ' + data);
    }
  }, [data]);

  const getUser = async (id) => {
    try {
      const result = await getUserById(id);
      setUser(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Quyền truy cập Camera",
            message: "Chúng tôi cần cấp quyền truy cập Camera",
            buttonNeutral: "Hỏi tôi sau",
            buttonNegative: "Hủy bỏ",
            buttonPositive: "Chấp nhận"
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Quyền sử dụng máy ảnh bị từ chối');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestCameraPermission();
  }, []);

  // const toggleFlash = () => {
  //   setFlashMode(prevFlashMode => 
  //     prevFlashMode === RNCamera.Constants.FlashMode.off
  //       ? RNCamera.Constants.FlashMode.torch 
  //       : RNCamera.Constants.FlashMode.off
  //   );
  // };

  return (
    <View style={styles.container}>
      {/* <RNCamera
        flashMode={flashMode}
        onBarCodeRead={({ data }) => setData(data)}
        captureAudio={false}
        style={styles.camera}
      />
      <TouchableOpacity
        onPress={toggleFlash}
        style={{ position: 'absolute', end: 20, top: 15, zIndex: 99, padding: 5 }} >
        <ICON name='flash' size={24} color={'white'} />
      </TouchableOpacity>
      <Text style={{ color: 'black', fontSize: 20, }}>Hướng Camera vào mã QR!</Text>
      <View style={{}}>
        <SCANMODAL show={show} setShow={setShow} user={user} setData={setData} />
      </View> */}
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    flexDirection: 'column',
    marginTop: 0
  },
  centerText: {
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  button: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});
