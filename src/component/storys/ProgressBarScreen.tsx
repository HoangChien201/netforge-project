import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Animated, Easing, Text } from 'react-native';
import ProgressBar from './ProgressBar';
import Reaction from './Reaction';
import { COLOR } from '../../constant/color';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DateOfTimePost } from '../../format/DateOfTimePost';
import { deletePost } from '../../http/userHttp/getpost';
import { useNavigation } from '@react-navigation/native';

const ProgressBarScreen = ({ listpostStory, setCurrentIndex, currentIndex, dataLength }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [check, setCheck] = useState(false);
    const [data, setData] = useState(listpostStory);
    const [paused, setPaused] = useState(false);
    const[hidden,setHidden]= useState(false);
    const [showReactions, setShowReactions] = useState(new Animated.Value(0));
    const spinValue = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();


    const handleImagePressR = () => {
        if (check) {
            return;
        } else {
            if (activeIndex === data.length - 1) {
                if (currentIndex === dataLength) {
                    return;
                } else {
                    setCurrentIndex(currentIndex + 1);
                }
            } else {
                setActiveIndex((prevIndex) => prevIndex + 1);
            }
        }
    };

    const handleImagePressL = () => {
        if (check) {
            return;
        } else {
            if (activeIndex === 0) {
                if (currentIndex === 0) {
                    return;
                } else {
                    setCurrentIndex(currentIndex - 1);
                }
            } else {
                setActiveIndex((prevIndex) => prevIndex - 1);
            }
        }
    };

    const PressIn = () => {
        setCheck(true);
        setPaused(true);
    };

    const PressOut = () => {
        setCheck(false);
        setPaused(false);
    };

    const toggleReactions = () => {
        Animated.timing(showReactions, {
            toValue: showReactions._value === 0 ? 1 : 0,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    };

    const spin = () => {
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 250,
                easing: Easing.linear,
                useNativeDriver: true,
            }
        ).start(() => {
            spinValue.setValue(0);
        });
    };

    const spinAnimation = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    const handleClick = ()=>{
        console.log("dkfjds",data[activeIndex].id);
        setHidden(pre=>!pre);
        
    }
    const handleDeletePost = async ()=>{
       try {
            const result = await deletePost(data[activeIndex].id);        
                navigation.goBack();
            
         
       } catch (error) {
            throw error;
       }
    }

    return (
        <View style={styles.container}>
             <TouchableOpacity onPress={handleClick} style={{  position: 'absolute', top: '2%', left: '35%',zIndex:3132 }}>
                         <AntDesign name='ellipsis1' size={25} color='#fff' />
            </TouchableOpacity>
          {
            hidden &&   <View style={{  padding:4,width:80,height:30,backgroundColor:"#E9E6E6",position: 'absolute', top: '5%', left: '45%',zIndex:3132 }}>
            <TouchableOpacity onPress={handleDeletePost} style={{borderColor:'#fff',borderWidth:1,borderRadius:2,backgroundColor:'#fff',height:"100%",width:"100%"}} >
                <Text style={{color:'#000',fontWeight:'bold',textAlign:'center'}}>xoa</Text>
            </TouchableOpacity>
        </View>
          }
            {
                data[activeIndex]?.media[0]?.url ?
                  <>
                    <Image source={{ uri: data[activeIndex]?.media[0]?.url }} style={styles.fullscreenImage} />
                    <Text style={{ fontSize: 30, color: '#fff', position: 'absolute', top: '50%', left: '25%' }}>{data[activeIndex]?.content}</Text>
                    <Text style={{ color: 'white', position: 'absolute', top: '5%', left: '20%' }}>{DateOfTimePost(data[activeIndex].create_at)}</Text>
                   
                  </> : <View style={styles.fullscreenImage1}>
                    
                        <Text style={{ fontSize: 30, color: "#000", position: 'absolute', top: '40%', left: '25%' }}>{data[activeIndex]?.content}</Text>
                        <Text style={{ color: 'white', position: 'absolute', top: '5%', left: '20%' }}>{DateOfTimePost(data[activeIndex].create_at)}</Text>
                    </View>
            }

            <View style={styles.progressBarContainer}>
                {data.map((item, index) => (
                    <ProgressBar
                        paused={paused}
                        dataLength={dataLength}
                        setcurrentIndex={setCurrentIndex}
                        currentIndex={currentIndex}
                        key={item.id}
                        index={index}
                        active={activeIndex}
                        setActi={setActiveIndex}
                        length={data.length - 1}
                    />
                ))}
            </View>

            <View style={{ flexDirection: 'row', position: 'absolute', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0)', width: '100%' }}>
                <TouchableOpacity style={styles.button} onLongPress={PressIn} onPressOut={PressOut} onPress={handleImagePressL} />
                <TouchableOpacity style={styles.button} onLongPress={PressIn} onPressOut={PressOut} onPress={handleImagePressR} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', position: 'absolute', bottom: 10, right: 10 }}>
                <Animated.View style={[styles.reactionContainer, {
                    width: showReactions.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '80%'],
                    })
                }]}>
                    <Reaction />
                </Animated.View>
                <TouchableOpacity onPress={() => {
                    spin();
                    toggleReactions();
                }}>
                    <Animated.View style={{ transform: [{ rotate: spinAnimation }] }}>
                        <FontAwesome6 name='face-smile' size={30} color="black" style={{ marginHorizontal: 10 }} />
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
        height: 50,
        paddingTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(105,105,105,0.5)',
        overflow: 'hidden',
    },
});

export default ProgressBarScreen;
