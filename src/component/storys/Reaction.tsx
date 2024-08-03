import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setReaction } from '../store/reactionSlice';
import { likePost, updateLikePost } from '../../http/userHttp/getpost';
import { reaction } from '../../constant/emoji';
import ExplosionModal from './ExplosionModal ';

interface ReactionProps {
  postID: number;
  reactions?: number | null;
}

const Reaction: React.FC<ReactionProps> = ({ postID, reactions }) => {
  const dispatch = useDispatch();
  const reactionState = useSelector((state: RootState) => state.reaction.reactions[postID] || reactions);
  const [indexPress, setIndexPress] = useState(reactionState);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const user = useSelector((state : RootState)=>state.user.value)

  useEffect(() => {
    setIndexPress(reactionState);
  }, [reactionState]);

  const handleReaction = useCallback(async (type: number, index: number, emoji: string) => {
    const previousReaction = indexPress;
    setIndexPress(index);
    setSelectedEmoji(emoji);
    setModalVisible(true);

    try {
      if (reactions > 0) {
        await updateLikePost(postID,user?.id, index);
      } else {
        await likePost(postID, type);
      }

      dispatch(setReaction({ postID, reaction: index }));
    } catch (error) {
      console.error(error);
      setIndexPress(previousReaction);
    }
  }, [indexPress, postID, reactions, user?.id]);

  const RenderItem = useMemo(() => ({ val, index }: { val: { Emoji: any; id: number; type: number }; index: number }) => {
    const { Emoji, id, type } = val;
    const isSelected = indexPress === type;

    return (
      <View key={id.toString()} style={styles.emojiContainer}>
        <TouchableOpacity onPress={() => handleReaction(type, type, Emoji)}>
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
  }, [indexPress, handleReaction]);

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled horizontal showsHorizontalScrollIndicator={false}>
        {reaction.map((item, index) => (
          <RenderItem key={item.id} val={item} index={item.type} />
        ))}
      </ScrollView>
      <ExplosionModal visible={modalVisible} onClose={() => setModalVisible(false)} emoji={selectedEmoji} />
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
});
