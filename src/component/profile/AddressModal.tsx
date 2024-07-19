import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Modal, Pressable } from 'react-native';
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
  resetToInitial: () => void; // Add this prop to reset the address to the initial value
}

const AddressModal: React.FC<AddressModalProps> = ({ isVisible, selectedAddress, onSelectAddress, onCloseModal, resetToInitial }) => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]); 
  const [isSearch, setIsSearch] = useState<boolean>(false); 
  const [chosenAddress, setChosenAddress] = useState<string|null>(''); 
  const [textInputValue, setTextInputValue] = useState<string>('');

  useEffect(() => {
    if (isVisible && query.length > 2) {
      setIsSearch(true);
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5&countrycodes=vne`)
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
    onSelectAddress(address || '');
  };

  const handleClearSelectedAddress = () => {
    setChosenAddress(null); 
    setTextInputValue('');
    onSelectAddress('');
  };

  const handleSave = () => {
    onSelectAddress(textInputValue);
    onCloseModal();
    console.log('Lưu địa chỉ:', textInputValue);
  };

  const handleCloseModal = () => {
    resetToInitial(); 
    onCloseModal();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={handleCloseModal}>
      <Pressable style={styles.overlay} onPress={handleCloseModal}>
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
          {textInputValue ? (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearSelectedAddress}>
              <Icon name="close" size={20} color="#000"/>
            </TouchableOpacity>
          ) : null}
          
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Chọn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize:16,
    paddingRight:30
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
    top: 35,
  },
});

export default AddressModal;
