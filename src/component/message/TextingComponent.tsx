import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLOR } from '../../constant/color';
import { user } from '../../screens/message/MessageScreen';

const TextingComponent = ({addMessage}:{addMessage:any}) => {
    const [valueInput, setValueInput] = useState<string>()

    function onSubmit() {
        const message={
            "id": new Date().getTime(),
            "create_at": new Date().toISOString(),
            "update_at": new Date().toISOString(),
            "state": 1,
            "type": "text",
            "message": valueInput,
            "sender": user.id,
            "reactions": []
          }
          addMessage(message)
          setValueInput('')
    }

    function CameraPress() {

        console.log('video');

    }

    function OnChangeText(text:string){
        setValueInput(text)
    }
    function IconButton({ name, size, color, type }: { name: string, size: number, color: string, onPress?: any, type: string }) {

        function OnPress(){
            if(type==='camera'){
                CameraPress()
                return
            }
            onSubmit()
        }

        return (
            <TouchableOpacity onPress={OnPress} style={styles.icon}>
                <MCIcon name={name} size={size} color={color} />
            </TouchableOpacity>
        )
    }

    
    return (
        <View style={styles.container}>
            <View style={styles.camera}>
                <IconButton name='camera-outline' size={30} color='#000' type='camera' />
            </View>
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder='Nhập'
                    value={valueInput}
                    multiline={true}
                    onChangeText={OnChangeText}
                />
            </View>
            <View style={styles.submitWrapper}>
                <IconButton name='send' size={30} color={COLOR.PrimaryColor} type='submit' />
            </View>
        </View>
    )
}

export default TextingComponent

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.9
    },
    camera: {
        flex: 0.1,
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    inputWrapper: {
        flex: 0.8,
        borderColor: '#000',
        borderRadius: 20,
        borderWidth: 1,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        minHeight: 40,

    },
    submitWrapper: {
        flex: 0.1,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 10
    },
    container: {
        backgroundColor: 'rgba(255,255,255,1)',
        flexDirection: 'row',
        alignItems: 'flex-end',
        minHeight: 50,
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})