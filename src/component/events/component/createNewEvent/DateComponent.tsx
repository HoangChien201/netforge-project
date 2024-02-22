import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import CalendarPicker from "react-native-calendar-picker";
import DatePicker from 'react-native-date-picker'


import { COLOR } from '../../../../constant/color';
import { MONTH, WEEKDAYS } from '../../../../constant/date';

type dateType = {
    startDate: Date | null,
    endDate: Date | null,
}

type selectedDateType = {
    selectedStartDate: Date | null,
    selectedEndDate: Date | null,
}
const DateComponent = ({ updateValue }: { updateValue: any }) => {
    const [selectedDate, setSelectedDate] = useState<selectedDateType>({
        selectedStartDate: null,
        selectedEndDate: null,
    })

    const [date, setDate] = useState<dateType>({
        startDate: null,
        endDate: null,
    })

    const { selectedStartDate, selectedEndDate } = { ...selectedDate }
    const { startDate, endDate } = { ...date }


    const [openTimeStart, setOpenTimeStart] = useState(false)
    const [openTimeEnd, setOpenTimeEnd] = useState(false)

    function onDateChange(date: Date, type: string) {
        if (type === "END_DATE") {
            setSelectedDate((prevDate) => {
                return { ...prevDate, selectedEndDate: date }
            });
        } else {
            setSelectedDate((prevDate) => {
                return { ...prevDate, selectedStartDate: date }
            });
        }
    }

    function SetTimeOnFocus(type: string) {
        console.log(type);

        if (type === 'start-date') {
            if (selectedStartDate)
                setOpenTimeStart(true)
        }
        else {
            if (selectedEndDate)
                setOpenTimeEnd(true)
        }
    }

    return (
        <View>
            <Text style={styles.lable}>Ngày giờ tổ chức</Text>
            <View style={styles.calendar}>
                <CalendarPicker
                    allowRangeSelection={true}
                    onDateChange={onDateChange}
                    selectedDayColor={COLOR.primaryColor}
                    selectedStartDay={null}
                    selectedEndDay={null}
                    months={MONTH}
                    weekdays={WEEKDAYS}
                    previousTitle="Về"
                    nextTitle="Tiếp"
                />
            </View>

            {/* //picker start */}
            <DatePicker
                modal
                open={openTimeStart}
                date={selectedStartDate ? selectedStartDate : new Date()}
                mode='time'
                onConfirm={(date) => {
                    updateValue('date_start', date)
                    setOpenTimeStart(false)
                    setDate((prev) => {
                        return { ...prev, startDate: date }
                    })
                }}
                onCancel={() => {
                    setOpenTimeStart(false)

                }}
                confirmText='Xác nhận'
                cancelText='Hủy'
            />

            {/* //picker end */}
            <DatePicker
                modal
                open={openTimeEnd}
                date={selectedEndDate ? selectedEndDate : new Date()}
                mode='time'
                onConfirm={(date) => {
                    updateValue('date_end', date)

                    setOpenTimeEnd(false)
                    setDate((prev) => {
                        return { ...prev, endDate: date }
                    })
                }}
                onCancel={() => {
                    setOpenTimeEnd(false)
                }}
                confirmText='Xác nhận'
                cancelText='Hủy'
                
            />

            <View style={styles.formTime}>
                <TextInput
                    style={[styles.input, styles.inputTimeStart]}
                    placeholder='00:00'
                    value={startDate ? `${startDate.getHours()} : ${startDate.getMinutes()}` : ''}
                    onFocus={SetTimeOnFocus.bind(this, 'start-date')}
                    editable={!!selectedStartDate}
                />
                <TextInput
                    style={[styles.input, styles.inputTimeEnd]}
                    placeholder='00:00'
                    value={endDate ? `${endDate.getHours()} : ${endDate.getMinutes()}` : ''}
                    onFocus={SetTimeOnFocus.bind(this, 'end-date')}
                    editable={!!selectedStartDate}
                />
            </View>
        </View>
    )
}

export default DateComponent

const styles = StyleSheet.create({
    input: {
        borderColor: '#E7EAEE',
        borderWidth: 1,
        fontSize: 14,
        paddingHorizontal: 8
    },
    inputDate: {
        marginBottom: 15
    },
    inputTimeStart: {
        width: '49%'
    },
    inputTimeEnd: {
        width: '49%'

    },
    lable: {
        color: '#000',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        marginVertical: 5
    },
    formTime: {
        flexDirection: "row",
        justifyContent: 'space-between',

    },
    calendar: {
        marginVertical: 15
    }
})