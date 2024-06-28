import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Animated, SafeAreaView } from 'react-native';
import { COLOR } from '../../constant/color';
import ViewBottomSheet from './ViewBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const PostsDetail = () => {

  return (
    <Animated.View style={styles.container}>
        <ViewBottomSheet />
    </Animated.View>
  );
};

export default PostsDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primary300,
    height: '100%'
  },
});
