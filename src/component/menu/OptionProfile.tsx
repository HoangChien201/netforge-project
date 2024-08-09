import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NetworkStackNavigationProp } from '../stack/NetworkRootStackParams'
import { NavigateToMessage } from '../message/NavigateToMessage'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../store/userSlice'
import { socket } from '../../http/SocketHandle'

const OptionProfile = () => {
    const dispatch = useDispatch()
    const navigation: NetworkStackNavigationProp = useNavigation()

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

    function navigationScreen(screen: string) {
        navigation.navigate(`${screen}`)
    }

    async function LogoutHandle() {
        const keysToRemove = [
            'keep',
            'email',
            'password',
            'touch',
            'cancelBiometric',
            'TokenForgot',
            'liveID'
        ];
        try {
            await AsyncStorage.multiRemove(keysToRemove);
            socket.disconnect()
            dispatch(deleteUser());
            console.log('Selected items removed from AsyncStorage');
        } catch (error) {
            console.error('Error clearing selected items from AsyncStorage:', error);
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