import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { EmojiReaction } from '../../constant/emoji'

const ReactionsComponent = ({ reactions }: { reactions: Array<number> }) => {

  const reactionsFilter= [...new Set(reactions)]

  function OnPress(){
    console.log('reactionsonpress');
    
  }
  return (
    <Pressable style={styles.container} onPress={OnPress}>
      {
        reactionsFilter.map((reaction, index) => {
          return (
            <Text key={index}>{EmojiReaction[reaction]}</Text>
          )
        })
      }
      {
        reactions.length > 1 && 
        <Text style={styles.quantityReaction}>{reactions.length}</Text>
      }

    </Pressable>
  )
}

export default ReactionsComponent

const styles = StyleSheet.create({
  quantityReaction: {
    color:'#fff',
    fontWeight:'400',
    marginStart:5
  },
  container: {
    minWidth: 40,
    height: 25,
    backgroundColor: 'rgba(50,50,50,1)',
    position: 'absolute',
    borderRadius: 15,
    bottom: -10,
    right: 10,
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: 'center',
    paddingHorizontal:10
  }
})