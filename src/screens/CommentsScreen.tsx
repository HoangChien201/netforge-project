import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useMemo, useState, useRef } from 'react'
import { COLOR } from '../constant/color'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const CommentsScreen = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
    const Close = () => {
        bottomSheetRef.current?.close();
    }
    return (
        <View style={styles.container}>
           <View style = {styles.UserContai}>
           <View style = {styles.ViewUser}>
            <TouchableOpacity onPress={() => Close()}>
            <Image source={require('../media/icon/Back.png')} style = {styles.IconBack}/>
            </TouchableOpacity>
            
            <Image source={require('../media/icon/phuking.jpg')} style = {styles.imageUser}/>
            <View style = {styles.ViewNameUser}>
                <Text style = {styles.NameUser}>Le Thanh Tuong</Text>
                <Text style = {styles.Status}>đã đăng 1 bài viết</Text>
            </View>
           
            <TouchableOpacity>
            <Image style = {styles.iconOption} source={require('../media/quyet_icon/down_b.png')}/>
            </TouchableOpacity>
            
           </View>
           </View>
            <View style={styles.ViewConmments}>
            <KeyboardAvoidingView style = {{flex: 1}} keyboardVerticalOffset={60} behavior={Platform.OS === "ios" ? "padding" :undefined}>
                <View style={styles.ViewSendCmt}>
                    <TouchableOpacity>
                        <Image style={styles.ImageCmt} source={require('../media/quyet_icon/camera_b.png')} />
                    </TouchableOpacity>
                    
                        <View style={styles.boderInput}>
                            <TextInput placeholder='Nhập bình luận của bạn....' style={styles.inputSend}>

                            </TextInput>

                        </View>
                    
                    <TouchableOpacity style={styles.btnSend}>
                        <Image source={require('../media/quyet_icon/add-picture_.png')} />
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>

            </View>

        </View>


    )
}

export default CommentsScreen

const styles = StyleSheet.create({
    UserContai:{
        borderBottomWidth: 1,
        borderBottomColor: '#989898'
    },
    iconOption:{
        width: 28,
        height: 28
    },
    Status:{
        fontSize: 13,
        fontWeight: '600',
        color: 'gray'
    },
    NameUser:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    ViewNameUser:{
        marginStart: -158,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageUser:{
        marginStart: -160,
        width: 45,
        height: 45,
        borderRadius: 100
    },
    IconBack:{
        width: 28,
        height: 28
    },
    ViewUser:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        
    },
    boderInput: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 280,
        backgroundColor: 'white',
        borderRadius: 50,

        height: 40
    },
    btnSend: {
        marginRight: 10
    },
    inputSend: {
        width: 250
    },
    ImageCmt: {
        marginStart: 10

    },
    ViewSendCmt: {
        backgroundColor: '#F4F4F4',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',

    },

 

    ViewConmments: {
        
        
        


    },
    container: {
   
        

    }
})