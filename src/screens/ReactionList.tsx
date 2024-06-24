import React from 'react';
import { View, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';

const reactions = ['Like', 'Love', 'Haha', 'Wow', 'Sad', 'Angry']; // Danh sách các reaction

const ReactionList = ({ isVisible, onSelectReaction }) => {
  if (!isVisible) return null;

  const handleReactionSelect = (reaction) => {
    onSelectReaction(reaction);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reactions}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleReactionSelect(item)} style={styles.reactionItem}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  reactionItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
});

export default ReactionList;
