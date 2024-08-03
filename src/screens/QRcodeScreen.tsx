import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ProfileRootStackEnum } from '../component/stack/ProfileRootStackParams';
import ICON from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { PermissionsAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../component/store/store';
const isFocused = useIsFocused();
const QRcodeScreen = () => {
  const navigation = useNavigation()
  // let logoFromFile = require('../media/quyet_icon/netforge.png');
  const user = useSelector((state : RootState)=>state.user?.value)
  const ref = useRef();
  const handleToScanner = () => {
    navigation.navigate(ProfileRootStackEnum.Scanner);
  }
  useEffect(() => {
    if (isFocused) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        }
      });
    }
  }, [isFocused]);
  useEffect(() => {
    requestStoragePermission();
  }, []);
  const requestStoragePermission = async () => {
    try {
      // const granted = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      //   {
      //     title: 'Quyền truy cập lưu trữ',
      //     message: 'Ứng dụng cần quyền truy cập lưu trữ để lưu hình ảnh.',
      //     buttonNeutral: 'Hỏi lại sau',
      //     buttonNegative: 'Hủy',
      //     buttonPositive: 'Đồng ý',
      //   }
      // );
      // return granted === PermissionsAndroid.RESULTS.GRANTED;
      if (Number(Platform.Version) >= 33) {
        return true;
      }

      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }

      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  const saveQRCodeToAlbum = async (uri) => {
    try {
      // Kiểm tra và yêu cầu quyền truy cập lưu trữ (nếu chưa có)
      const granted = await requestStoragePermission();
      if (!granted) {
        Alert.alert('Quyền truy cập lưu trữ bị từ chối.');
        return;
      }
      // Tạo đường dẫn và tên file cho hình ảnh
      const albumPath = RNFS.PicturesDirectoryPath; // Chọn thư mục để lưu trữ hình ảnh
      const fileName = `QRCode_${Date.now()}.jpg`;
      const imagePath = `${albumPath}/${fileName}`;
      const base64Data = uri.split(',')[1];

      //await RNFS.writeFile(imagePath, base64Data, 'base64');
      // Lưu hình ảnh QR code vào album
      await RNFS.copyFile(uri, imagePath);
      //await RNFS.writeFile(imagePath, uri, 'base64');

      // Hiển thị thông báo thành công
      Alert.alert('Đã lưu QR code vào album thành công.');

    } catch (error) {
      console.log('Lỗi khi lưu QR code:', error);
      Alert.alert('Đã xảy ra lỗi khi lưu QR code.');
    }
  };
  const handleCapture = async () => {
    try {
      const uri = await captureRef(ref, {
        format: 'jpg',
        quality: 1,
      });

      await saveQRCodeToAlbum(uri);
    } catch (error) {
      console.error('Lỗi khi chụp và lưu hình ảnh:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.infor}>
        <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        <View style={{ flex: 4, marginStart: 10, flexDirection: 'column' }}>
          <Text style={{ fontSize: 16, color: 'black', fontWeight: '500' }}>Danh thiếp</Text>

        </View>
        <TouchableOpacity style={{ flex: 0.5 }} onPress={handleCapture}>
          <ICON name='download' size={20} color={'black'} />
        </TouchableOpacity>
      </View>
      <ViewShot ref={ref} style={{backgroundColor:'white', padding:5}}>
        <QRCode
          value={user ? user?.id.toString() : ''}
          logo={user ? user?.avatar : logoFromFile}
          logoSize={40}
          size={250}
          logoBackgroundColor='white'
        />

        <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.userName}>{user?.fullname}</Text>
          <Text>Quét mã QR để kết bạn với tôi!</Text>
        </View>
      </ViewShot >
      <View></View>
      {/* <TouchableOpacity onPress={handleToScanner}>
        <Text style={{ color: "#000", fontSize: 17, fontWeight: '400' }}>Scan</Text>
      </TouchableOpacity> */}
      <View></View>
    </View>
  )
}

export default QRcodeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop:18
  },
  infor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    
  },
  userName: {
    color: 'black',
    fontSize: 22,
    fontWeight: '500'
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1
  },
  qrCode: {
    width: 200,
    height: 200,
  },
});