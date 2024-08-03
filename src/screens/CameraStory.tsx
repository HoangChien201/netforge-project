import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NetworkRootStackEnum } from '../component/stack/NetworkRootStackParams';

const CameraStory = () => {
  const cameraRef = useRef(null);
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        const uri = data.uri;
        navigation.navigate(NetworkRootStackEnum.StoryDetail, { uri });
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', zIndex: 9999, top: 20, left: 20, width: 30, height: 30 }}
      >
        <Ionicons name="close-outline" size={34} />
      </TouchableOpacity>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        androidCameraPermissionOptions={{
          title: 'Quyền sử dụng camera',
          message: 'Chúng tôi cần quyền để sử dụng camera của bạn',
          buttonPositive: 'OK',
          buttonNegative: 'Hủy',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Quyền sử dụng ghi âm',
          message: 'Chúng tôi cần quyền để sử dụng âm thanh của bạn',
          buttonPositive: 'OK',
          buttonNegative: 'Hủy',
        }}
      />
      <View style={{ borderWidth: 1, flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 30,
    paddingHorizontal: 30,
    alignSelf: 'center',
    margin: 20,
  },
});

export default CameraStory;
