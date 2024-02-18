import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Keyboard, KeyboardAvoidingView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import UploadImage from '../component/createNewEvent/UploadImage'
import Body from '../component/createNewEvent/Body'
const CreateNewEventScreen = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.headerShow}>
                <Text style={styles.headerText}>Create New Event</Text>
                <TouchableOpacity style={styles.headerButtonSave}>
                    <Image source={require('../../../media/quyet_icon/save-light_.png')} style={styles.iconSave} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{    flexGrow: 1,}}>
                <UploadImage></UploadImage>
                <Body></Body>
            </ScrollView>

            {!isKeyboardVisible && (
            <View style={styles.cancel_push}>
            <TouchableOpacity style={styles.cancelEvent}>
                <Text style={styles.pushEventText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pushEvent}>
                <Text style={styles.pushEventText}>Create Event</Text>
            </TouchableOpacity>
        </View>
            )}
        </View>
    )
}

export default CreateNewEventScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: '100%'
    },
    headerShow: {
        marginHorizontal: 24,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
    },
    headerText: {
        color: '#120D26',
        fontFamily: 'Airbnb Cereal App',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 25
    },
    headerButtonSave: {
        borderRadius: 50,
        height: 28,
        width: 28,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pushEvent: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        borderRadius: 4,
        height: 48,
        width: '62%'

    },
    cancelEvent: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        borderRadius: 4,
        height: 48,
        width: '34%'

    },
    pushEventText: {
        color: '#FFF',
        fontFamily: 'Airbnb Cereal App',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 25
    },
    iconSave: {
        height: 28,
        width: 28
    },
    cancel_push: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 20,
        width: '90%',
        marginHorizontal: '5%',
    }
})