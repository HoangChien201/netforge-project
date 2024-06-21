import { Image, KeyboardAvoidingView, Modal, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR } from '../constant/color'
import ModalPoup from '../component/Modal/ModalPoup'
import FormLogin from '../component/formlogin/FormLogin'
import ButtonImage from '../component/formlogin/ButtonImage'
import ModalFail from '../component/Modal/ModalFail'
import Loading from '../component/Modal/Loading'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { UserRootStackEnum, UserRootStackParams } from '../component/stack/UserRootStackParams'
import { navigationType } from '../component/navigation/ManageNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AxiosInstance from '../http/AxiosInstance'
import { useMyContext } from '../component/navigation/UserContext'
//import TouchId from '../component/Modal/TouchId'
const LoginScreen = () => {
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const [showModal, setShowModal] = useState(false)
    const [status, setStatus] = useState(true);;
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(true)
    const hanlerRegiter = () => {
        navigation.navigate(UserRootStackEnum.SignUp);
    }
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={COLOR.primary200} />
            <View style={styles.container}>
                <View style={{ flexDirection: "row", paddingVertical: 75,width:'100%' }}>
                    <View style={{ position: "absolute", right: 0, top: 0,flex:0.5 }}>
                        <Image source={require('../media/Dicons/Ellipse.png')} />
                    </View>
                    <View style={[styles.viewAll]}>
                        <Text style={styles.labelLogin}>Đăng nhập</Text>
                    </View>
                  
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'null'} style={styles.viewContent}>
                    <Loading isLoading={isLoading} />
                    <FormLogin setIsLoading={setIsLoading} setStatus={setStatus} setModal={setShowModal} />
                    <View style={{ alignItems: "center", padding: 10 }}>
                        <Text>Nếu bạn chưa có tài khoản ?<Text onPress={hanlerRegiter} style={{ color: COLOR.primary200 }}> Đăng kí</Text></Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                        <View style={{ height: 0.2, backgroundColor: "black", width: "36%" }}></View>
                        <View style={{ width: "29%" }}>
                            <Text style={{ textAlign: 'center', paddingHorizontal: 2 }}>hoặc</Text>
                        </View>
                        <View style={{ height: 0.2, backgroundColor: "black", width: "36%" }}></View>
                    </View>
                    <View style={{ justifyContent: 'center', paddingVertical: 20,paddingHorizontal:110}}>
                        <ButtonImage children='Google' source={require('../media/icon/Google.png')} style={styles.buttonImage} />
                    </View>
                </KeyboardAvoidingView>
                {status ? (
                    <ModalPoup text="Đăng nhập thành công" visible={showModal} />
                ) : (
                    <ModalFail text="Sai thông tin đăng nhập" visible={showModal} />
                )}
                {/* <TouchId visible={visible} setVisible={setVisible}/> */}
            </View>
        </>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.primary200,

    },
    image: {
        width: 20,
        height: 15,
        tintColor: "white"
    },
    viewToolbar: {
        flexDirection: "row", alignItems: "center"
    },
    viewAll: {
        flex: 1,
        bottom:0,
        
     
    },
    labelLogin: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 40,
        paddingLeft: 30,
      
    },
    viewContent: {
        backgroundColor: "#ffff", flex: 1, marginTop: 15, borderTopEndRadius: 30, borderTopStartRadius: 30, padding: 18
    },
    text: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        marginTop: 10
    },
    buttonImage: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 6,
        height: 50,
        backgroundColor: 'rgba(225,225,225,0.1)',
        width: '100%',
        
        
    }
})