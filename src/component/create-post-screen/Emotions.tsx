import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { emotions } from '../../constant/emoji'

type Em = {
  onSelectEmotion: (value: any) => void
}
const Emotions: React.FC<Em> = ({ onSelectEmotion }) => {
  function EmotionItem({ item,index }) {
    return (
      <TouchableOpacity onPress={() => onSelectEmotion(item)}>

        <View style={[styles.emotionItem]}>
          <Text style={styles.emoji}>{item.Emoji}</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>

      <FlatList
        data={emotions}
        numColumns={1}
        renderItem={({ item,index }) => {
          return <EmotionItem item={item} index={index}/>
        }
        }
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}

      />
    </View>
  )
}

export default Emotions

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  emoji: {
    fontSize: 24,
  },
  listContainer: {
    marginTop:16
  },
  title: {
    fontSize: 20,
    marginStart: 5
  },
  emotionItem: {
    flexDirection: 'row',
    width: '100%',
    marginBottom:8
  }

})