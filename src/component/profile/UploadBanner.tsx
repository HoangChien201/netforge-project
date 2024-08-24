import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Modal, Text, Pressable, Dimensions, PermissionsAndroid, Alert } from 'react-native';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {upLoadMedia} from '../../http/QuyetHTTP'
import { getUSerByID, updateAvatar, updateBackground } from '../../http/PhuHTTP';
import ModalPoup from '../Modal/ModalPoup';
import ModalFail from '../Modal/ModalFail';
import ImageViewModal from './ImageViewModal';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Loading from '../Modal/Loading';

interface UploadBannerProps {
  initialImage: string; 
  onImageSelect: (imagePath: string) => void;
  userId: any;
}


const { width: screenWidth } = Dimensions.get('window');

const UploadBanner: React.FC<UploadBannerProps> = ({ initialImage, onImageSelect, userId }) => {
  const user = useSelector((state : RootState)=>state.user.value)
  const [show, setShow] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(true);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [image, setImage] = useState<string>(user?.background || '');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    requestCameraPermission();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const response = await getUSerByID(userId, user?.token);
          setUserData(response);
          setImage(response.background);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserData();
    }, [userId,image])
  );

  const handleImageResponse = useCallback(async (response: any) => {
    if (response.didCancel) return;
    if (response.errorCode) return;
    if (response.errorMessage) return;
    
    const asset = response.assets[0];
    setImage(asset.uri);
    setShow(false);
    onImageSelect(asset.uri);

    const files = new FormData();
    files.append('files', {
      uri: asset.uri,
      type: asset.type,
      name: asset.fileName,
    });

    try {
      const result = await upLoadMedia(files);
      if (Array.isArray(result) && result.length > 0) {
        const firstImage = result[0];
        if (firstImage.url && firstImage.url.length > 0) {
          setImage(firstImage.url);
          onImageSelect(firstImage.url);
          await handleUpdateBackground(firstImage.url);
        } else {
          console.log('Không lấy được URL', firstImage);
        }
      } else {
        console.log('URL không đúng cấu trúc', result);
      }
    } catch (error) {
      console.log('Lỗi khi tải lên ảnh:', error);
    }
  }, [onImageSelect]);

  const openCamera = useCallback(async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    launchCamera(options, handleImageResponse);
  }, [handleImageResponse]);

  const openLibrary = useCallback(async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };
    launchImageLibrary(options, handleImageResponse);
  }, [handleImageResponse]);

  const handleUpLoadAvatar = () => {
    setShow(true);
  };

  const handleUpdateBackground = async (image: string) => {
    setLoading(true);
    try {
      const response = await updateBackground(user?.id, image);
      if (response) {
        setShowModal(true);
        setStatus(true);
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
        console.log("Update ảnh bìa thành công");
        onImageSelect(image);
        setImage(image); 
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("Error update ảnh bìa:", error);
    }
  };

  const handleShowAvatar = () => {
    setIsImageViewerVisible(true);
  };

  const handleCloseShowBanner = () => {
    setShow(false);
    setIsImageViewerVisible(false);
  }

  const handleClose = () => {
    setShow(false);
  };

  return (
    <View style={styles.container}>
      <Loading isLoading={loading}></Loading>
      {userId === user?.id ? ( 
      <TouchableOpacity onPress={handleUpLoadAvatar} style={{ position: 'relative' }}>
        <Image
          source={image ? { uri: image } : require('../../media/icon/background_2.jpg')}
          style={styles.editBackground}
          resizeMode='cover'
        />
      </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleShowAvatar}>
          <Image
            source={image ? { uri: image } : require('../../media/icon/background_2.jpg')}
            style={styles.editBackground}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      <Modal animationType="slide" transparent={true} visible={show} onRequestClose={() => setShow(false)}>
        <Pressable style={styles.modalContainer} onPress={handleClose}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.iconClose} onPress={() => setShow(false)}>
              <Icon name="minus" size={40} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem} onPress={() => setIsImageViewerVisible(true)}>
              <FontistoIcon name="person" size={24} color="#000" />
              <Text style={{color:"#000",fontSize:18,fontWeight:'700',marginLeft:20}}>Xem ảnh bìa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem} onPress={openCamera}>
              <Icon name="camera" size={24} color="#000" />
              <Text style={{color:"#000",fontSize:18,fontWeight:'700',marginLeft:20}}>Chụp ảnh</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem} onPress={openLibrary}>
              <MaterialIcon name="photo-library" size={24} color="#000" />
              <Text style={{color:"#000",fontSize:18,fontWeight:'700', marginLeft:20}}>Chọn ảnh bìa</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <ImageViewModal
        visible={isImageViewerVisible}
        onClose={handleCloseShowBanner }
        imageUri={image}
      />

      {status ? (
        <ModalPoup text="Đã cập nhật ảnh bìa!" visible={showModal} />
      ) : (
        <ModalFail text="Cập nhật thất bại!" visible={showModal} />
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
    paddingBottom: 50,
    paddingHorizontal: 20,
    transform: [{ translateY: 210 }],
    justifyContent: 'space-between',
  },
  modalContainer: {
    padding: 30,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    alignItems: 'center',
    width:'100%'
  },
  editBackground: {
    height: 200,
    width: screenWidth
  },
  optionItem: {
    paddingHorizontal: 50,
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconClose: {
    alignItems: 'center',
  },
});

export default UploadBanner;
