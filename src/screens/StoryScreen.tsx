import React, { useRef, useEffect, useState, useCallback } from 'react';
import { View, ScrollView, Text, Dimensions, TouchableOpacity, StyleSheet, Image, TextInput, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import TestProgress from '../component/storys/ProgressBarScreen';
import ProgressBarr from '../component/storys/ProgressBarr';
import { reaction } from '../constant/emoji';
import Reaction from '../component/storys/Reaction';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DateOfTimePost } from '../format/DateOfTimePost';

const DATA = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  // Add more items as needed
];

const StoryScreen = ({ index }) => {
  const route = useRoute();
  const { list,indexfind,itemPost } = route.params;
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(indexfind);
  const [data1, setData1] = useState(DATA);
  const scrollViewRef = useRef<ScrollView>(null);





  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: Dimensions.get('window').width * currentIndex,
      animated: false,
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
        {list?.map((item: any | null | undefined, index: any) => (
          <Item posts={item} navigate={navigation} key={index} index={index} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} dataLength={list.length - 1}  />
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const Item = ({ navigate, index, currentIndex, setCurrentIndex, dataLength,posts }) => {
  return (
    <View style={{ width: Dimensions.get('window').width }}>
      <View style={{ position: 'absolute', zIndex: 1, height: 100, margin: 20, width: '90%', flexDirection: 'row',justifyContent:'space-between' }}>

        <View style={{ flexDirection: 'row' }}>
          <Image source={{uri:posts.avatar}} style={styles.avt} />
          <View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{posts.fullname}</Text>
          </View>
        </View>
        <View>
          <Pressable onPress={()=>navigate.goBack()}>
          <AntDesignIcon name='close' size={20} color='#000'  />
          </Pressable>
        </View>
      </View>

      {currentIndex === index ? <TestProgress listpostStory={posts.posts} dataLength={dataLength} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} /> : <ProgressBarr listpostStory={posts.posts} />}
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
