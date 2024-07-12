import React, { useEffect, useRef, useState } from 'react';
import { Alert, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraDevice, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { useCodeScanner } from 'react-native-vision-camera';
import ICON from 'react-native-vector-icons/MaterialCommunityIcons';
import SCANMODAL from '../component/scanQR-modal/Body';
import { getUserById } from '../http/QuyetHTTP';

const Scanner = () => {
  const [data, setData] = useState('');
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([{}]);
  const [cameraPosition, setCameraPosition] = useState('back')
  const devices = useCameraDevice(cameraPosition);
  const camera = useRef(null);
  const [flashMode, setFlashMode] = useState('on');
  useEffect(() => {
    const numericData = Number(data);
    if (!isNaN(numericData) && data) {
      getUser(numericData);
      console.log('Scan nè: ' + numericData);
      setShow(true);
    } else {
      console.log('Data is not a valid number: ' + JSON.stringify(data));
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
  const toggleFlash = () => {
    setFlashMode(prevFlashMode => 
      prevFlashMode == 'off'
        ? 'on'
        : 'off'
    );
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

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'], // Specify the code types you want to scan
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        setData(codes[0].value);  // Assuming you want the first scanned code
      }
    },
  });
  return (
    <View style={styles.container}>
      {devices != null && (
        <Camera
          ref={camera}
          device={devices}
          isActive={true}
          codeScanner={codeScanner}
          style={styles.camera}
          torch={flashMode} 
          enableZoomGesture={true} 
        />
      )}
      <TouchableOpacity
        onPress={toggleFlash}
        style={{ position: 'absolute', end: 20, top: 15, zIndex: 99, padding: 5 }} >
        <ICON name='flash' size={24} color={'white'} />
      </TouchableOpacity>
      <Text style={{ color: 'black', fontSize: 20, marginTop: 20 }}>Hướng Camera vào mã QR!</Text>
      <View style={{}}>
        <SCANMODAL show={show} setShow={setShow} user={user} setData={setData} />
      </View>
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
    marginTop: 0,
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
