import React, { memo, useEffect, useRef, useState } from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import { useNavigation, useRoute } from '@react-navigation/native';

const ListImageDetail = memo(() => {
  const route = useRoute();
  const {  img, index } = route.params;
  const scrollViewRef = useRef(null);
  const navigation=useNavigation()
 
  useEffect(() => {
    if (img.length>0) {
      const itemWidth = Dimensions.get('screen').width;
      scrollViewRef?.current?.scrollTo({ x: index * itemWidth, animated: false });
    }
  }, [index,img]);

  return (
    <>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {img?.map((imageUrl, index: any) => (
            <View key={imageUrl?.id} style={{ width: Dimensions.get('screen').width }}>
              <FastImage
                style={styles.image}
                source={{
                  uri: imageUrl?.url,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
});

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
