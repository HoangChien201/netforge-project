import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import MapView, { Marker } from 'react-native-maps';
const Calender = () => {
    //----------------
    const [showCalendar, setShowCalendar] = useState(false);
    const [showMaps, setShowMaps] = useState(false);
    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    }
    const toggleLocation = () => {
        setShowMaps(!showMaps);
    }
    //---------------
    const [selectedDates, setSelectedDates] = useState({});

    const handleDayPress = (day) => {
        const selectedDate = day.dateString;
        const updatedDates = { ...selectedDates };

        if (selectedDates[selectedDate]) {
            // Nếu ngày đã được chọn, bỏ chọn nó
            delete updatedDates[selectedDate];
        } else {
            // Nếu ngày chưa được chọn, thêm nó vào danh sách đã chọn
            updatedDates[selectedDate] = {
                selected: true,
                selectedColor: 'blue',
            };
        }

        setSelectedDates(updatedDates);
    };

    const handleConfirm = () => {
        console.log('Các ngày đã chọn:', Object.keys(selectedDates));
    };
    return (
        <View style={styles.container}>
            <View style={styles.calendarNlocation}>
                <TouchableOpacity onPress={toggleCalendar} style={styles.caledarButton}>
                    <Text style={styles.caledarButtonText} >
                        {showCalendar ? "Hide" : "Calendar"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleLocation} style={styles.caledarButton}>
                    <Text style={styles.caledarButtonText} >
                        {showMaps ? "Hide" : "Location"}
                    </Text>
                </TouchableOpacity>
            </View>

            {showCalendar && (
                <Calendar
                    onDayPress={handleDayPress}
                    // markedDates={{
                    //     [selected]: { selected: true, disableTouchEvent: true, selectedColor: 'blue' }
                    // }}
                    markedDates={selectedDates}
                    style={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        height: 350,
                        zIndex: 99,
                        width: '100%'
                    }}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#2d4150'
                    }}
                />

            )}
            <View style={styles.confirmNcancel}>
            {Object.keys(selectedDates).length > 0 && (
                <TouchableOpacity style={styles.confirmCalendar} onPress={handleConfirm} >
                    <Text>OK</Text>
                </TouchableOpacity>
                
            )}
            {Object.keys(selectedDates).length > 0 && (
                <TouchableOpacity style={styles.confirmCalendar} onPress={handleConfirm} >
                    <Text>OK</Text>
                </TouchableOpacity>
                
            )}
            </View>

            {showMaps && (
                <Text>
                    Map view
                </Text>
            )
            }
        </View>
    )
}

export default Calender

const styles = StyleSheet.create({
    caledarButton: {
        height: 50,
        width: '48%',
        backgroundColor: 'blue',
        borderRadius: 50,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    caledarButtonText: {
        color: '#FFF',
        fontFamily: 'Airbnb Cereal App',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 45
    },
    container: {
        height: 'auto',
    },
    calendarNlocation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    confirmCalendar:{
        height:50,
        width:50,
        backgroundColor:'gray',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
    },
    confirmNcancel:{
        flexDirection:'row'
    }
})