import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
            onValueChange={onValueChange}>
            <Picker.Item label="Giới tính" value="--"  />
            <Picker.Item label="Nam" value="Nam"  />
            <Picker.Item label="Nữ" value="Nữ"  />
            <Picker.Item label="Khác" value="Khác"  />
        </Picker>
        <Image style={styles.icon} source={require('../../media/icon/birthday-icon.png')} />
      </View>
      {invalid && <Text style={styles.errorText}>Giới tính không hợp lệ</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  pickerContainer: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    height: 60,
    paddingLeft: 35,
    backgroundColor:'#F5F5F5',
    margin:9,
    justifyContent:'center'
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
});

export default GenderPicker;
