import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ListImageDetail = ({ visible, onClose, listImg, indexImg }) => {
  const [currentIndex, setCurrentIndex] = useState(indexImg);
  const scrollViewRef = useRef(null);
  // console.log("imgindex",indexImg);
  

  useEffect(() => {
    if (visible) {
      const itemWidth = Dimensions.get('screen').width;
      scrollViewRef.current.scrollTo({ x: indexImg * itemWidth, animated: false });
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => onClose(false)}>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {listImg.length > 0 && listImg.map((imageUrl, index) => (
            <View key={index} style={{ width: Dimensions.get('screen').width }}>
              <Image source={{ uri: imageUrl.url }} style={styles.image} resizeMode="contain" />
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 1,
  },
  image: {
    width: Dimensions.get('screen').width,
    height: '95%',
    justifyContent: 'center',
  },
});

export default ListImageDetail;
