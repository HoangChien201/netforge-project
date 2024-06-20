import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { COLOR } from '../../constant/color';
import UseMedia from './UseMedia';
import { useMyContext } from '../navigation/UserContext';

const TextingComponent = ({addMessage}:{addMessage:any}) => {
    const [valueInput, setValueInput] = useState<string>()
    const [media,setMedia] = useState<string>()
    const {user} = useMyContext()
    function onSubmit(messageArg?:any | null) {
        const message={
            "id": Math.floor(Math.random()*100),
            "create_at": new Date().toISOString(),
            "update_at": new Date().toISOString(),
            "state": 0,
            "type": "text",
            "message": valueInput,
            "sender": user.id,
            "reactions": []
          }
          
          addMessage(messageArg.id ? messageArg : message)
          setValueInput('')
    }



    function OnChangeText(text:string){
        setValueInput(text)
    }
    

    

    return (
        <View style={styles.container}>
            <UseMedia onSubmit={onSubmit}/>
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder='Nhập'
                    value={valueInput}
                    multiline={true}
                    onChangeText={OnChangeText}
                />
            </View>
            <View style={styles.submitWrapper}>
                <MCIcon name='send' size={30} color={COLOR.PrimaryColor} onPress={onSubmit}/>
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
        flex: 0.7,
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