import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
const ToolBar = ({ title, colorBack, colorTitle }: { title: string, colorBack?: string, colorTitle?: string }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.goBack()}}>
                <Ionicon name='arrow-back' size={24} color={colorBack ? colorBack : '#fff'} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colorTitle ? colorTitle : '#fff' }]}>{title}</Text>

            {/* cục thịt dư */}
            <Text style={{ width: 24 }}></Text>

        </View>
    )
}

export default ToolBar

const styles = StyleSheet.create({
    container: {
        height: 55,
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 14,
        justifyContent: 'space-between',
        position:"absolute",
        top:0,
        right:0,
        left:0
    },
    title: {
        fontSize: 19,
        fontWeight: '500',
        textAlign: 'center'
    }
})