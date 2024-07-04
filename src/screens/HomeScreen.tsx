import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Image, Text, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import ListStory from '../component/storys/ListStory';
import ListPorts from '../component/listpost/ListPorts';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { COLOR } from '../constant/color';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Touchable } from 'react-native';
import ActionBar from '../component/listpost/ActionBar';

import { NavigateRootStackEnum } from '../component/stack/StackNavigate';
import { NetworkRootStackEnum, NetworkRootStackScreens } from '../component/stack/NetworkRootStackParams';
import { useMyContext } from '../component/navigation/UserContext';
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
    const [hidden,setHidden]= useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const navigation = useNavigation();
    // function navigationScreen(screen: string) {
    //     navigation.navigate(`${screen}`)
    //   }
    const isFocused = useIsFocused();
    const {user}= useMyContext()
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
            return <ScrollView  horizontal showsHorizontalScrollIndicator={false}>
               <View style={{flexDirection:'row',alignItems:'center'}}>
               <View style={styles.border}>
                    <TouchableOpacity
                    style={styles.avt1}
                        onPress={() => {
                            navigation.navigate(NetworkRootStackEnum.CreateStoris)  
                        }}
                    >
                       
                        <AntDesignIcon name='plus' size={22} style={[ { textAlign:'center' }]} />
                    </TouchableOpacity>

                </View>
                <ListStory onrefresh={refreshing} />
               </View>

            </ScrollView>
        } else if (item.key === 'posts' || item.key.startsWith('new_post')) {
            return <ListPorts onrefresh={refreshing} />;
        }
        return null;
    }, [refreshing]);
    const handlerClick = ()=>{
        setHidden(pre=>!pre)
    }

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
               {
                hidden &&  <View style={{ borderRadius:8,padding:5,width:150,height:100,position:'absolute',right:10,backgroundColor:'rgba(155,155,155,0.4)',top:'80%' }}>
                <View style={{borderRadius:8,backgroundColor:'#fff',flex:1,padding:5}}>
                <TouchableOpacity style={{flex:1,margin:4,flexDirection:'row',alignItems:'center'}}>
                       <MaterialCommunityIcons name='qrcode-scan' size={25}  />
                       <Text style={{fontSize:15,color:'#000',marginHorizontal:5}}>Mo may anh</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{flex:1,margin:4,flexDirection:'row',alignItems:'center'}}>
                   <MaterialCommunityIcons name='qrcode' size={25}  />
                       <Text style={{fontSize:15,color:'#000',marginHorizontal:5}}>Ma QR cua toi</Text>
                   </TouchableOpacity>
                </View>
               </View>
               }
                <View style={{ flex: 0.2,justifyContent:'center',alignItems:'center',marginLeft:10 }}>
                    <TouchableOpacity onPress={handlerClick}>
                        <Image source={{uri:user.avatar}} style={{ width: 30, height: 30,borderWidth:0.5,borderRadius:50,borderColor:'#000' }} />
                        <Text style={{textAlign:'center',fontSize:10,color:'#000',fontWeight:'bold',margin:1}}>{user.fullname}</Text>
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
            <View style={{ height: '90%', width: '100%'}}>
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
    avt: {
        width: 70,
        height: 70,
        borderRadius: 50,
        resizeMode: 'cover',
        borderWidth: 4,

    },
    border: {
        padding: 5,
    
    },
     avt1: {
        justifyContent:'center',
        width: 70,
        height: 70,
        borderRadius: 50,
        resizeMode: 'cover',
        borderWidth: 2,

    },
});
