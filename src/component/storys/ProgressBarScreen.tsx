import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Animated, Easing, Text } from 'react-native';
import ProgressBar from './ProgressBar';
import Reaction from './Reaction';
import { COLOR } from '../../constant/color';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DateOfTimePost } from '../../format/DateOfTimePost';
import { deletePost, getPostById } from '../../http/userHttp/getpost';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useMyContext } from '../navigation/UserContext';
import { LiveRootStackScreens } from '../stack/LiveRootStackParams';
import { HomeRootStackEnum } from '../stack/HomeRootStackParams';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProgressBarScreen = ({ listpostStory, setCurrentIndex, currentIndex, dataLength }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [check, setCheck] = useState(false);
    const [paused, setPaused] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [idPosts,setIdpost] = useState(0)
    const showReactions = useRef(new Animated.Value(0)).current;
    const spinValue = useRef(new Animated.Value(0)).current;
    const navigation:NavigationProp<ParamListBase> = useNavigation();
    const { user } = useMyContext();

    useEffect(() => {
        console.log("ProgressBarScreen");
    }, []);

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
    }, []);

    const handleDeletePost = useCallback(async () => {
        try {
            await deletePost(listpostStory[activeIndex].id);
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    }, [activeIndex, listpostStory, navigation]);
    
//   useEffect(() => {
    
//     const getDetailByPost = async() =>{
//         try {
//           const result = await getPostById(listpostStory[activeIndex].id);
//           console.log("re",result);
          
//           if(result){
//             setIdpost(result?.reaction)
//           }
//         } catch (error) {
          
//         }
//     }
//     getDetailByPost()
//   }, [listpostStory[activeIndex].id]);

    // const handleDetailLiveStream = async ()=>{
      
    //         try {
    //             const value = await AsyncStorage.getItem("liveID");
    //             console.log("Retrieved liveID:", value);
               
    //                 const userName = user.fullname;
    //                 const userID = String(Math.floor(Math.random() * 100000));
    //                 // navigation.navigate(HomeRootStackEnum.LiveStack, {
    //                 //     userID,
    //                 //     userName,
    //                 //     liveID:value,
    //                 // });
    //                 console.log("LiveID found:", value);
                
    //         } catch (error) {
    //             console.error('Error retrieving liveID:', error);
    //         }
       
        
       
       
       
    // }

    return (
        <View style={styles.container}>
            {listpostStory[activeIndex]?.creater.id === user.id && (
                <TouchableOpacity onPress={handleClick} style={styles.ellipsisButton}>
                    <AntDesign name='ellipsis1' size={25} color='#000' />
                </TouchableOpacity>
            )}
            {hidden && (
                <View style={styles.deleteButtonContainer}>
                    <TouchableOpacity onPress={handleDeletePost} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Xóa</Text>
                    </TouchableOpacity>
                </View>
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
                <TouchableOpacity  style={styles.textContent}><Text style={styles.textContent}>{listpostStory[activeIndex]?.content}</Text></TouchableOpacity>
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
                }}>
                    <Animated.View style={{ transform: [{ rotate: spinAnimation }] }}>
                        <FontAwesome6 name='face-smile' size={30} color="black" style={styles.smileIcon} />
                    </Animated.View>
                </TouchableOpacity>
            </View>
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
    deleteButtonContainer: {
        padding: 4,
        width: 80,
        height: 30,
        backgroundColor: "#E9E6E6",
        position: 'absolute',
        top: '5%',
        right: '5%',
        zIndex: 3132,
    },
    deleteButton: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 2,
        backgroundColor: '#fff',
        height: "100%",
        width: "100%",
    },
    deleteButtonText: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageContent: {
        fontSize: 30,
        color: '#fff',
        position: 'absolute',
        top: '50%',
        left: '25%',
    },
    textContent: {
        fontSize: 30,
        color: "#000",
        position: 'absolute',
        top: '40%',
        left: '25%',
        zIndex:99999999,
        backgroundColor:'red'
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
});

export default ProgressBarScreen;
