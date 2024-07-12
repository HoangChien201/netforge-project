import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { createNewPost, upLoadMedia } from '../../http/QuyetHTTP';
import { COLOR } from '../../constant/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalFail from '../Modal/ModalFail';
import ModalPoup from '../Modal/ModalPoup';
import Loading from '../Modal/Loading';
import { useNavigation } from '@react-navigation/native';

const StoryDetail = ({ route }) => {
    const { uri } = route.params;
    const [status, setStatus] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isTextInputVisible, setIsTextInputVisible] = useState(false);
    const [content, setContent] = useState('');
    const [isMultiLine, setIsMultiLine] = useState(false);
    const textInputRef = useRef(null);
    const textHiddenRef = useRef(null);
    const navigation = useNavigation();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const animatedBottom = useRef(new Animated.Value(50)).current;
    const animatedWidth = useRef(new Animated.Value(1)).current;
    console.log("StoryDetail");
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
                Animated.timing(animatedBottom, {
                    toValue: 10,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
                Animated.timing(animatedBottom, {
                    toValue: 50,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        if (isTextInputVisible) {
            textInputRef?.current?.focus();
        }
    }, [isTextInputVisible]);

    useEffect(() => {
      if (textHiddenRef.current) {
          textHiddenRef.current?.measure((x, y, width, height) => {
              if (width > 76) {
                  setIsMultiLine(true);
              } else {
                  setIsMultiLine(false);
              }
              Animated.timing(animatedWidth, {
                  toValue: Math.min(width + 50, 300), 
                  duration: 100,
                  useNativeDriver: false,
              }).start();
          });
      }
  }, [content]);

    const uploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('files', {
                uri: Platform.OS === 'android' ? uri : uri.replace('content://', ''),
                type: 'image/jpeg', 
                name: `photo_${Date.now()}.jpg`,
            });

            const uploadedMedias = await upLoadMedia(formData);
            let medias:any = [];
            if (Array.isArray(uploadedMedias)) {
                medias = uploadedMedias.map(item => ({
                    url: item.url,
                    resource_type: item.resource_type,
                }));
                console.log('Uploaded media paths:', medias);
            } else {
                console.error('uploadedMedias is not an array or is undefined');
            }
            const type = 2;

            const permission = 1;
            setIsLoading(true);
            const newPost = await createNewPost({ type, medias, permission, content });
            console.log("newPost", newPost);
            setTimeout(() => {
                setIsLoading(false);
                setStatus('Tạo bài viết thành công');
                setShowPopup(true);
                setIsError(false);
                setTimeout(() => {
                    setStatus('');
                    setShowPopup(false);
                    setIsError(true);
                    navigation.popToTop();
                }, 1500);
            }, 1000);

        } catch (error) {
            console.error('Error uploading image: ', error);
            setTimeout(() => {
                setIsLoading(false);
                setStatus('Có lỗi khi tạo');
                setShowPopup(true);
                setIsError(true);
                setTimeout(() => {
                    setStatus('');
                    setShowPopup(false);
                }, 1500);
            }, 1000);
        }
    };

    const handleAaPress = () => {
        setIsTextInputVisible(prev => !prev);
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', zIndex: 9999, top: 20, left: 20, width: 30, height: 30 }}
            >
                <Ionicons name="close-outline" size={34} />
            </TouchableOpacity>
            <Loading isLoading={isLoading} />
            <Image source={{ uri: uri }} style={{ flex: 1 }} />
            <Animated.View style={{ position: 'absolute', bottom: animatedBottom, right: 30, width: "25%", height: '8%', backgroundColor: COLOR.PrimaryColor, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={uploadImage}>
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>Đăng</Text>
                </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity onPress={handleAaPress} style={{ position: 'absolute', top: 50, right: 30, width: "25%", height: '8%', backgroundColor: 'rgba(105,105,105,0.2)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../media/Dicons/aa.png')} />
            </TouchableOpacity>
            {isTextInputVisible && (
                <>
                    <Animated.View style={[styles.animatedInputContainer, { left: '50%', marginLeft: -animatedWidth._value / 2, width: animatedWidth }]}>
                    <TextInput
                        ref={textInputRef}
                        style={[styles.input, isMultiLine && { height: 200, textAlignVertical: 'top' }]}
                        selectionColor='#fff'
                        placeholderTextColor="white"
                        value={content}
                        onChangeText={setContent}
                        textAlign="center"
                        textAlignVertical="center"
                        multiline={isMultiLine}
                    />
                    </Animated.View>
                    <Text
                        ref={textHiddenRef}
                        style={[styles.hiddenText, { position: 'absolute', top: -1000 }]}
                    >
                        {content}
                    </Text>
                </>
            )}
            {showPopup ? (
                isError ? (
                    <ModalFail text={status} visible={showPopup} />
                ) : (
                    <ModalPoup text={status} visible={showPopup} />
                )
            ) : null}
            
        </View>
    );
};

export default StoryDetail;

const styles = StyleSheet.create({
    input: {
        fontSize:20,
        height: 80,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        color: 'white',
        paddingHorizontal: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    hiddenText: {
        fontSize: 16,
        paddingHorizontal: 10,
    },
    animatedInputContainer: {
        
        position: 'absolute',
        top: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
