import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import DateComponent from './DateComponent'
import { EventRequest } from '../../screens/CreateNewEventScreen'

const FormCreateEvent = ({onUpdate,value}:{onUpdate:any,value:EventRequest}) => {
    const [dateS, setDateS] = useState(new Date())
    const [openS, setOpenS] = useState(false)
    const [openE, setOpenE] = useState(false)
    const [dateE, setDateE] = useState(new Date())
    const [inputValue, setInputValue] = useState('');
    
    function onUpdateValue(type:string,value:string){    
        onUpdate(type,value)
    }

    return (
        <View style={styles.container}>
            <View style={{marginBottom:15}}>
                <Text style={styles.lable}>Tiêu đề</Text>
                <TextInput
                    style={[styles.input, styles.eventName]}
                    placeholder='Tên sự kiện' 
                    onChangeText={onUpdateValue.bind(this,'name')}
                    value={value.name}
                    />
            </View>

            <View style={{marginBottom:15}}>
                <Text style={styles.lable}>Mô tả</Text>
                <TextInput
                    numberOfLines={5}
                    placeholder="Mô tả về sự kiện"
                    multiline
                    style={[styles.input, styles.aboutEvent]}
                    onChangeText={onUpdateValue.bind(this,'description')}
                    value={value.description}
                />
            </View>

            <View style={{marginBottom:15}}>
                <Text style={styles.lable}>Địa chỉ</Text>
                <TextInput
                    style={[styles.input, styles.eventName]}
                    placeholder='1 Nguyễn Huệ' 
                    onChangeText={onUpdateValue.bind(this,'address')}
                    value={value.address}
                    />
            </View>

            {/* date */}
            <DateComponent updateValue={onUpdateValue}/>
        </View>
    )
}

export default FormCreateEvent

const styles = StyleSheet.create({
    container:{

    },
    input: {
        borderColor: '#E7EAEE',
        borderWidth: 1,
        fontSize: 14,
        paddingHorizontal: 8
    },
    eventName: {
        width: '100%',
        fontFamily: 'Arial',
        marginBottom: 4,
        height:40
    },
    aboutEvent: {
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
    lable: {
        color: '#000',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        marginVertical:5
    }
})

{/* <View style={styles.timeEvent}>
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
            </View> */}