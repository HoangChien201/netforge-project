import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Animated, FlatList, Modal, TouchableWithoutFeedback, Easing } from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createNewPost } from '../../http/QuyetHTTP';
import { COLOR } from '../../constant/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalFail from '../Modal/ModalFail';
import ModalPoup from '../Modal/ModalPoup';
import Loading from '../Modal/Loading';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const StoryText = () => {
    const [status, setStatus] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');
    const [isMultiLine, setIsMultiLine] = useState(false);
    const [isTextInputVisible, setIsTextInputVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCaption, setSelectedCaption] = useState('');
    const tabBarAnimation = useRef(new Animated.Value(1)).current;
    const textInputRef = useRef(null);
    const textHiddenRef = useRef(null);
    const navigation = useNavigation();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const animatedBottom = useRef(new Animated.Value(50)).current;
    const animatedWidth = useRef(new Animated.Value(1)).current;

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


    const handleKeyboardShow = useCallback(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none',
            }
        });
    }, []);
    const handleKeyboardHide = useCallback(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: '#1F1F2F',
                margin: 20,
                borderRadius: 15
            },
        });
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

    useEffect(() => {
        textInputRef?.current?.focus();
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
            const type = 2;
            const permission = 1;
            setIsLoading(true);
            const newPost = await createNewPost({ type, permission, content, emotion: 0 });
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
            <View style={{ flex: 1, backgroundColor: COLOR.PrimaryColor1 }}></View>
            <Animated.View style={{ position: 'absolute', bottom: animatedBottom, right: 30, width: "25%", height: '8%', backgroundColor: COLOR.PrimaryColor, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{  width:"100%",height:'100%',alignItems:"center",justifyContent:"center" }} onPress={uploadImage}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Đăng</Text>
                </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity onPress={handleAaPress} style={{ position: 'absolute', top: 50, right: 30, width: "25%", height: '8%', backgroundColor: 'rgba(105,105,105,0.2)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../media/Dicons/aa.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSuggestionPress} style={{ position: 'absolute', top: 120, right: 30, width: "25%", height: '8%', backgroundColor: 'rgba(105,105,105,0.2)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff' }}>Gợi ý</Text>
            </TouchableOpacity>
            {isTextInputVisible && (
                <>
                    <Animated.View style={[styles.animatedInputContainer, {
                        left: '50%', marginLeft: animatedWidth.interpolate({
                            inputRange: [0, 200],
                            outputRange: [0, -100] // Adjust based on your layout
                        }), width: animatedWidth
                    }]}>
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

export default StoryText;

const styles = StyleSheet.create({
    input: {
        fontWeight: 'bold',
        fontSize: 30,
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
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        maxHeight: '50%'
    },
    captionItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    captionText: {
        fontSize: 16,
        color: 'black',
    },
    confirmButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: COLOR.PrimaryColor,
        borderRadius: 10,
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
