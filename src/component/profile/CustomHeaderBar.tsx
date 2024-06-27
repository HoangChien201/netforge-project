import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomHeaderBarProps {
  onBackPress?: () => void;
  onSavePress?: () => void;
  title?: string;
}

const CustomHeaderBar: React.FC<CustomHeaderBarProps> = ({ onBackPress, onSavePress, title }) => {

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress(); // Gọi hàm onPress nếu được truyền vào
    }
  };

  const handleSavePress = () => {
    if (onSavePress) {
      onSavePress();
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleBackPress}>
      <Icon name="arrow-back" size={24} color="#000" style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleSavePress}>
        <Text style={styles.saveText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
}; 

export default CustomHeaderBar;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop:10,
    height: 60,
    backgroundColor: '#fff',
  },
  icon: {
    marginLeft: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color:'black',
  },
  saveText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
