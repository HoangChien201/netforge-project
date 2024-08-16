import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert, Modal, Keyboard, Animated } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import { COLOR } from '../../constant/color';
import Loading from '../../component/Modal/Loading';
import ICON from 'react-native-vector-icons/AntDesign'
import { useFocusEffect } from '@react-navigation/native';
type AI = {
  showAI: any,
  setShowAI: (value: any) => void,
  imageUrl: any,
  setImageUrl: any
}
const GenerImageAI: React.FC<AI> = ({ showAI, setShowAI, imageUrl, setImageUrl }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '50%', '100%'], []);
  const [textInputValue, setTextInputValue] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  //const [image, setImage] = useState('http://res.cloudinary.com/delivery-food/image/upload/v1721699262/yeiucgcfrfxygy34h4ve.jpg');
  const [image, setImage] = useState('');
  const [hiddenView, setHiddenView] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const data = [
    { value: 1, text: 'mèo', color: '#FF6347' },
    { value: 2, text: 'hoàng hôn', color: '#32CD32' },
    { value: 3, text: 'bãi biển', color: '#1E90FF' },
    { value: 4, text: 'minions', color: '#8A2BE2' },
    { value: 5, text: 'tương lai', color: '#228B22' },
    { value: 6, text: 'sunset', color: '#FF4500' },
    { value: 7, text: 'quái vật', color: '#DA70D6' },
    { value: 8, text: 'logo', color: '#20B2AA' },
    { value: 9, text: 'anime', color: '#00BFFF' },
  ];

  const handleItemPress = (text) => {
    setTextInputValue(prevValue => prevValue ? `${prevValue}, ${text}` : text);
  };
  const handleKeyboardShow = useCallback(() => {

    setHiddenView(true)
  }, []);
  const handleKeyboardHide = useCallback(() => {

    setHiddenView(false)
  }, []);
  useFocusEffect(
    useCallback(() => {
      // Lắng nghe sự kiện hiển thị và ẩn bàn phím
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, [handleKeyboardShow, handleKeyboardHide]),
  );

  const generImage = async () => {
    if (!textInputValue) {
      Alert.alert('Bạn cần nhập từ khóa cho bức ảnh')
    }
    try {
      setIsLoad(true);
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer ",
        },
        body: JSON.stringify({
          prompt: textInputValue,
          n: 1,
          size: "512x512"
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const generatedImageUrl = jsonResponse.data[0].url;
        setImage(generatedImageUrl);
        setTextInputValue('')

        setIsLoad(false)
      } else {
        console.log(`Error: ${response.status} - ${response.statusText}`);
        setIsLoad(false)
      }
    } catch (error) {
      console.log('Error generating image:', error);
      setIsLoad(false)
    }
  };
  const closeAI = () => {
    setShowAI(false)
  }
  const useImage = () => {
    setImageUrl(image);
    setTimeout(() => {
      setShowAI(false)
      setImage('');
    }, 500);


  }
  const deleteImage = () => {
    console.log('click');
    
    if (image) {
      Alert.alert(
        'Bạn có muốn xóa ảnh?',
        '',
        [
          {
            text: 'Hủy',
            style: 'cancel', // Thêm style cancel cho nút Hủy
          },
          {
            text: 'Đồng ý',
            onPress: () => {
              setImage('');
              setImageUrl('');
              setTextInputValue('');
              setTimeout(() => {
                //setShowAI(false);
              }, 500);
            },
          },
        ],
        { cancelable: true }
      );
    }

  };
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: hiddenView ? -100 : 0, // Thay đổi giá trị theo ý muốn để điều chỉnh vị trí trượt
      duration: 500, // Thời gian hiệu ứng
      useNativeDriver: true,
    }).start();
  }, [hiddenView, slideAnim]);
  const hiddenText = () => {
    if (hiddenView == true) {
      return null;
    }
    return (
      <Animated.View style={{ transform: [{ translateY: slideAnim }], height: 120 }}>
        <Text style={styles.textEx}>Từ khóa gợi ý </Text>
        <View style={styles.example}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[styles.button, { borderColor: item.color }]}
              onPress={() => handleItemPress(item.text)}
            >
              <Text style={styles.buttonText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    )
  }
  return (
    <Modal style={styles.contentContainer} visible={showAI} animationType="slide">
      <Loading isLoading={isLoad} />
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 5, }}>
        <Text style={styles.text}>Tạo ảnh với AI 🎉</Text>
        <TouchableOpacity style={styles.closeX}
          onPress={closeAI}
        >
          <ICON name='close' size={24} color={COLOR.PrimaryColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.images}>
        {image ? (
          <>
            <Image
              style={{ flex: 1, marginHorizontal: 10, height: '100%', width: '100%', marginTop: 20, }}
              source={{ uri: image }}
              resizeMode='contain'
            />
          </>

        ) : (
          // <FastImage
          //   resizeMode={FastImage.resizeMode.contain}
          //   style={{ width: '100%', height: '100%', flex: 1 }}
          //   source={require('../../media/icon_tuong/chimcanhcut1.gif')}
          // />
          <View style={{ width: '100%', height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.text}>Sử dụng từ khóa miêu tả về bức tranh của bạn</Text>
            {/* <Text style={styles.text}>Một vài từ khóa gợi ý </Text> */}
          </View>
        )}
      </View>
      {!image ?
        <>
          {hiddenText()}
          <View style={styles.textInp}>
            <TextInput
              multiline
              numberOfLines={2}
              maxLength={240}
              placeholder='Nhập từ khóa'
              value={textInputValue}
              onChangeText={setTextInputValue}
              style={{ padding: 10 }}
            />
          </View>
        </>

        :
        null
      }


      <View style={{ height: '15%', alignItems: 'center', justifyContent: 'center' }}>
        {image ?
          <View style={styles.buttonH}>
            <TouchableOpacity style={styles.buttonHC}
              onPress={()=>{deleteImage()}}
            >
              <Text style={styles.textH}>Hủy</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.buttonHA}
              onPress={useImage}
            >
              <Text style={styles.textA}>Sử dụng</Text>
            </TouchableOpacity>
          </View>
          :
          <TouchableOpacity style={styles.generateButton}
            onPress={generImage}
          >
            <Text style={styles.textC}>Tạo ảnh</Text>
          </TouchableOpacity>
        }

      </View>
    </Modal >
  );
}

export default GenerImageAI;

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  contentContainer: {
    backgroundColor: COLOR.primary300,
    width: '100%',
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginVertical: 5,
  },
  textEx: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    marginStart: 14

  },
  textInp: {
    height: 64,
    borderWidth: 1,
    borderColor: COLOR.PrimaryColor,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  images: {
    height: '45%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  example: {
    height: 44,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  button: {
    padding: 4,
    borderRadius: 5,
    margin: 5,
    borderWidth: 1.5,
  },
  buttonText: {
    color: COLOR.PrimaryColor,
    fontSize: 16,
    fontWeight: '400',
  },
  buttonH: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '96%',
    marginTop: 10,
    marginHorizontal: 16
  },
  buttonHC: {
    height: 60,
    width: 80,
    borderWidth: 1.5,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonHA: {
    height: 60,
    width: 260,
    borderWidth: 1.5,
    borderColor: COLOR.PrimaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: COLOR.PrimaryColor1

  },
  textH: {
    fontSize: 16,
    color: 'red',
    fontWeight: '500',
  },
  textA: {
    fontSize: 24,
    color: 'white',
    fontWeight: '500',
  },
  textC: {
    fontSize: 20,
    color: COLOR.PrimaryColor,
    fontWeight: '500',
  },
  generateButton: {
    height: 60,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLOR.PrimaryColor,
    borderRadius: 10,
    marginTop: 10
  },
  closeX: {
    position: 'absolute',
    end: 5
  }
});
