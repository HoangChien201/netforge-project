import React, { useRef } from 'react';
import { TextInput, StyleSheet, Animated } from 'react-native';

const Component: React.FC = () => {
  const inputRef = useRef<TextInput>(null);
  const borderWidthAnim = useRef(new Animated.Value(0)).current;
  const borderBottomWidthAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.parallel([
      Animated.timing(borderBottomWidthAnim, {
        toValue: 1,
        duration: 300, // Thời gian animation
        useNativeDriver: false,
      }),
      Animated.timing(borderWidthAnim, {
        toValue: 1,
        duration: 300, // Thời gian animation
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleBlur = () => {
    Animated.parallel([
      Animated.timing(borderBottomWidthAnim, {
        toValue: 0,
        duration: 300, // Thời gian animation
        useNativeDriver: false,
      }),
      Animated.timing(borderWidthAnim, {
        toValue: 0,
        duration: 300, // Thời gian animation
        useNativeDriver: false,
      }),
    ]).start();
  };

  const borderStyle = {
    borderBottomWidth: borderBottomWidthAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 2],
    }),
    borderTopWidth: borderWidthAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <Animated.View style={[styles.container, borderStyle]}>
      <TextInput
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    flex: 1,
  },
});

export default Component;