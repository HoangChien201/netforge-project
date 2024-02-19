import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import Input from '../login/Input'

const Form = () => {
    const [fullname, setFullname] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confimPassword, setConfimPassword] = useState<string>('')
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView>
                <Input value={fullname} onChangeText={setFullname} placeholder='Full name' iconName={true} />
                <Input value={username} onChangeText={setUsername} placeholder='abc@gmail.com' iconE={true} />
                <Input value={password} onChangeText={setPassword} placeholder='password' iconP={true} iconPass={true} />
                <Input value={confimPassword} onChangeText={setConfimPassword} placeholder='password' iconP={true} iconPass={true} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Form

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
    container: {
        marginTop: 13
    },
    iconMail: {
        position: 'absolute',
        top: 20,
        start: 10
    }
})