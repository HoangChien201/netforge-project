import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Animated, FlatList, Modal, TouchableWithoutFeedback, Easing } from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createNewPost, upLoadMedia } from '../../http/QuyetHTTP';
import { COLOR } from '../../constant/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalFail from '../Modal/ModalFail';
import ModalPoup from '../Modal/ModalPoup';
import Loading from '../Modal/Loading';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const StoryDetail = ({ route }) => {
    const { uri } = route.params;
    const [status, setStatus] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isTextInputVisible, setIsTextInputVisible] = useState(false);
    const [content, setContent] = useState('');
    const [isMultiLine, setIsMultiLine] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCaption, setSelectedCaption] = useState(null);
    const tabBarAnimation = useRef(new Animated.Value(1)).current; 
    const captions = [
        "Cuộc sống là một món quà, đừng lãng phí nó.",
        "Hãy sống như thể bạn sẽ chết vào ngày mai.",
        "Hạnh phúc không phải là điều sẵn có. Nó đến từ hành động của chính bạn.",
        "Mỗi ngày là một cơ hội để thay đổi cuộc đời.",
        "Hãy tin rằng bạn có thể và bạn đã đi được nửa đường rồi.",
        "Cuộc đời là hành trình, không phải đích đến.",
        "Mỗi ngày mới là một cơ hội để bắt đầu lại.",
        "Hãy sống đúng với chính mình, mọi thứ sẽ đến đúng lúc.",
        "Hãy yêu bản thân mình trước khi yêu người khác.",
        "Mọi chuyện xảy ra đều có lý do của nó.",
        "Hãy cười nhiều hơn, yêu nhiều hơn và sống tích cực hơn.",
        "Không có gì là không thể đối với người biết cố gắng.",
        "Hạnh phúc không phải là điểm đến mà là hành trình bạn đang đi.",
        "Hãy sống như thể bạn đang sống lần cuối cùng.",
        "Hãy trân trọng những gì bạn đang có và đừng tiếc nuối những gì đã qua.",
        "Hãy theo đuổi đam mê của bạn, thành công sẽ theo đuổi bạn."
    ];

    const textInputRef = useRef(null);
    const textHiddenRef = useRef(null);
    const navigation = useNavigation();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const animatedBottom = useRef(new Animated.Value(50)).current;
    const animatedWidth = useRef(new Animated.Value(1)).current;

    useFocusEffect(
        useCallback(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
            Animated.timing(tabBarAnimation, {
                toValue: 0, // animate to opacity 0 (hidden)
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
            Animated.timing(tabBarAnimation, {
                toValue: 1, // animate to opacity 1 (visible)
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    },[])
);

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
            setIsSubmitDisabled(true);
            const formData = new FormData();
            formData.append('files', {
                uri: Platform.OS === 'android' ? uri : uri.replace('content://', ''),
                type: 'image/jpeg',
                name: `photo_${Date.now()}.jpg`,
            });

            const uploadedMedias = await upLoadMedia(formData);
            let medias = [];
            if (Array.isArray(uploadedMedias)) {
                medias = uploadedMedias.map(item => ({
                    url: item.url,
                    resource_type: item.resource_type,
                }));
            } else {
                console.error('uploadedMedias is not an array or is undefined');
            }
            const type = 2;
            const permission = 1;
            setIsLoading(true);
            const newPost = await createNewPost({ type, medias, permission, content,emotion:0 });
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
                setIsSubmitDisabled(false); 
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

    const handleSuggestionPress = () => {
        setIsModalVisible(true);
    };

    const handleCaptionPress = (caption) => {
        setSelectedCaption(caption);
    };

    const handleConfirmPress = () => {
        if (selectedCaption) {
            setContent(selectedCaption);
            setIsTextInputVisible(true);
            setIsModalVisible(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
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
                <TouchableOpacity onPress={uploadImage} disabled={isSubmitDisabled}>
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>Đăng</Text>
                </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity onPress={handleAaPress} style={{ position: 'absolute', top: 50, right: 30, width: "25%", height: '8%', backgroundColor: 'rgba(105,105,105,0.2)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../media/Dicons/aa.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSuggestionPress} style={{ position: 'absolute', top: 110, right: 30, width: "25%", height: '8%', backgroundColor: 'rgba(105,105,105,0.2)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff' }}>Gợi ý</Text>
            </TouchableOpacity>
            {isTextInputVisible && (
                <Animated.View style={[styles.animatedInputContainer, { width: animatedWidth }]}>
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
            )}
            <Text
                ref={textHiddenRef}
                style={[styles.hiddenText, { position: 'absolute', top: -1000 }]}
            >
                {content}
            </Text>
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseModal}
            >
                <TouchableWithoutFeedback onPress={handleCloseModal}>
                    <View style={styles.modalBackground}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Chọn một caption</Text>
                                <FlatList
                                    data={captions}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity 
                                            onPress={() => handleCaptionPress(item)}
                                            style={[styles.captionItem, selectedCaption === item && styles.selectedCaption]}
                                        >
                                            <Text style={styles.captionText}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                                <TouchableOpacity onPress={handleConfirmPress} style={styles.confirmButton}>
                                    <Text style={styles.confirmButtonText}>Xác nhận</Text>
                                </TouchableOpacity>
                               
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
        fontSize: 20,
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
        top: '50%', 
        left: '50%', 
        marginLeft: -150, 
        marginTop: -100, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxHeight: '50%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    captionItem: {
        padding: 10,
    },
    selectedCaption: {
        backgroundColor: 'lightgray',
    },
    captionText: {
        fontSize: 16,
        color: '#000',
    },
    confirmButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: COLOR.PrimaryColor,
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
