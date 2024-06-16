import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';

interface InputFieldProps {
  label: string;
  value: any;
  onChangeText: (text: string) => void;
  onBlur: any;
  invalid: any;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  imageSource?: any;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText, onBlur, invalid, keyboardType = 'default',imageSource }) => {
  return (
    <View style={[{margin:9}]}>
      {/* <Text>{label}</Text> */}
      <TextInput
        style={[styles.input, invalid ? styles.validation : null]}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        keyboardType={keyboardType}
      />
        {imageSource && <Image source={imageSource} style={styles.icon} />}
      {invalid && <Text style={styles.errorText}>Dữ liệu không hợp lệ</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 6,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        height: 60,
        paddingLeft: 40,
        backgroundColor:'#F5F5F5',
        fontSize:16,
  },
  errorText: {
    color: 'red',
  },
  validation: {
    borderRadius: 6,
    borderColor:"#C30052",
    borderWidth:1,
    height: 60,
    paddingLeft: 40,
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 20,
    left: 10,
  },
});

export default InputField;
