import { Button, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React, { useState } from 'react'
import { COLOR } from '../../constant/color'
import NewMessageComponent from './NewMessageComponent'
import NewGroupComponent from './NewGroupComponent'

const ModalNewMessage = ({ visible, setVisible }: { visible: boolean, setVisible: any }) => {
    const [type, setType] = useState('message')
    function CancleHandle() {
        if (type === 'message') {
            setVisible(false)
            return
        }
        setType('message')

    }
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
                        <TouchableOpacity onPress={CancleHandle}>
                            <Text style={styles.cancle}>Hủy</Text>
                        </TouchableOpacity>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>{
                                type === 'message' ?
                                    "Tin nhắn mới"
                                    :
                                    "Nhóm mới"
                            }</Text>
                        </View>
                    </View>
                    {
                        type === 'message' ?
                            <NewMessageComponent setType={setType} />
                            :
                            <NewGroupComponent />
                    }
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
    titleWrapper: {
        alignItems: 'center',
        justifyContent: "center",
    },
    title: {
        color: '#000',
        fontSize: 20,
        fontWeight: '600',
    },
    header: {
        height: 60,
        backgroundColor: "rgba(215,215,215,0.9)",
        justifyContent: 'center'
    },

})