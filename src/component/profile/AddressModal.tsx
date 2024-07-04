import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Image } from 'react-native';
import Modal from 'react-native-modal';
import { COLOR } from '../../constant/color';
import Icon from 'react-native-vector-icons/AntDesign';

interface Suggestion {
  display_name: string;
}

interface AddressModalProps {
  isVisible: boolean;
  selectedAddress: string|null;
  onSelectAddress: (address: string|null) => void;
  onCloseModal: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ isVisible, selectedAddress, onSelectAddress, onCloseModal }) => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]); //gợi ý nè
  const [isSearch, setIsSearch] = useState<boolean>(false); // kiểm tra có dữ liệu ko
  const [chosenAddress, setChosenAddress] = useState<string|null>(''); //lưu địa chỉ đã chọn
  const [textInputValue, setTextInputValue] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);


  useEffect(() => {
    if (isVisible && query.length > 2) {
      setIsSearch(true);
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5&countrycodes=vne`)
      //fetch(`https://nominatim.openstreetmap.org/sarch?format=json&q=${query}&addressdetails=1&limit=5&countrycodes=vn&state&county&city&country`)
        .then(response => response.json())
        .then(data => {
          console.log('địa chỉ nè:', data);
          setSuggestions(data);
        })
        .catch(error => console.error('API address error:', error))
        .finally(() => setIsSearch(false));
    } else {
      setSuggestions([]);
    }
  }, [isVisible, query]);

  useEffect(() => {
    if (isVisible) {
      setQuery('');
      setTextInputValue(selectedAddress || '');
    }
  }, [isVisible, selectedAddress]);


  const handleSelectAddressItem = (address: string) => {
    setChosenAddress(address);
    setTextInputValue(address); 
    onSelectAddress(address);
  };

  const handleClearSelectedAddress = () => {
    setChosenAddress(null); 
    setTextInputValue('');
    onSelectAddress('');
  };

  const handleSave = () => {
    onSelectAddress(textInputValue);
    onCloseModal();
  };

  const handleCloseModal = () => {
    onCloseModal();
  };

  return (
    <Modal isVisible={isVisible} >
      <View style={styles.modalContent}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm địa chỉ..."
          value={textInputValue}
          onChangeText={(text) => {
            setTextInputValue(text);
            setChosenAddress('');
            setQuery(text);
          }}
        />
        {isSearch && <Text style={styles.txtLoading}>Đang tìm kiếm...</Text>}
        {!isSearch && suggestions.length === 0 && (
          <Text style={styles.txtNoData}>Không tìm thấy địa chỉ phù hợp</Text>
        )}
        <FlatList
          data={suggestions}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectAddressItem(item.display_name)}>
              <Text style={styles.addressItem}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `${item.display_name}-${index}`}
        />
        {textInputValue ? ( // Nếu có giá trị trong TextInput, hiển thị nút Xóa
          <TouchableOpacity style={styles.clearButton} onPress={handleClearSelectedAddress}>
            <Icon name="close" size={20} color="#000"/>
          </TouchableOpacity>
        ) : null}
        
        <View style={styles.footer}>
        {/* <TouchableOpacity style={styles.button} onPress={onCloseModal}>
            <Text style={styles.buttonText}>Đóng</Text>
            </TouchableOpacity> */}

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    height:300,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedAddress: {
    marginBottom: 10,
    fontStyle: 'italic',
    color: '#777',
  },
  input: {
    height: 60,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize:16,
  },
  addressItem: {
    padding: 10,
    fontSize: 16,
  },
  txtLoading: {
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#777',
  },
  txtNoData: {
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize:16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: COLOR.PrimaryColor,
    borderRadius: 6,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    position: 'absolute',
    right: 25,
    top: 30,
  },
});

export default AddressModal;
