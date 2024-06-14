import { FlatList, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Video, { VideoRef } from 'react-native-video';

import MessageText from './MessageText'
import { COLOR } from '../../constant/color'
import { CreateTime } from './format/FormatDate'
import { EmojiReaction } from '../../constant/emoji'
import ReactionOptionComponent from './ReactionOptionComponent'
import ReactionsComponent from './ReactionsComponent'
import MessageItemContent from './MessageItemContent';

export type messageType = {
  id: number,
  create_at: string,
  update_at: string,
  state: number,
  message: string,
  type: string,
  sender: {
    id: number,
    fullname: string,
    avatar: string
  },
  reactions: Array<any>
}

const MessageItem = ({ messsage, sender }: { messsage: messageType, sender: boolean}) => {
  const [showReaction, setShowReaction] = useState(false);
  const [reactions,setReactions]
  =useState(
    messsage.reactions.map(r => r.reaction)
  )

  function ContentOnPress() {
    console.log('ContentOnPress');

  }

  function ContentOnLongPress() {
    console.log('ContentOnLongPress');

    //show component option reaction
    setShowReaction(true)

  }


  function OptionReactionOnSubmit(reaction: number) {
    console.log(reaction);
    setReactions(prevValue=>[...prevValue,reaction])
    //close component option reaction
    setShowReaction(false)
  }

  function AvatarOnPress() {
    console.log('AvatarOnPress');

  }


  return (
    <View style={[styles.container, { flexDirection: sender ? 'row-reverse' : 'row' }]}>
      {
        !sender &&
        <TouchableOpacity style={styles.avatarContainer} onPress={AvatarOnPress}>
          <Image style={styles.avatar} source={{ uri: messsage.sender.avatar }} />
        </TouchableOpacity>
      }

      <View style={{ paddingHorizontal: 10 }}>


        <ReactionOptionComponent show={showReaction} ontionOnpress={OptionReactionOnSubmit} />
        <Pressable
          style={styles.content}
          onPress={ContentOnPress}
          onLongPress={ContentOnLongPress}
        >
          <MessageItemContent message={messsage} sender={sender}/>
          {
            reactions.length > 0 &&
            <ReactionsComponent reactions={reactions} />

          }
        </Pressable>
        <View>
          <Text style={styles.createTime}>{CreateTime(messsage.create_at)}</Text>
        </View>
      </View>
    </View>

  )
}

export default MessageItem

const styles = StyleSheet.create({

  content: {
    width: 210,
  },
  createTime: {
    color: '#D9D9D8',
    fontWeight: '500',
    fontSize: 13,
    marginTop: 5
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  avatarContainer: {
    height: 50,
    width: 50,
  },
  container: {
    minHeight: 80,
    width: '100%',
    marginVertical: 10,
  },


})