import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formattedDate  } from '../../format/FormatDate';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomDatePickerProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    error?: string | null;
}

const CustomDatePicker:React.FC<CustomDatePickerProps> = ({ selectedDate, onDateChange, error }) => {
  const [isVisible, setIsVisible] = useState(false);
  //const [error, setError] = useState<string | null>(null);
  const showDatePicker = () => setIsVisible(true);
  const hideDatePicker = () => setIsVisible(false);
  // const handleConfirm = (date: any) => {
  //   onDateChange(date);
  //   hideDatePicker();
  // };
  const handleConfirm = (date: any) => {
    const currentDate = new Date();
    if (date > currentDate) {
      // setError('Ngày không hợp lệ, hãy chọn một ngày trong quá khứ hoặc hiện tại.');
      onDateChange(date);
      hideDatePicker();
    } else {
      onDateChange(date);
      hideDatePicker();
    }
  };
  

  return (
    <View>
      <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
      <Icon name="calendar-outline" size={20} color="#000" style={styles.icon} />
        <Text style={styles.dateButtonText}>{formattedDate(selectedDate)}</Text>
      </TouchableOpacity>
      {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    margin:9,
    justifyContent:'center',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    height: 60,
    paddingLeft: 40,
    overflow: 'hidden',
  },
  dateButtonText: {
    marginLeft:5,
    fontSize: 16,   
    fontWeight:'500',
    color:'#000'
  },
  icon: {
    position: 'absolute',
    top: 19,
    start: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 35,
  }
});

export default CustomDatePicker;
