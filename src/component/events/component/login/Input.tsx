import { StyleSheet, Text, View,Image,TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Input = (props: { secureTextEntry?: any; password?: any; value?: any; iconE?: any; iconPass?: any; placeholder?: any; onChangeText?: any;iconP?: any; }) => {
    const { secureTextEntry, password, value, iconE,iconP, iconPass,placeholder,onChangeText } = props;
    const [hidePassword, setHidePassword] = useState(iconP);



    function IconPasswordController() {
        console.log("lum");
        
        if (hidePassword) {
            setHidePassword(false)
        } else {
            setHidePassword(true)
        }
    }
    return (
        <View style={{ marginBottom: 5 }}>
            <TextInput style={styles.passwordInput} secureTextEntry={hidePassword} value={value} onChangeText={onChangeText} placeholder={placeholder} />
            {iconE && <Image style={styles.iconMail} source={require('../../../../media/icon/Mail.png')} />}
            {iconP && <Image style={styles.iconMail} source={require('../../../../media/icon/Password.png')} />}
            {iconPass && <TouchableOpacity onPress={IconPasswordController} style={{ end: 10, position: 'absolute', top: 20 }}><Image  source={require('../../../../media/icon/Eye.png')} /></TouchableOpacity>}
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    passwordInput: {
        height: 56,
        marginTop: 4,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#9BA4B5',
        marginVertical: 10,
        paddingHorizontal: 45

    },
    iconMail: {
        position: 'absolute',
        top: 20,
        start: 10
    }
})