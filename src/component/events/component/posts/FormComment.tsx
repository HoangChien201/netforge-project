import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import IconButton from './IconButton';
import ImageIcon from './ImageIcon';
const FormComment = ({ onPressCancle, submit }) => {
    //color-mode
    //
    const [value, setValue] = useState('');
    function Submit() {
        submit(value)
        setValue('')
    }
    return (
        <View style={[styles.formCommment]}>
            <View style={{
                flexDirection: 'row', justifyContent: "space-between", alignItems: 'center',
            }}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input]}
                        placeholder='Type your comment'
                        placeholderTextColor='#A0A3BD'
                        onChangeText={(text) => setValue(text)}
                        value={value}

                    />
                </View>
                <ImageIcon image={require('../../../../media/icon/send.png')} style={styles.buttonSend} onPress={Submit} />
            </View>

        </View>
    )
}

export default FormComment

const styles = StyleSheet.create({
    formCommment: {
        backgroundColor: 'transparent',
        height: 90,
        paddingHorizontal: 24,
        elevation: 8,
        justifyContent: 'center'


    },
    buttonSend: {
        backgroundColor: "#1877F2",
        alignItems: 'center',
        justifyContent: "center",
        width: 50,
        height: 50,
        borderRadius: 6,

    },
    input: {
        width: '100%',
        height: '100%',
    },
    inputContainer: {
        width: '85%',
        height: 50,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#4E4B66',
        padding:5
    },
})