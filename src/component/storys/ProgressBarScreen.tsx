import React, { useState, useRef, useCallback } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Animated, Easing, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import ProgressBar from './ProgressBar';
import Reaction from './Reaction';
import { COLOR } from '../../constant/color';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DateOfTimePost } from '../../format/DateOfTimePost';
import { deletePost } from '../../http/userHttp/getpost';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { HomeRootStackEnum } from '../stack/HomeRootStackParams';
import { useDispatch, useSelector } from 'react-redux';
import { setPostid } from '../store/postIDSlice';
import { RootState } from '../store/store';
import { reaction } from '../../constant/emoji';

const ProgressBarScreen = ({ listpostStory, setCurrentIndex, currentIndex, dataLength }) => {
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);
    const [check, setCheck] = useState(false);
    const [paused, setPaused] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [idPosts, setIdpost] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const showReactions = useRef(new Animated.Value(0)).current;
    const spinValue = useRef(new Animated.Value(0)).current;
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const user = useSelector((state : RootState)=>state.user.value)
    const reactionState = useSelector((state: RootState) => state.reaction.reactions[listpostStory[activeIndex].id]);

    const handleImagePressR = useCallback(() => {
        if (!check) {
            if (activeIndex === listpostStory.length - 1) {
                if (currentIndex === dataLength) {
                    return;
                } else {
                    setCurrentIndex(currentIndex + 1);
                }
            } else {
                setActiveIndex(prevIndex => prevIndex + 1);
            }
        }
    }, [check, activeIndex, currentIndex, dataLength, setCurrentIndex]);

    const handleImagePressL = useCallback(() => {
        if (!check) {
            if (activeIndex === 0) {
                if (currentIndex === 0) {
                    return;
                } else {
                    setCurrentIndex(currentIndex - 1);
                }
            } else {
                setActiveIndex(prevIndex => prevIndex - 1);
            }
        }
    }, [check, activeIndex, currentIndex, setCurrentIndex]);

    const PressIn = useCallback(() => {
        setCheck(true);
        setPaused(true);
    }, []);

    const PressOut = useCallback(() => {
        setCheck(false);
        setPaused(false);
    }, []);

    const toggleReactions = useCallback(() => {
        Animated.timing(showReactions, {
            toValue: showReactions._value === 0 ? 1 : 0,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [showReactions]);

    const spin = useCallback(() => {
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            spinValue.setValue(0);
        });
    }, [spinValue]);

    const spinAnimation = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const handleClick = useCallback(() => {
        setHidden(pre => !pre);
        setPaused(pre => !pre);
        setModalVisible(true)
    }, []);

    const handleDeletePost = useCallback(async () => {
        try {
            await deletePost(listpostStory[activeIndex].id);
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    }, [activeIndex, listpostStory, navigation]);

    const handleOutsidePress = () => {
        setModalVisible(false);
        setPaused(pre => !pre);
    };
    const getLivePostContent = useCallback(() => {
        const livePost = listpostStory.find(post => post.type === 3);
        return livePost ? livePost.content : null;
    }, [listpostStory]);
    const getLivePostID = useCallback(() => {
        const livePost = listpostStory.find(post => post.type === 3);
        return livePost ? livePost.id : null;
    }, [listpostStory]);
    const hanleLiveStream = () => {
        dispatch(setPostid(getLivePostID()))
        navigation.navigate(HomeRootStackEnum.LiveStack,{
            userID: '12345',
            userName: user?.fullname,
            liveID: getLivePostContent()
        })
    }
    function ViewReaction(){
        const view =   reaction.find(rct=>rct.type === reactionState)
        if(view){
            return <Image source={view.Emoji} style={{width:30,height:30}}/>
        }
    }
    return (
        <View style={styles.container}>
            {listpostStory[activeIndex]?.creater.id === user?.id && (
                <TouchableOpacity onPress={() =>handleClick() } style={styles.ellipsisButton}>
                    <AntDesign name='ellipsis1' size={25} color='#000' />
                </TouchableOpacity>
            )}
            {listpostStory[activeIndex]?.media[0]?.url ? (
                <>
                    <Image source={{ uri: listpostStory[activeIndex]?.media[0]?.url }} style={styles.fullscreenImage} />
                    <Text style={styles.imageContent}>{listpostStory[activeIndex]?.content}</Text>
                    <Text style={styles.dateText}>{DateOfTimePost(listpostStory[activeIndex].create_at)}</Text>
                </>
            ) : (
                <>
                    <View style={styles.fullscreenImage1}>
                        <Text style={styles.dateText}>{DateOfTimePost(listpostStory[activeIndex].create_at)}</Text>
                    </View>
                    <TouchableOpacity style={styles.textContent} disabled={listpostStory[activeIndex].type === 3 ? false : true } onPress={hanleLiveStream}><Text style={[styles.imageContent,{backgroundColor:listpostStory[activeIndex]?.content&& 'rgba(0,0,0,0.2)'}]}>{listpostStory[activeIndex].type === 3 ? "Nhấn vào để xem Live" : listpostStory[activeIndex]?.content }</Text></TouchableOpacity>
                </>
            )}
            <View style={styles.progressBarContainer}>
                {listpostStory.map((item, index) => (
                    <ProgressBar
                        paused={paused}
                        dataLength={dataLength}
                        setcurrentIndex={setCurrentIndex}
                        currentIndex={currentIndex}
                        key={item.id}
                        index={index}
                        active={activeIndex}
                        setActi={setActiveIndex}
                        length={listpostStory.length - 1}
                    />
                ))}
            </View>
            <View style={styles.touchableOverlay}>
                <TouchableOpacity style={styles.button} onLongPress={PressIn} onPressOut={PressOut} onPress={handleImagePressL} />
                <TouchableOpacity style={styles.button} onLongPress={PressIn} onPressOut={PressOut} onPress={handleImagePressR} />
            </View>
            <View style={styles.reactionContainer}>
                <Animated.View style={[styles.reactionSubContainer, {
                    width: showReactions.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '80%'],
                    })
                }]}>
                    <Reaction postID={listpostStory[activeIndex].id} reactions={listpostStory[activeIndex].reaction} />
                </Animated.View>
                <TouchableOpacity onPress={() => {
                    spin();
                    toggleReactions();
                    setPaused(pre => !pre);
                }}>
                    <Animated.View style={{ transform: [{ rotate: spinAnimation }],padding:12,backgroundColor:'rgba(0, 0, 0, 0.2)',borderRadius:20 }}>
                        {
                            reactionState ? ViewReaction(): <FontAwesome6 name='face-smile' size={30} color="#fff" style={styles.smileIcon} />
                        }
                       
                    </Animated.View>
                </TouchableOpacity>
            </View>
            {/* Modal for delete confirmation */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={handleOutsidePress}
            >
                <TouchableWithoutFeedback onPress={handleOutsidePress}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Bạn có chắc chắn muốn xóa bài viết ?</Text>
                            <View style={styles.btnClick}>
                                <TouchableOpacity onPress={handleOutsidePress} style={[styles.modalButton,{backgroundColor:'red'}]}>
                                    <Text style={styles.modalButtonText}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleDeletePost} style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>Xóa</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fullscreenImage1: {
        flex: 1,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: COLOR.PrimaryColor,
    },
    fullscreenImage: {
        flex: 1,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    button: {
        flex: 1,
    },
    progressBarContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        flexDirection: 'row',
        height: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    reactionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    reactionSubContainer: {
        height: 50,
        paddingTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(105,105,105,0.5)',
        overflow: 'hidden',
    },
    ellipsisButton: {
        position: 'absolute',
        top: '2.5%',
        right: '13%',
        zIndex: 3132,
    },
    imageContent: {
        width: '90%',
        fontSize: 30,
        color: '#fff',
        position: 'absolute',
        top: '50%',
        left: '1%',
        flexWrap: 'wrap',
     
    },
    textContent: {
        width: '90%',
        fontSize: 30,
        color: '#fff',
        position: 'absolute',
        top: '50%',
        left: '10%',
        flexWrap: 'wrap',
        zIndex: 99999999,
        backgroundColor: 'red',
        
    },
    dateText: {
        color: 'white',
        position: 'absolute',
        top: '5%',
        left: '20%',
    },
    touchableOverlay: {
        flexDirection: 'row',
        position: 'absolute',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width: '100%',
    },
    smileIcon: {
        marginHorizontal: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight:'800',
        color:'black'
    },
    modalButton: {
        width: '40%',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: COLOR.PrimaryColor,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight:'bold'

    },
    btnClick: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        
        width: '100%'
    }
});

export default ProgressBarScreen;
