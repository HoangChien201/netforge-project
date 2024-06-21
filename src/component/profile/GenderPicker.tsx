import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

interface GenderPickerProps {
  value: any;
  onValueChange: (itemValue: string) => void;
  invalid: any;
}

const GenderPicker: React.FC<GenderPickerProps> = ({ value, onValueChange, invalid }) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Giới tính</Text> */}
      <View style={styles.pickerContainer}>
        <Picker
            selectedValue={value}
            onValueChange={onValueChange}
            
          dropdownIconColor={invalid ? 'red' : '#000'}>
            <Picker.Item label="Giới tính" value="--"  style={styles.text}/>
            <Picker.Item label="Nam" value="Nam"  style={styles.text}/>
            <Picker.Item label="Nữ" value="Nữ"  style={styles.text}/>
            <Picker.Item label="Khác" value="Khác"  style={styles.text}/>
        </Picker>
        <Icon name="male-female-outline" size={22} color="#000" style={styles.icon} />
      </View>
      {invalid && <Text style={styles.errorText}>Giới tính không hợp lệ</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin:9,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  pickerContainer: {
    justifyContent:'center',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    height: 60,
    paddingLeft: 30,
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    top: 19,
    start: 10,
    width:20,
    height:20,
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: 'red',
  },
  text: {
    fontSize:16,
    color:'#000',
    fontWeight:'500',
  }
});

export default GenderPicker;
