import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../../constant/color';

interface GenderPickerProps {
  value: any;
  onValueChange: (itemValue: string) => void;
  invalid: any;
}

const GenderPicker: React.FC<GenderPickerProps> = ({ value, onValueChange, invalid }) => {
  const options = [
    { label: 'Nam', key: 'Nam' },
    { label: 'Nữ', key: 'Nữ' },
    { label: 'Khác', key: 'Khác' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <ModalSelector
          data={options}
          initValue={value}
          onChange={(option) => onValueChange(option.key)}
          style={styles.selector}
          selectTextStyle={styles.selectedText}
          cancelTextStyle={styles.cancelText}
          cancelText='Đóng'
          cancelStyle={styles.cancelStyle}
          optionTextStyle={styles.optionText}
          optionContainerStyle={styles.optionContainer}
          accessible={true}
          scrollViewAccessibilityLabel="Scrollable options"
        >
          <View style={styles.selectedValueContainer}>
            <Icon name="male-female-outline" size={22} color="#000" style={styles.icon} />
            <Text style={styles.selectedText}>{value || 'Chọn giới tính'}</Text>
          </View>
        </ModalSelector>
      </View>
      {invalid && <Text style={styles.errorText}>Giới tính không hợp lệ</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 9,
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'center',
    flexDirection:'row', alignItems:'center',
    height:60,
  },
  selectedValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    // position: 'absolute',
    // right: 15,
    // top: 19,
    marginRight:8
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: 'red',
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  optionContainer: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',

  },
  optionText: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  selector: {
    flex: 1,
  },
  cancelText: {
    fontSize: 18,
    color: COLOR.PrimaryColor,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  cancelStyle: {
    backgroundColor:'#fff'
  }
});

export default GenderPicker;
