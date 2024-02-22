import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Keyboard, KeyboardAvoidingView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import UploadImage from '../component/createNewEvent/UploadImage'
import Body from '../component/createNewEvent/Body'
import ButtonText from '../component/ui/ButtonText'
import { COLOR } from '../../../constant/color'
import { user as RootUser, userType } from './ProfileScreen'
import { CreateEventHTTP } from '../../../http/chien_event/EventHTTP'

export type EventRequest = {
    name: string,
    address: string,
    date_start: Date | string,
    date_end: Date | string,
    description: string,
    price_ticket: number,
    image: string,
    topic_id: number,
    user_id: number,
}

const CreateNewEventScreen = ({closeModal}:{closeModal:any}) => {
    const user: userType = RootUser
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [valueCreate, setValueCreate] = useState<EventRequest>({
        name: '',
        address: '',
        date_start: '',
        date_end: '',
        description: '',
        price_ticket: 1200,
        image: 'https://res.cloudinary.com/delivery-food/image/upload/v1708551176/event_xhx6w4.jpg',
        topic_id: 1,
        user_id: user.id,
    })
    const
        { name,
            address,
            date_start,
            date_end,
            description,
            price_ticket,
            image,
            topic_id,
            user_id, } = { ...valueCreate }

    // useEffect(() => {
    //     const keyboardDidShowListener = Keyboard.addListener(
    //         'keyboardDidShow',
    //         () => {
    //             setKeyboardVisible(true);
    //         }
    //     );

    //     const keyboardDidHideListener = Keyboard.addListener(
    //         'keyboardDidHide',
    //         () => {
    //             setKeyboardVisible(false);
    //         }
    //     );

    //     return () => {
    //         keyboardDidShowListener.remove();
    //         keyboardDidHideListener.remove();
    //     };
    // }, []);

    function onUpdate(type: string, value: string) {
        setValueCreate((prevValue) => {
            return { ...prevValue, [type]: value }
        })
    }

    async function onSubmit() {
        if (!!name || !!address ||
            !!date_start || !!date_end || !!description ||
            !!price_ticket || !!image || !!topic_id || !!user_id) 
        {
            try {
                const respone= await CreateEventHTTP(valueCreate)
                console.log(respone);
                closeModal()
                
            } catch (error) {
                
            }
            
        }
    }

    console.log(valueCreate);

    return (
        <View style={styles.container}>
            <View style={styles.headerShow}>
                <Text style={styles.headerText}>Tạo sự kiện</Text>
            </View>
            <ScrollView
                style={{ flexGrow: 1, }}
                showsVerticalScrollIndicator={false}
            >
                <UploadImage></UploadImage>
                <Body onUpdate={onUpdate} value={valueCreate}></Body>
            </ScrollView>
            <View style={styles.controlContainer}>
                <ButtonText
                    style={[styles.buttonCancle]}
                    text='Hủy'
                    textColor={'#fff'}
                    onPress={closeModal}
                />

                <ButtonText
                    style={[styles.buttonCreate, { backgroundColor: COLOR.primaryColor }]}
                    text='Tạo sự kiện'
                    textColor={'#fff'}
                    onPress={onSubmit}
                />
            </View>
        </View>
    )
}

export default CreateNewEventScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: '100%',
        paddingHorizontal: 16
    },
    headerShow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60
    },
    headerText: {
        color: '#120D26',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 25,
    },
    headerButtonSave: {
        borderRadius: 50,
        height: 28,
        width: 28,
        alignItems: 'center',
        justifyContent: 'center'
    },

    //
    controlContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        height: 44,
        marginVertical: 20
    },
    buttonCancle: {
        width: '30%',
        height: 44,
        backgroundColor: 'red',
        borderRadius: 5
    },

    buttonCreate: {
        width: '65%',
        height: 44,
        backgroundColor: 'red',
        borderRadius: 5
    },

    input: {
        paddingHorizontal: 10,
        fontSize: 15
    },


    //
})