import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

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
        <Image source={require('../../media/icon/Back.png')} style={styles.image} />
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
    paddingHorizontal: 20,
    paddingTop:10,
    height: 60,
    backgroundColor: '#fff',
  },
  image: {
    width: 20,
    height: 15,
    tintColor: '#000',
    marginLeft: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color:'black',
  },
  saveText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
