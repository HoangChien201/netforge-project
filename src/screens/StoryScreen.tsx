import React, { useRef, useEffect, useState, useCallback } from 'react';
import { View, ScrollView, Text, Dimensions, TouchableOpacity, StyleSheet, Image, TextInput, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import TestProgress from '../component/storys/ProgressBarScreen';
import ProgressBarr from '../component/storys/ProgressBarr';
import { reaction } from '../constant/emoji';
import Reaction from '../component/storys/Reaction';
import { useNavigation } from '@react-navigation/native';

const DATA = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  // Add more items as needed
];

const StoryScreen = ({ index }) => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState(DATA);
  const scrollViewRef = useRef<ScrollView>(null);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const currentItemId = viewableItems[0].index;
      setCurrentIndex(currentItemId);
    }
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: Dimensions.get('window').width * currentIndex,
      animated: true,
    });
  }, [currentIndex]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        onScrollEndDrag={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(contentOffsetX / Dimensions.get('window').width);
          setCurrentIndex(index);
        }}
      >
        {data.map((item, index) => (
          <Item navigate={navigation} key={item.id} index={index} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} dataLength={data.length - 1} title={item.title} />
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const Item = ({ navigate, index, currentIndex, setCurrentIndex, dataLength }) => {
  return (
    <View style={{ width: Dimensions.get('window').width }}>
      <View style={{ position: 'absolute', zIndex: 1, height: 100, margin: 20, width: '90%', flexDirection: 'row',justifyContent:'space-between' }}>

        <View style={{ flexDirection: 'row' }}>
          <Image source={require('../media/icon/phuking.jpg')} style={styles.avt} />
          <View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Lục thiên phú</Text>
            <Text style={{ color: 'white' }}>20 giờ</Text>
          </View>
        </View>
        <View>
          <Pressable onPress={()=>navigate.goBack()}>
          <AntDesignIcon name='close' size={20} color='#000'  />
          </Pressable>
        </View>
      </View>

      {currentIndex === index ? <TestProgress dataLength={dataLength} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} /> : <ProgressBarr />}
    </View>
  );
};

const styles = StyleSheet.create({
  avt: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'cover',
    marginRight: 10,
  },
});

export default StoryScreen;
