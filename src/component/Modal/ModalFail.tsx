
import React, { Children, ReactNode, useEffect, useRef, useState } from "react"
import { Animated, Image, Modal, StyleSheet, Text, View } from "react-native"


const ModalFail = ({ visible, text }: { visible: boolean, text: string }) => {

    const scaleValues = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        toggleModal()
    }, [visible])
    const toggleModal = () => {
        if (visible) {
            Animated.timing(scaleValues, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        } else {

            Animated.spring(scaleValues, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }
    return (
        <Modal transparent visible={visible}>
            <View style={styles.modalBackGround}>
                <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValues }] }]}>
                    <View style={{ alignItems: "center", justifyContent: 'center' }}>
                        
                           <View style={{ alignItems: "center", justifyContent: 'center' }}>
                                <Image source={require('../../media/Dicons/cross.png')} style={{ height: 150, width: 150 }} />
                                <Text style={{ marginVertical: 30, fontSize: 18, textAlign: "center", fontFamily: "popins" }}>{text}</Text>
                            </View>
                        
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )


}

export default ModalFail

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: "center",
        alignItems: "center"
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,

    },
    header: {
        width: "100%",
        height: 40,
        alignItems: "flex-end",
        justifyContent: "center",

    }
})