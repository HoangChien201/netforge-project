import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const NewMessageComponent = ({ setType }: { setType: any }) => {
    return (
        <View>
            <TouchableOpacity style={styles.optionHorizontal} onPress={() => setType('group')}>
                <Image source={require('../../media/icon/group.png')} style={{width:40,height:40 }}/>
                <Text style={{ color: "#000", fontSize: 16, fontWeight: '600',marginStart:20 }}>Tạo nhóm</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NewMessageComponent

const styles = StyleSheet.create({

    optionHorizontal: {
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:20,
        marginVertical:10
    },
    optionHorizontalItem: {
        height: '100%',
        width: 75,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
})