import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { reaction } from '../../constant/emoji';
import { Image } from 'react-native';

const Reaction = () => {
  const [indexPress, setIndexPress] = useState(null);

  const RenderItem = ({ val, index }) => {
    const { Emoji, id } = val;
    return (
      <View key={id.toString()} style={styles.emojiContainer}>
        <TouchableOpacity onPress={() => {
          setIndexPress(index)
        }}>
          <View style={{ borderBottomWidth: indexPress === index ? 2 : null, paddingVertical: 5 }}>
            <Image source={Emoji} style={[styles.emoji]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled horizontal showsHorizontalScrollIndicator={false}>
        {reaction.map((item, index) => (
          <RenderItem key={index} val={item} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Reaction;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    height: 190,
    bottom: -40,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
  emojiContainer: {
    margin: 10,
  },
  emoji: {
    width: 40,
    height: 40,
  },
  textinput: {
    borderWidth: 1,
    width: "50%",
    height: 40,
    justifyContent:'center',
    marginLeft:10,
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'white',
  }
});
