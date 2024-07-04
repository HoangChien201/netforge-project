import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { EmojiReaction } from '../../constant/emoji'
import { reactionType } from './MessageItem'

const ReactionsComponent = ({ reactions,onPress }: { reactions: Array<reactionType>,onPress:any }) => {
  //lọc lấy reaction bằng number
  const reactionFiller= [...new Set(reactions.map(rct=>rct.reaction))]

  function OnPress() {
    console.log('reaction');
    
    onPress()

  }
  return (
    <Pressable style={styles.container} onPress={OnPress}>
      {
        reactionFiller.map((reaction, index) => {
          return (
              <Image style={styles.reaction} key={index} source={EmojiReaction[reaction].source}/>
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
  reaction:{
    width:15,
    height:15,
  },
  quantityReaction: {
    color: '#000',
    fontWeight: '500',
    marginStart: 5
  },
  container: {
    minWidth: 40,
    height: 20,
    backgroundColor: 'rgba(225,225,225,0.9)',
    position: 'absolute',
    borderRadius: 15,
    bottom: -10,
    right: 5,
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: 'center',
    paddingHorizontal: 10
  }
})