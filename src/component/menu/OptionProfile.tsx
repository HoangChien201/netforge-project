import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { navigationType } from '../../navigation/ManageNavigation'
import { useNavigation } from '@react-navigation/native'
import { useMyContext } from '../navigation/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const OptionProfile = () => {
    const navigation = useNavigation()
    const { setUser } = useMyContext();
    function OptionHorizontalItem({ image, text, onPress }: { image: any, text: string, onPress?: any }) {
        return (
            <TouchableOpacity style={styles.optionHorizontalItem} onPress={onPress}>
                <Image source={image} />
                <Text style={{ color: "#000", fontSize: 12, fontWeight: '400' }}>{text}</Text>
            </TouchableOpacity>
        )
    }

    function OptionVerticalItem({ text, onPress }: { text: string, onPress?: any }) {
        return (
            <TouchableOpacity style={styles.optionVerticalItem} onPress={onPress}>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: '700' }}>{text}</Text>
                <Image source={require('../../media/icon/icon-arrow-br-right.png')} />
            </TouchableOpacity>
        )
    }

    function OptionTextItem({ text, onPress }: { text: string, onPress?: any }) {
        return (
            <TouchableOpacity style={styles.optionTextItem} onPress={onPress}>
                <Text style={{ color: "#000", fontSize: 17, fontWeight: '400' }}>{text}</Text>
            </TouchableOpacity>
        )
    }

    function navigationScreen(screen: string) {
        navigation.navigate(`${screen}`)
    }

    async function LogoutHandle() {
        setUser(null)
        try {
            await AsyncStorage.clear();
            console.log('All items removed from AsyncStorage');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }

    }
    //message

    //type members
    //   members:Array<{
    //     user:{
    //         fullname:string,
    //         avatar:string,
    //         id:number
    //     }
    // }>,

    function messageOnPress() {
        navigation.navigate('MessageStack',
            {
                screen: "ListMessageScreen", 
                params:{ 
                        fullname: "Tran Van Phu",
                        avatar: 'https://res.cloudinary.com/delivery-food/image/upload/v1718215509/hrsezngadfqzy9m1xs3s.jpg',
                        members: [
                            {
                                user: {
                                    fullname: 'Tran Van Phu',
                                    id: 3,
                                    avatar: 'https://res.cloudinary.com/delivery-food/image/upload/v1718215509/hrsezngadfqzy9m1xs3s.jpg'
                                }
                            }
                        ]
                    }
            })
    }


    //message
    return (
        <View style={styles.container}>
            <View style={styles.optionHorizontal}>
                <OptionHorizontalItem
                    text='Thông báo'
                    image={require('../../media/icon/bell.png')}
                    onPress={messageOnPress}
                />
                <OptionHorizontalItem
                    text='Cài đặt'
                    image={require('../../media/icon/setting.png')}
                    onPress={navigationScreen.bind(this, 'SettingScreen')}
                />
            </View>
            <View style={styles.optionVertical}>
                <OptionVerticalItem text='Bạn bè' onPress={navigationScreen.bind(this, 'FriendScreen')} />
                <OptionVerticalItem text='Lịch sử hoạt động' onPress={navigationScreen.bind(this, 'HistoryStack')} />
                <OptionVerticalItem text='Giúp đỡ' onPress={navigationScreen.bind(this, 'HelpScreen')} />
                <OptionVerticalItem text='Đăng xuất' onPress={LogoutHandle} />

            </View>
        </View>
    )
}

export default OptionProfile

const styles = StyleSheet.create({
    container: {},
    optionHorizontal: {
        height: 54,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 36
    },
    optionHorizontalItem: {
        height: '100%',
        width: 75,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionVertical: {
        height: 300,
        justifyContent: "space-between"
    },
    optionVerticalItem: {
        paddingHorizontal: 20,
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    optionText: {
        height: 136,
        justifyContent: 'space-between',
        marginTop: 10
    },
    optionTextItem: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        paddingHorizontal: 10,

    },

})