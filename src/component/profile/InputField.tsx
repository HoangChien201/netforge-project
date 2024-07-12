import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { COLOR } from '../../constant/color';
import Icon from 'react-native-vector-icons/Ionicons';

interface InputFieldProps {
  label: string;
  value: any;
  onChangeText: (text: string) => void;
  onBlur: any;
  invalid: any;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  editable?: boolean;
  iconName?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText, onBlur, invalid, keyboardType = 'default', editable, iconName, placeholder }) => {
  const ref = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true)
    // if (ref.current) {
    //     setIsFocused(true)
    //     ref.current.setNativeProps({
    //     style: { borderColor: COLOR.primary200, borderBottomWidth: 1 }
    //   });
    // }
  };

  const handleBlur = (event: any) => {
    setIsFocused(false);
    onBlur(event);
  };
  return (
    <View style={[styles.container]}>
      {/* <Text>{label}</Text> */}
      <View style={{ position: 'relative' }}>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            invalid ? styles.validation : null,
            isFocused ? { borderColor: COLOR.PrimaryColor, borderBottomWidth: 1 } : { borderColor: '#DDDDDD' },
          ]}          
          onFocus={handleFocus}
          onChangeText={onChangeText}
          onBlur={handleBlur}
          value={value}
          keyboardType={keyboardType}
          placeholder={placeholder}
          editable={editable}
        />
        {iconName && (
          <Icon
            name={iconName}
            size={20}
            style={[
              styles.icon,
              { color: isFocused ? COLOR.PrimaryColor : '#000' },
            ]}
          />
        )}
        {/* {iconName && <Icon name={iconName} style={styles.icon} size={20} color="#000"/>} */}
      </View>
      {invalid && <Text style={styles.errorText}>Dữ liệu không hợp lệ</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 9,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    height: 60,
    paddingLeft: 40,
    fontSize: 16,
    overflow: 'hidden',
    fontWeight:'500',
  },
  errorText: {
    color: 'red',
  },
  validation: {
    height: 60,
    paddingLeft: 40,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
});

export default InputField;
