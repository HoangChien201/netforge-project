import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { reaction } from '../../constant/emoji';
import { Image } from 'react-native';
import { likePost, updateLikePost } from '../../http/userHttp/getpost';
import { useMyContext } from '../navigation/UserContext';

const Reaction = ({ postID, reactions }: { postID: number, reactions?: number | null }) => {
  const [indexPress, setIndexPress] = useState(reactions);
  const { user } = useMyContext();

  useEffect(() => {
    setIndexPress(reactions);
  }, [reactions]);

  const handleReaction = async (type: number, index: number) => {
    setIndexPress(index);
    try {
      if (indexPress !== null) {
        return await updateLikePost(postID, user.id, type);
      } else {
        return await likePost(postID, type);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const RenderItem = useMemo(() => ({ val, index }) => {
    const { Emoji, id, type } = val;
    const isSelected = indexPress === index && postID === postID;

    return (
      <View key={id.toString()} style={styles.emojiContainer}>
        <TouchableOpacity onPress={() => handleReaction(type, index)}>
          <View style={{ marginTop: 10 }}>
            <Image
              source={Emoji}
              style={[
                styles.emoji,
                {
                  width: isSelected ? 35 : 25,
                  height: isSelected ? 35 : 25,
                  marginVertical: isSelected ? -6 : 0
                }
              ]}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }, [indexPress, postID]);

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled horizontal showsHorizontalScrollIndicator={false}>
        {reaction.map((item, index) => (
          <RenderItem key={item.id} val={item} index={item.type} />
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
    flex: 1
  },
  emojiContainer: {
    margin: 10,
  },
  emoji: {
    width: 25,
    height: 25,
  },
  textinput: {
    borderWidth: 1,
    width: "50%",
    height: 40,
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'white',
  }
});
