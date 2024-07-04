import { Button, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constant/color'

const ModalNewMessage = ({ visible, setVisible }: { visible: boolean, setVisible: any }) => {
    return (
        <Modal
            animationType='slide'
            visible={visible}
            transparent={true}
        >
            <Pressable
                onPress={(event) => event.target == event.currentTarget && setVisible(false)}
                style={[styles.modal]}
            >
                <View style={styles.container}>

                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={styles.cancle}>Hủy</Text>
                        </TouchableOpacity>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>Thêm tin nhắn</Text>
                        </View>
                    </View>

                </View>
            </Pressable>
        </Modal >

    )
}

export default ModalNewMessage

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 750,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden'
    },
    modal: {
        flex: 1,

    },
    cancle: {
        color: COLOR.PrimaryColor,
        fontSize: 18,
        fontWeight: '600',
        position: "absolute",
        left: 20,
        zIndex: 99
    },
    titleWrapper:{
        alignItems:'center',
        justifyContent:"center",
    },
    title: {
        color: '#000',
        fontSize: 20,
        fontWeight: '600',
    },
    header: {
        height: 60,
        backgroundColor: "rgba(215,215,215,0.9)",
        justifyContent:'center'
    }
})