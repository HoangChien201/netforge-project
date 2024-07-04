import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Image, Text, Pressable, TouchableOpacity } from 'react-native';
import ListStory from '../component/storys/ListStory';
import ListPorts from '../component/listpost/ListPorts';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { COLOR } from '../constant/color';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { Touchable } from 'react-native';
import ActionBar from '../component/listpost/ActionBar';
import { ProfileRootStackEnum } from '../component/stack/ProfileRootStackParams';
import { HomeRootStackEnum } from '../component/stack/HomeRootStackParams';
import TouchId from '../component/Modal/TouchId';
import TouchID from 'react-native-touch-id';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
    const initialData = [{ key: 'stories' }, { key: 'posts' }];
    const [data, setData] = useState(initialData);
    const scrollY = useRef(new Animated.Value(0)).current;
    const tabBarTranslateY = useRef(new Animated.Value(0)).current;
    const [refreshing, setRefreshing] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const navigation = useNavigation();
    // function navigationScreen(screen: string) {
    //     navigation.navigate(`${screen}`)
    //   }
    const isFocused = useIsFocused();
    const [visible, setVisible] = useState(false);
    const checkTouchIdLogin = () => {
        TouchID.isSupported().then(async biometryType => {
            if (biometryType === 'FaceID') {
                console.log('FaceID isSupported');
            } else {
                console.log('TouchID isSupported');
                try {
                    const checkDontAskTouch = await AsyncStorage.getItem('cancelBiometric');
                    const check = await AsyncStorage.getItem('touch')
                    if (check != 'true' && checkDontAskTouch != 'false') {
                        setVisible(true);
                    }
                } catch (error) {
                    console.error('Error checking touch ID login:', error);
                }
            }
        }).catch(error => {
            console.log('TouchID not supported', error);
        });


    };
    useEffect(() => {

        checkTouchIdLogin();
    }, [])
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
                },
            });
        });

        return () => {
            tabBarTranslateY.removeListener(listener);
        };
    }, [navigation, tabBarTranslateY]);

    const handleScroll = ({ nativeEvent }) => {
        const offsetY = nativeEvent.contentOffset.y;
        if (offsetY > prevScrollY) {
            Animated.timing(tabBarTranslateY, {
                toValue: 100,
                duration: 150,
                useNativeDriver: true,
            }).start();
        } else if (offsetY < prevScrollY) {
            Animated.timing(tabBarTranslateY, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }).start();
        }

        setPrevScrollY(offsetY);
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const renderItem = useCallback(({ item }) => {
        if (item.key === 'stories' || item.key.startsWith('new_post')) {
            return <ListStory />;
        } else if (item.key === 'posts' || item.key.startsWith('new_post')) {
            return <ListPorts onrefresh={refreshing} />;
        }
        return null;
    }, [refreshing]);
    const handleToScanner = () => {
        navigation.navigate(HomeRootStackEnum.Scanner);
    }
    return (
        <View style={styles.container}>
            <TouchId visible={visible} setVisible={setVisible} />
            <View style={{ width: '100%', height: '10%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingHorizontal: 5 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../media/quyet_icon/netforge1.jpg')} style={{ width: 40, height: 40, borderRadius: 50, marginEnd: 5 }} />
                    <Text style={{ color: COLOR.PrimaryColor, fontSize: 20, fontWeight: 'bold' }}>NetForge</Text>
                </View>
                <View style={{ flex: 0.1, marginRight: 10 }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('ExploreScreen')}>
                        <Image source={require('../media/icon_tuong/searchcolor.png')} style={{width:30,height:30}}/>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.1, marginRight: 12 }}>
                    <TouchableOpacity>
                        <Image source={require('../media/Dicons/qr-code.png')} style={{width:30,height:30}}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: '90%', width: '100%' }}>
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
                />
            </View>

        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
});
