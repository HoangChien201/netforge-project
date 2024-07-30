import React, { useState, useEffect, memo, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Animated, Easing } from 'react-native';
import { COLOR } from '../../constant/color';
import { createNewPost } from '../../http/QuyetHTTP';
import FastImage from 'react-native-fast-image';
import ModalPoup from '../Modal/ModalPoup';
import { useDispatch } from 'react-redux';
import { setIsLoadingz } from '../store/loadDataSlice';

const captions = [
  "😊 Vui vẻ mỗi ngày.",
  "😢 Buồn cũng qua.",
  "❤️ Yêu thương mãi.",
  "🌿 Bình yên trong lòng.",
  "🌸 Hạnh phúc đơn giản.",
  "😔 Cô đơn không lâu.",
  "✨ Hy vọng mới.",
  "📦 Nỗi nhớ xa xôi.",
  "💭 Mơ màng tình yêu.",
  "🔍 Tìm lại chính mình."
];

const CaptionSlide = memo(({ userimge }) => {
  const [currentCaption, setCurrentCaption] = useState(0);
  const progressWidth = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadings, setIsLoadings] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCaption((prevCaption) => (prevCaption + 1) % captions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const createLivePost = async () => {
    if (isLoading) return; 

    setIsLoading(true); 

    
    Animated.timing(progressWidth, {
      toValue: 1,
      duration: 3000, 
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();

    try {
      const type = 1;
      const content = captions[currentCaption];
      const permission = 1;
      let emotion = 1
     const result = await createNewPost({ type, permission, content, emotion });
     console.log("đã tạo bài viết tại captonSlide");
     if(result){
        Animated.timing(progressWidth, {
            toValue: 0,
            duration: 0, 
            useNativeDriver: false,
          }).start();
          setIsLoading(false);
          setIsLoadings(true)

          setTimeout(() => {
            setIsLoadings(false)
            dispatch(setIsLoadingz(true))
          }, 1100);
     }

     

    } catch (error) {
      console.error('Error live post: ', error);
    }
  };
  const animatedStyle = {
    width: progressWidth.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%']
    }),
    backgroundColor: COLOR.PrimaryColor,
  };

  return (
    <Pressable style={styles.captionContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FastImage source={{ uri: userimge }} style={styles.userImage} />
        <Text style={styles.captionText}>{captions[currentCaption]}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={createLivePost}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>Đăng</Text>
      </TouchableOpacity>
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, animatedStyle]} />
      </View>
      {
        !isLoading && <ModalPoup visible={isLoadings} text='Create success'/>
      }
    </Pressable>
  );
});

const styles = StyleSheet.create({
  captionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 0,
    paddingBottom: 10,
    borderBottomColor: 'rgba(155,155,155,0.2)',
    position: 'relative'
  },
  userImage: {
    width: 25,
    height: 25,
    borderWidth: 0.5,
    borderRadius: 50,
    borderColor: '#000',
  },
  captionText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
    marginLeft: 20,
  },
  button: {
    backgroundColor: COLOR.PrimaryColor,
    borderRadius: 5,
    marginRight: 20,
  },
  buttonText: {
    color: '#fff',
    margin: 5,
    fontWeight: 'bold',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 4,
    overflow: 'hidden',
    backgroundColor: 'rgba(155,155,155,0.2)'
  },
  progressBar: {
    height: '100%',
  }
});

export default CaptionSlide;
