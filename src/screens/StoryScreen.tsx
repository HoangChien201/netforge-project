import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, Text, Dimensions, StyleSheet, Image, Pressable } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import TestProgress from '../component/storys/ProgressBarScreen';
import ProgressBarr from '../component/storys/ProgressBarr';
import { useNavigation, useRoute } from '@react-navigation/native';

const StoryScreen = () => {
  const route = useRoute();
  const { list, indexfind } = route.params;
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(indexfind);
  const scrollViewRef = useRef<ScrollView>(null);
  const translateY = useSharedValue(0);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: Dimensions.get('window').width * currentIndex,
      animated: false,
    });
  }, [currentIndex]);

  const handlePanGesture = (event) => {
    if (event.nativeEvent.translationY > 100) {
      runOnJS(navigation.goBack)();
    }
    translateY.value = withSpring(0);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={handlePanGesture}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            onMomentumScrollEnd={(event) => {
              const contentOffsetX = event.nativeEvent.contentOffset.x;
              const index = Math.round(contentOffsetX / Dimensions.get('window').width);
              setCurrentIndex(index);
            }}
          >
            {list?.map((item, index) => (
              <Item
                posts={item}
                navigate={navigation}
                key={index}
                index={index}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                dataLength={list.length - 1}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const Item = ({ navigate, index, currentIndex, setCurrentIndex, dataLength, posts }) => {
  return (
    <View style={{ width: Dimensions.get('window').width }}>
      <View style={{ position: 'absolute', zIndex: 1, height: 100, margin: 20, width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: posts.avatar }} style={styles.avt} />
          <View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{posts.fullname}</Text>
          </View>
        </View>
        <View>
          <Pressable onPress={() => navigate.goBack()}>
            <AntDesignIcon name='close' size={20} color='#000' />
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
