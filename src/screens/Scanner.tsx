import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Image, Modal, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraDevice, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { useCodeScanner } from 'react-native-vision-camera';
import ICON from 'react-native-vector-icons/MaterialCommunityIcons';
import SCANMODAL from '../component/scanQR-modal/Body';
import { getUserById } from '../http/QuyetHTTP';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { COLOR } from '../constant/color';
import { socket } from '../http/SocketHandle';
import { useSelector } from 'react-redux';
import { RootState } from '../component/store/store';
const Scanner = () => {
  const user = useSelector((state:RootState)=>state.user.value)

  const [data, setData] = useState('');
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userS, setUserS] = useState([{}]);
  const [cameraPosition, setCameraPosition] = useState('back')
  const devices = useCameraDevice(cameraPosition);
  const camera = useRef(null);
  const [flashMode, setFlashMode] = useState('on');
  const isFocused = useIsFocused();
  const [isCameraActive, setIsCameraActive] = useState(true);
  const navigation = useNavigation();

  const [device, setDevice] = useState('')
  useEffect(() => {
    // Kiểm tra nếu data là một số hợp lệ
    const numericData = Number(data);

    if (!isNaN(numericData) && data) {
      // Nếu data là một số, gọi hàm getUser với ID người dùng
      getUser(numericData);
      setShow(true);
    } else if (typeof data === 'string' && data.length > 0) {
      // Nếu data là một chuỗi, thực hiện hành động khác (tuỳ theo yêu cầu)
      setDevice(data)
      setShowLogin(true);

    } else {
      console.log('Data is not a valid number or string ID: ' + JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    if (isFocused) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        }
      });
    }
  }, [isFocused]);
  const getUser = async (id) => {
    try {
      const result = await getUserById(id);
      setUserS(result);
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
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'], // Specify the code types you want to scan
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        setData(codes[0].value);  // Assuming you want the first scanned code
      }
    },
  });

  useFocusEffect(
    useCallback(() => {
      setIsCameraActive(true);
      return () => {
        setIsCameraActive(false);
      };
    }, [isFocused])


  );
  const handleModalClose = () => {
    setShowLogin(false);
    setData('');
  };
  const sendLoginWeb = () => {
    const data = {
      user,
      QRDevice: device,
    };

    socket.emit('qr-login', data);
  };
  useEffect(() => {
    socket.on('qr-login-c142c2e633faa7a6df18d273e6f77206', (data) => {
      Alert.alert(
        'Đăng nhập',
        'Đăng nhập thành công!',
        [
          {
            text: 'Đóng',
            style: 'cancel',
            onPress: () => {
              setShowLogin(false)
              navigation.navigate('HomeScreen');
            },
          },
        ],
        { cancelable: false }
      );
    });
  }, [user.id])


  return (
    <View style={styles.container}>
      {devices != null && isCameraActive && (
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
        <SCANMODAL show={show} setShow={setShow} user={userS} setData={setData} />
        <Modal visible={showLogin}
          animationType="slide"
          onRequestClose={handleModalClose}
          transparent={true}
        >
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
            <View style={styles.containerLogin}>
              <TouchableOpacity onPress={handleModalClose} style={styles.closeButton}>
                <ICON name='close' size={24} color={'black'} />
              </TouchableOpacity>
              <View style={styles.containerUser}>
                <View style={styles.avatar}>
                  {user.avatar ?
                    <Image source={{ uri: user.avatar }} style={styles.image} />
                    :
                    <View style={styles.image}></View>
                  }
                </View>
                <View style={styles.infor}>
                  <Text style={styles.name}>{user.fullname}</Text>
                </View>
                <Text style={{ color: 'black', fontSize: 20 }}>Xác nhận đăng nhập vào thiết bị khác</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
                  <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.PrimaryColor1, padding: 13, borderRadius: 8 }}
                    onPress={handleModalClose}
                  >
                    <Text style={{ color: 'gray', fontSize: 22, fontWeight: '500' }}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.PrimaryColor1, padding: 13, borderRadius: 8, marginStart: 10 }}
                    onPress={sendLoginWeb}
                  >
                    <Text style={{ color: 'white', fontSize: 22, fontWeight: '500' }}>Đăng nhập</Text>
                  </TouchableOpacity>
                </View>
                <View></View>
              </View>

            </View>
          </View>
        </Modal>
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
  containerLogin: {
    backgroundColor: 'white',
    height: '70%',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20
  },
  closeButton: {
    position: 'absolute',
    end: 10,
    top: 5
  },
  containerUser: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    marginTop: 40

  },
  infor: {
    marginHorizontal: 5,
    marginTop: -40
  },
  image: {
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
    borderRadius: 200
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 10
  },
  address: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
    overflow: 'hidden',
    marginBottom: 20
  },
  isFriend: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10
  },
  buttonPage: {
    backgroundColor: '#07A3B2',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20
  },
  page: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  }
});
