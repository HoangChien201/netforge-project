import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Easing, Modal, Image, Dimensions } from 'react-native';

const ExplosionModal = ({ visible, onClose, emoji }) => {
  const animationValues = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

  useEffect(() => {
    if (visible) {
      const animations = animationValues.map(animationValue =>
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 950,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        })
      );
      Animated.stagger(100, animations).start(() => {
        animationValues.forEach(animationValue => animationValue.setValue(0));
        onClose();
      });
    }
  }, [visible, animationValues]);

  const getRandomSize = () => {
    const size = Math.floor(Math.random() * 50) + 50; 
    return {
      width: size,
      height: size,
    };
  };

  const getRandomPosition = () => {
    const { width, height } = Dimensions.get('window');
    const top = Math.floor(Math.random() * (height - 100)); 
    const left = Math.floor(Math.random() * (width - 100));
    return {
      top,
      left,
    };
  };

  const renderAnimatedEmoji = (animationValue, index) => {
    const scale = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 2],
    });

    const opacity = animationValue.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [1, 1, 0],
    });

    const translateY = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -100],
    });

    const size = getRandomSize();
    const position = getRandomPosition();

    return (
      <Animated.View
        key={index}
        style={[
          styles.emojiContainer,
          {
            transform: [{ scale }, { translateY }],
            opacity,
            ...position,
          },
          size,
        ]}
      >
        <Image source={emoji} style={[styles.emoji, size]} />
      </Animated.View>
    );
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {animationValues.map((animationValue, index) => renderAnimatedEmoji(animationValue, index))}
      </View>
    </Modal>
  );
};

export default ExplosionModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  emojiContainer: {
    position: 'absolute',
  },
  emoji: {
    width: '100%',
    height: '100%',
  },
});
