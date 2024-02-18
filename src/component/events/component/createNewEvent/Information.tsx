import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
const Information = () => {
    const [dateS, setDateS] = useState(new Date())
    const [openS, setOpenS] = useState(false)
    const [openE, setOpenE] = useState(false)
    const [dateE, setDateE] = useState(new Date())
    const [inputValue, setInputValue] = useState('');
    return (
        <View>
            <Text style={styles.title}>Title</Text>
            <TextInput style={styles.eventName} placeholder='Name of event' />
            <View style={styles.timeEvent}>
                <TouchableOpacity onPress={() => setOpenS(true)} style={styles.timeEventStart}>
                    <Text style={styles.timeEventStartText}>{dateS ? dateS.toLocaleTimeString() : 'Start time'}</Text>
                </TouchableOpacity>
                <DatePicker
                    modal
                    mode="time"
                    open={openS}
                    date={dateS}
                    onConfirm={(date) => {
                        setOpenS(false)
                        setDateS(date)
                    }}
                    onCancel={() => {
                        setOpenS(false)
                    }}
                />
                <Text style={styles.to}>To</Text>
                <TouchableOpacity onPress={() => setOpenE(true)} style={styles.timeEventStart}>
                    <Text style={styles.timeEventStartText}>{dateE ? dateE.toLocaleTimeString() : 'Time end'}</Text>
                </TouchableOpacity>
                <DatePicker
                    modal
                    mode="time"
                    open={openE}
                    date={dateE}
                    onConfirm={(date) => {
                        setOpenE(false)
                        setDateE(date)
                    }}
                    onCancel={() => {
                        setOpenE(false)
                    }}
                />
            </View>
            <TextInput
                numberOfLines={5}
                placeholder="About your event"
                value={inputValue}
                multiline
                style={[styles.aboutEvent, { height: Math.max(150, inputValue.length * 5) }]}
                onChangeText={text => setInputValue(text)}
            />
        </View>
    )
}

export default Information

const styles = StyleSheet.create({
    eventName: {
        height: 48,
        width: '100%',
        fontSize: 22,
        fontFamily: 'Arial',
        fontWeight: '400',
        borderWidth: 0.5,
        marginBottom: 4,
        marginTop: 8
    },
    aboutEvent: {
        fontSize: 16,
        borderTopWidth: 1,
        fontFamily: 'Arial',
        fontWeight: '400',

        textAlignVertical: 'top',

    },
    timeEvent: {
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 8
    },
    timeEventStart: {
        height: 40,
        width: '44%',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5
    },
    timeEventStartText: {
        color: 'blue',
        fontFamily: 'Airbnb Cereal App',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    to: {
        color: 'blue',
        fontFamily: 'Airbnb Cereal App',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    title: {
        color: 'black',
        fontFamily: 'Airbnb Cereal App',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '500',
        marginTop: 10
    }
})