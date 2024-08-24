import { Button, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { OtpInput } from 'react-native-otp-entry';
import ButtonLogin from '../component/form/ButtonLogin';
import { NavigationProp, ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { UserRootStackEnum } from '../component/stack/UserRootStackParams';
import { checkOTP } from '../http/PhuHTTP';
import Loading from '../component/Modal/Loading';
import ModalPoup from '../component/Modal/ModalPoup';
import ModalFail from '../component/Modal/ModalFail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR } from '../constant/color';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatTime } from '../format/FormatDate';

const OtpScreen = () => {
    const [textOTP, setTextOTP] = useState<string>('')
    const [number, setNumber] = useState<number>(120)

    const route: RouteProp<{ params: { email: string } }, 'params'> = useRoute();
    const { email } = route.params;

    useEffect(() => {
        let time: NodeJS.Timeout | undefined;
        if (number > 0) {
            time = setTimeout(() => {
                setNumber(pre => pre - 1)

            }, 1000);
        }
        return () => clearTimeout(time);
    }, [number])

    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState(true);
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const showModalFalse = () => {
        setShowModal(true);
        setStatus(false);
        setTimeout(() => {
            setShowModal(false);
            setIsLoading(false);
        }, 2000);
    }

    const handleVerifyOtp = async () => {
        if (number <= 0) {
            showModalFalse();
            return
        }
        const token = await AsyncStorage.getItem('TokenForgot');
        try {
            const response = await checkOTP(parseInt(textOTP));
            setIsLoading(true);
            if (response) {
                setShowModal(true);
                setStatus(true);
                setIsLoading(false);
                setTimeout(() => {
                    setShowModal(false);
                    navigation.navigate(UserRootStackEnum.ResetPassword, { email });
                }, 2000);
            } else {
                showModalFalse();
            }
        } catch (error) {
            showModalFalse();
            console.log(error);
            console.log("lỗi check otp: ", error)
        }

    };


    return (
        <View style={styles.container}>
            <Loading isLoading={isLoading} />
            <View style={styles.viewToolbar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignItems: "center" }}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 75 }}>
                <View style={{ position: "absolute", right: 0, top: 0 }}>
                    <Image source={require('../media/Dicons/elip.png')} />
                </View>
                <View style={[styles.viewAll]}>
                    <Text style={styles.title}>Nhập mã OTP</Text>
                </View>
            </View>

            <KeyboardAvoidingView style={styles.viewContent}>
                <ScrollView>
                    <Loading isLoading={isLoading} />
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={styles.txt2}>
                            Nhập mã OTP được gửi về email.</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 15 }}></View>
                    <View style={styles.otpContainer}>
                        <OtpInput numberOfDigits={5}
                            focusColor="#E65B0C"
                            focusStickBlinkingDuration={500}
                            onTextChange={(text) => setTextOTP(text)}
                            onFilled={(text) => (`${text}`)}
                            theme={{
                                pinCodeContainerStyle: styles.pinCodeContainer,
                            }} />
                    </View>
                    <View style={styles.number}>
                        {/* <Text>Re-send code in</Text> */}
                        <Text style={{ color: number > 0 ? 'blue' : 'red', fontSize: 18 }}>{formatTime(number)}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 10 }}></View>
                    <View style={styles.btnOTP}>
                        <ButtonLogin textLogin chilren='Xác nhận OTP' textColor='#fff' onPress={handleVerifyOtp} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignItems: "center" }}>
                        <Text style={styles.txtResend}>Gửi lại</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

            {status ? (
                <ModalPoup text="OTP hợp lệ!" visible={showModal} />
            ) : (
                <ModalFail text="OTP không hợp lệ!" visible={showModal} />
            )}
        </View>
    )
}

export default OtpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: COLOR.PrimaryColor,
    },
    viewContent: {
        backgroundColor: "#ffff",
        flex: 1,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        paddingHorizontal: 18,
        paddingVertical: 35,
        alignItems: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    txt2: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#4e4b66'
    },
    pinCodeContainer: {
        width: '18%'
    },
    number: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 25,
        marginLeft: '80%',
    },
    btnOTP: {
        alignItems: 'center',
        marginTop: 20,
    },
    viewAll: {
        flex: 1,
    },
    title: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 36,
        paddingLeft: 30
    },
    viewToolbar: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingTop: 20,
    },
    iconBack: {
        // width: 20,
        // height: 15,
    },
    txtResend: {
        marginTop: 20,
        fontSize: 16,
        color: 'blue'
    },


})