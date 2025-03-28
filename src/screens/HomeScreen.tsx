import React, { useCallback, useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Image, Text, TouchableOpacity, ScrollView, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import TouchID from 'react-native-touch-id';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import ListStory from '../component/storys/ListStory';
import ListPorts from '../component/listpost/ListPorts';
import { COLOR } from '../constant/color';
import TouchId from '../component/Modal/TouchId';
import { NetworkRootStackEnum } from '../component/stack/NetworkRootStackParams';
import CaptionSlide from '../component/listpost/CaptionSlide';
import { RootState } from '../component/store/store';
import ModalShowBirthday from './profile/ModalShowBirthday';
import { updateIsDisplay } from '../component/store/displayReactionSlice';

const HomeScreen = () => {
    const initialData = [{ key: 'stories' }, { key: 'posts' }];
    const [data, setData] = useState(initialData);
    const scrollY = useRef(new Animated.Value(0)).current;
    const tabBarTranslateY = useRef(new Animated.Value(0)).current;
    const [refreshing, setRefreshing] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.user.value)
    const [visible, setVisible] = useState(false);
    const [isShowBirthday, setIsShowBirthday] = useState(false)
    const dispatch = useDispatch();

    const checkTouchIdLogin = () => {
        TouchID.isSupported()
            .then(async biometryType => {
                if (biometryType === 'FaceID') {
                    console.log('FaceID isSupported');
                } else {
                    console.log('TouchID isSupported');
                    try {
                        const checkDontAskTouch = await AsyncStorage.getItem('cancelBiometric');
                        const check = await AsyncStorage.getItem('touch');
                        if (check !== 'true' && checkDontAskTouch !== 'false') {
                            setVisible(true);
                        }
                    } catch (error) {
                        console.error('Error checking touch ID login:', error);
                    }
                }
            })
            .catch(error => {
                console.log('TouchID not supported', error);
            });
    };

    useEffect(() => {
        checkTouchIdLogin();

        AsyncStorage.getItem(`isShowBirthday-${user?.id}`).then(asyncStorageRes => {
            console.log(!asyncStorageRes);
            
            setIsShowBirthday(!asyncStorageRes)

        });
        

        
    }, []);

    useEffect(() => {
        const listener = tabBarTranslateY.addListener(({ value }) => {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#1F1F2F',
                    margin: 20,
                    borderRadius: 15,
                    display: 'flex',
                    transform: [{ translateY: value }],
                    transitionProperty: 'transform',
                    transitionDuration: '150ms',
                    transitionTimingFunction: 'ease-in-out',
                },
            });
        });

        return () => {
            tabBarTranslateY.removeListener(listener);
        };
    }, [tabBarTranslateY, navigation]);

    const handleScroll = ({ nativeEvent }) => {
        const offsetY = nativeEvent.contentOffset.y;
        if (offsetY - prevScrollY > 10) {
            Animated.timing(tabBarTranslateY, {
                toValue: 100,
                duration: 80,
                useNativeDriver: true,
            }).start();
            handleOutsidePress(); // Ẩn menu khi cuộn xuống
        } else if (prevScrollY - offsetY > 10) {
            Animated.timing(tabBarTranslateY, {
                toValue: 0,
                duration: 70,
                useNativeDriver: true,
            }).start();
            handleOutsidePress(); // Ẩn menu khi cuộn lên
        }

        setPrevScrollY(offsetY);
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };
    useFocusEffect(
        useCallback(() => {
            setHidden(false)
        }, [])
    )
    const renderItem = useCallback(
        ({ item }) => {
            if (item.key === 'stories' || item.key.startsWith('new_post')) {
                return (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.storyContainer}>
                            <View style={styles.borderContainer}>
                                <ImageBackground source={{ uri: user?.avatar }} style={styles.imageBackground} imageStyle={styles.imageStyle}>
                                    <TouchableOpacity
                                        style={styles.avt1}
                                        onPress={() => {
                                            navigation.navigate(NetworkRootStackEnum.CreateStoris);
                                        }}
                                    >
                                        <AntDesignIcon name='pluscircle' color={COLOR.PrimaryColor1} size={22} style={styles.iconCenter} />
                                    </TouchableOpacity>
                                    <Text style={{ bottom: -15, color: "#fff", fontSize: 13, fontWeight: 'bold' }}>Tạo tin</Text>
                                </ImageBackground>
                            </View>
                            <ListStory onrefresh={refreshing} />
                        </View>
                    </ScrollView>
                );
            } else if (item.key === 'posts' || item.key.startsWith('new_post')) {
                return <ListPorts onrefresh={refreshing} />;
            }
            return null;
        },
        [refreshing, navigation, user?.avatar]
    );

    const handlerClick = () => {
        setHidden(prev => !prev);
    };

    // Hàm để ẩn menu khi chạm ra ngoài hoặc cuộn
    const handleOutsidePress = () => {
        if (hidden) {
            setHidden(false);
           
        }
    };



    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={styles.container}>
                <TouchId visible={visible} setVisible={setVisible} />
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>
                        <Image source={require('../media/quyet_icon/netforge1.jpg')} style={styles.logo} />
                        <Text style={styles.headerTitle}>NetForge</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('ExploreScreen')}>
                            <AntDesignIcon name='search1' size={22} color='#000' style={styles.iconCenter} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={handlerClick}>
                            <Image source={{ uri: user?.avatar }} style={styles.userAvatar} />
                        </TouchableOpacity>
                    </View>
                    {hidden && (
                        <View style={styles.hiddenMenu}>
                            <View style={styles.hiddenMenuContent}>
                                <TouchableOpacity style={styles.hiddenMenuItem} onPress={() => navigation.navigate('Scanner')}>
                                    <MaterialCommunityIcons name='qrcode-scan' size={25} />
                                    <Text style={styles.hiddenMenuText}>Mở máy ảnh</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.hiddenMenuItem} onPress={() => navigation.navigate('QRcodeScreen')}>
                                    <MaterialCommunityIcons name='qrcode' size={25} />
                                    <Text style={styles.hiddenMenuText}>Mã QR của tôi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                </View>
                <View style={{ marginHorizontal: 12, flexDirection: 'row', alignItems: 'center' }}>

                    <CaptionSlide userimge={user?.avatar} />
                </View>
                <View style={styles.contentContainer}>
                    <Animated.FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.key}
                        showsVerticalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false, listener: handleScroll }
                        )}
                        onEndReachedThreshold={0.5}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                </View>
                {
                    isShowBirthday &&
                    <ModalShowBirthday/>
                }
            </View>
        </TouchableWithoutFeedback>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    headerContainer: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginEnd: 5,
    },
    headerTitle: {
        color: COLOR.PrimaryColor,
        fontSize: 20,
        fontWeight: 'bold',
    },
    hiddenMenu: {
        zIndex: 9999,
        borderRadius: 8,
        padding: 5,
        width: 150,
        height: 100,
        position: 'absolute',
        right: 10,
        backgroundColor: 'rgba(155,155,155,0.4)',
        top: '80%',
    },
    hiddenMenuContent: {
        borderRadius: 8,
        backgroundColor: '#fff',
        flex: 1,
        padding: 5,
    },
    hiddenMenuItem: {
        flex: 1,
        margin: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    hiddenMenuText: {
        fontSize: 15,
        color: '#000',
        marginHorizontal: 5,
    },
    headerRight: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    userAvatar: {
        width: 30,
        height: 30,
        borderWidth: 0.5,
        borderRadius: 50,
        borderColor: '#000',
    },
    userName: {
        textAlign: 'center',
        fontSize: 10,
        color: '#000',
        fontWeight: 'bold',
        margin: 1,
    },
    qrIcon: {
        width: 30,
        height: 30,
    },
    contentContainer: {
        height: '90%',
        width: '100%',
    },
    storyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 7,
        margin: 5
    },
    border: {
        padding: 5,
    },
    avt1: {
        justifyContent: 'center',
        width: 70,
        height: 70,
        resizeMode: 'cover',
    },
    iconCenter: {
        textAlign: 'center',
    },
    borderContainer: {
        width: 100,
        height: 148,
        borderRadius: 7,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: COLOR.PrimaryColor
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        borderRadius: 6,
    },
});
