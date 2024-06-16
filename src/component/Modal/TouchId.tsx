import React, { Children, ReactNode, useEffect, useRef, useState } from "react"
import { Animated, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ICON from "react-native-vector-icons/MaterialCommunityIcons"
import { COLOR } from '../../constant/color'
import AsyncStorage from "@react-native-async-storage/async-storage"
import TouchID from "react-native-touch-id"
const TouchId = ({ visible, setVisible }: { visible: boolean, setVisible: (value: boolean) => void }) => {
    const scaleValues = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0)).current;
    const [confirm, setConfirm] = useState(true);
    const [text, setText] = useState('Lưu xác thực để đăng nhập?')
    useEffect(() => {
        toggleModal()
    }, [visible, confirm]);

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
    };

    const cancelTouchIdLogin = () => {
        setVisible(false);
    };
    const confirmTouchIdLogin = async () => {
        try {
            await AsyncStorage.setItem('touch', 'true');
            setText('Đã lưu xác thực');
            setConfirm(false)
            setTimeout(() => {
                cancelTouchIdLogin();
            }, 1000);
        } catch (error) {
            console.log(error);

        }
    };
    return (
        <Modal transparent visible={visible}>
            <View style={styles.modalBackGround}>
                {confirm ? <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValues }] }]}>
                    <View style={{ alignItems: "center", justifyContent: 'center' }}>
                        <View style={{ alignItems: "center", justifyContent: 'center' }}>
                            <ICON name="fingerprint" size={100} color={COLOR.PrimaryColor} />

                            <Text style={{ marginVertical: 30, fontSize: 18, textAlign: "center", fontFamily: "popins" }}>{text}</Text>
                        </View>
                    </View>
                    <View style={styles.options}>
                        <TouchableOpacity style={styles.buttonK} onPress={cancelTouchIdLogin}>
                            <Text style={styles.textL}>Không</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonL} onPress={confirmTouchIdLogin}>
                            <Text style={styles.textL}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                    :
                    <View style={styles.modalContainer}>
                        <ICON name="checkbox-marked-circle-outline" size={120} color={'#00FF00'} />
                        <Text style={{ marginVertical: 30, fontSize: 18, textAlign: "center", fontFamily: "popins" }}>{text}</Text>
                    </View>}
            </View>
        </Modal>
    )
}

export default TouchId

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
        alignItems: 'center'

    },
    header: {
        width: "100%",
        height: 40,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    buttonK: {
        height: 40,
        width: 80,
        backgroundColor: '#FF0000',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonL: {
        height: 40,
        width: 80,
        backgroundColor: '#0000FF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textL: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    }
})