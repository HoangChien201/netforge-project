import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'


const Remember = () => {
    const [check, setCheck] = useState<boolean>(true);
    const handleCheck = () => {
        if (check) {
            setCheck(false)
        } else {
            setCheck(true)
        }
    }
    return (
        <View style={{marginBottom:20}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={handleCheck} style={{
                        backgroundColor: check ? 'grey' : '#3559E0',
                        borderRadius: 20,
                        width: 35,
                        marginRight: 10,
                        justifyContent:'center'
                    }}>
                        <Image style={{marginStart:check?0:19}} source={require('../../../../media/icon/Remember.png')} />
                    </TouchableOpacity>
                    <Text>Remember me</Text>
                </View>
                    <TouchableOpacity>
                        <Text>Forgot Password ?</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default Remember

const styles = StyleSheet.create({

})