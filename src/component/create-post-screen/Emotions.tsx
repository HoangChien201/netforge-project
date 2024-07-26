import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { emotions } from '../../constant/emoji'

type Em = {
  onSelectEmotion: (value: any) => void
}
const Emotions: React.FC<Em> = ({ onSelectEmotion }) => {
  return (
    <FlatList
      data={emotions}
      numColumns={1}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSelectEmotion(item)}
          style={styles.container}>
          <View style={{
            flex: 1, alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={styles.emoji}>{item.Emoji}</Text>
          </View>
          <View style={{ flex: 4 ,
            justifyContent: 'center'}}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.listContainer}
    />
  )
}

export default Emotions

const styles = StyleSheet.create({
  emoji: {
    fontSize: 24,
  },
  listContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    margin: 5
  },
  title: {
    fontSize: 22,

  },

})