import { Image, KeyboardAvoidingView, Modal, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../constant/color'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Form from '../component/form/Form'
import ModalPoup from '../component/Modal/ModalPoup'
import FormLogin from '../component/formlogin/FormLogin'
import ButtonImage from '../component/formlogin/ButtonImage'

const LoginScreen: React.FC = () => {
    const [showModal,setShowModal] = useState(false)
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={COLOR.primary200} />
            <View style={styles.container}>
                <View style={{ flexDirection: "row", paddingVertical: 75 }}>
                    <View style={{position:"absolute",right:0,top:0}}>
                        <Image source={require('../media/Dicons/Ellipse.png')}/>
                    </View>
                    <View style={[styles.viewAll]}>
                        <Text style={styles.labelLogin}>Login</Text>
                    </View>
                    <View style={styles.viewAll}></View>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'null'} style={styles.viewContent}>
                   
                    <FormLogin setModal={setShowModal}/>
                    <View style={{alignItems:"center",padding:10}}>
                        <Text>Don't have an account yet ? Register <Text style={{color:COLOR.primary200}}>Here</Text></Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:'center',alignItems:'center',padding:15}}>
                        <View style={{height:0.2,backgroundColor:"black",width:"36%"}}></View>
                        <View style={{width:"29%"}}>
                            <Text style={{textAlign:'center',paddingHorizontal:2}}>Or login with</Text>
                        </View>
                        <View style={{height:0.2,backgroundColor:"black",width:"36%"}}></View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:20}}>
                    <ButtonImage children='Facebook' source={require('../media/icon/Facebook.png')} style={styles.buttonImage}/>
                    <ButtonImage children='Google' source={require('../media/icon/Google.png')} style={styles.buttonImage}/>
                    </View>
                </KeyboardAvoidingView>
                <ModalPoup text='Đăng nhập thành công' visible={showModal} ></ModalPoup>
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
    },
    labelLogin: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 40,
        paddingLeft:30
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
    buttonImage:{
        paddingHorizontal:24,
        paddingVertical: 12,
        borderRadius: 6,
        height: 50,
        backgroundColor:COLOR.primary350,
        width:174
    }
})