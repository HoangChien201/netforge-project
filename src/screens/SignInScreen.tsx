import { Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { COLOR } from '../constant/color';
import Form from '../component/form/Form';
import ModalPoup from '../component/Modal/ModalPoup';
import { navigationType } from '../component/stack/UserStack';

const SignupScreen: React.FC = () => {
    const [modal, setModal] = useState(false);
    const navigation = useNavigation<navigationType>();

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={COLOR.PrimaryColor} />
            <View style={styles.container}>
                <View style={ styles.viewToolbar}>
                    <View style={[styles.viewAll]}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBack}>
                            <Ionicon name='arrow-back' size={24} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.labelLogin}>Tạo tài khoản</Text>
                    </View>
                    <View style={styles.viewAll}></View>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.viewContent}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollView}
                        keyboardShouldPersistTaps="handled"
                    >
                        <Text style={{ marginBottom: 10, marginHorizontal: 10, fontSize: 28, color: "black", fontWeight: "bold" }}>Xin Chào</Text>
                        <View style={{ marginBottom: 10, margin: 10 }}>
                            <Text style={{ flexWrap: 'wrap', fontFamily: '800' }}>
                                Tạo tài khoản để tiếp tục khám phá những điều tuyệt vời <Text>các điểm đến trên khắp thế giới!</Text>
                            </Text>
                        </View>
                        <Form setModal={setModal} />
                        <View style={styles.text}>
                            <Text style={{ color: "black" }}>Bạn đã có tài khoản?</Text>

                         <Pressable onPress={()=>navigation.goBack()}>
                         <Text style={{ fontSize: 15, color: COLOR.PrimaryColor, fontWeight: "bold" }}> Đăng nhập</Text>
                         </Pressable>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <View style={{  bottom: 30 }}>
                                <Text style={{ textAlign: "center", color: "black" }}>Bằng cách tạo một tài khoản, bạn đồng ý với</Text>
                                <Text style={{ color: "black" }}>
                                    <Text style={{ color: COLOR.PrimaryColor }}>Điều khoản & Điều kiện</Text> và đồng ý <Text style={{ color: COLOR.PrimaryColor }}>Chính sách bảo mật</Text>
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <ModalPoup visible={modal} text='Đăng kí thành công' />
            </View>
        </>
    );
}

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.PrimaryColor,
    },
    iconBack: {
    },
    viewToolbar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:'space-between',
        height:55,
        paddingHorizontal:20
    },
    viewAll: {
        width:24
    },
    labelLogin: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 24,
    },
    viewContent: {
        backgroundColor: "#ffff",
        flex: 1,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        padding: 18
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    text: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        marginTop: 10
    }
});
