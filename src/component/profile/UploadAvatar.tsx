import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Modal, Text, Alert, Platform } from 'react-native';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import ImagePicker from 'react-native-image-crop-picker';
import { uploadImage } from '../../http/TuongHttp';
import { getUSerByID, updateAvatar } from '../../http/PhuHTTP';
import { useMyContext } from '../navigation/UserContext';
import ModalPoup from '../Modal/ModalPoup';
import ModalFail from '../Modal/ModalFail';
import ImageViewModal from './ImageViewModal';
import { useFocusEffect } from '@react-navigation/native';

interface UpLoadAvatarProps {
  initialImage: string; 
  onImageSelect: (imagePath: string) => void; 
}

const UpLoadAvatar: React.FC<UpLoadAvatarProps> = ({ initialImage, onImageSelect }) => {
  const {user} = useMyContext();
  const [show, setShow] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(true);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

    const [userData, setUserData] = useState<any>(null);
    const [image, setImage] = useState<string>('');

    useFocusEffect(
        React.useCallback(() => {
            const fetchUserData = async () => {
            try {
                const response = await getUSerByID(user.id, user.token);
                setUserData(response);
                setImage(response.avatar);
            } catch (error) {
                console.log(error);
            }
            };
            fetchUserData();
        }, [])
        );

       


  const onPressModal = () => {
    setShow(true);
  };



  console.log(user.avatar)

  const takePhoto = useCallback(async (response: any) => {
    if (response.didCancel) return;
    if (response.errorCode) return;
    if (response.errorMessage) return;
    
    const asset = response.assets[0];
    try {
      const croppedImage = await ImagePicker.openCropper({
        path: asset.uri,
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        mediaType: 'photo'
      });
  
      if (!croppedImage.didCancel) {
        setImage(croppedImage.path);
        setShow(false);
        onImageSelect(croppedImage.path);
  
        // Upload ảnh
        const files = new FormData();
        files.append('files', {
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName,
        });
  
        const result = await uploadImage(files);
        if (Array.isArray(result) && result.length > 0) {
          const firstImage = result[0];
          if (firstImage.url && firstImage.url.length > 0) {
            setImage(firstImage.url);
            onImageSelect(firstImage.url);
            await handleUpdateAvatar(firstImage.url);
          } else {
            console.log('Không lấy được URL', firstImage);
          }
        } else {
          console.log('URL không đúng cấu trúc', result);
        }
      } else {
        console.log('Người dùng đã hủy cắt ảnh.');
        setShow(false)
      }
    } catch (error) {
      console.log('Lỗi khi cắt ảnh:', error);
      setShow(false)
    }
  }, [onImageSelect, setImage, setShow, uploadImage]);
  


  const openCamera = useCallback(async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    launchCamera(options, takePhoto);
  }, [takePhoto]);

  const openLibrary = useCallback(async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };
    launchImageLibrary(options, takePhoto);
  }, [takePhoto]);


  const handleUpLoadAvatar = () => {
    onPressModal();
  };

  const handleUpdateAvatar = async (image:string) => {
    try {
    const response = await updateAvatar(user.id, image)
      console.log(response)
      if (response) {
          setShowModal(true);
          setStatus(true);
          setTimeout(() => {
              setShowModal(false);
          }, 2000);
          console.log("update avatar thanh cong")
          onImageSelect(image);
          setImage(image); 
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
          //showModalFalse();
      } else {
          //showModalFalse();
      }
      console.log("Error update profile:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleUpLoadAvatar} style={{ position: 'relative' }}>
        <Image
          source={image ? { uri: image } : require('../../media/icon/avatar.png')}
          style={styles.editAvatar}
        />
        <View style={styles.iconCamera}>
          <Icon name="camera" size={18} color="#000" />
        </View>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={show} onRequestClose={() => setShow(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.iconClose} onPress={() => setShow(false)}>
              <Icon name="minus" size={40} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem} onPress={() => setIsImageViewerVisible(true)}>
              <FontistoIcon name="person" size={24} color="#000" />
              <Text style={{color:"#000",fontSize:18,fontWeight:'700',marginLeft:20}}>Xem ảnh đại diện</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem} onPress={openCamera}>
              <Icon name="camera" size={24} color="#000" />
              <Text style={{color:"#000",fontSize:18,fontWeight:'700',marginLeft:20}}>Chụp ảnh</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem} onPress={openLibrary}>
              <MaterialIcon name="photo-library" size={24} color="#000" />
              <Text style={{color:"#000",fontSize:18,fontWeight:'700', marginLeft:20}}>Chọn ảnh</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ImageViewModal
        visible={isImageViewerVisible}
        onClose={() => setIsImageViewerVisible(false)}
        imageUri= {image}
      />

      {status ? (
            <ModalPoup text="Đã cập nhập ảnh đại diện!" visible={showModal} />
          ) : (
            <ModalFail text="Cập nhập thất bại!" visible={showModal} />
          )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    height: '45%',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    // padding: 20,
    paddingBottom:50,
    paddingHorizontal:20,
    transform: [{ translateY: 210 }],
    justifyContent:'space-between'
    
  },
  modalContainer: {
    padding: 30,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    // backgroundColor: '#fff',
    alignItems:'center',
    marginTop:20
  },
  editAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    marginTop: 10,
    borderColor: '#DDDDDD',
  },
  iconCamera: {
    width: 28,
    height: 28,
    position: 'absolute',
    bottom: 5,
    left: 70,
    backgroundColor: '#ddd',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionItem: {
    paddingHorizontal:50,
    width:'100%',
    height:60,
    backgroundColor:'#fff',
    borderRadius:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
},
iconClose: {
  alignItems:'center'
}
});

export default UpLoadAvatar;
