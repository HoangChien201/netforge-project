import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { COLOR } from '../../constant/color'
import { CreateTime } from './format/FormatDate'
import ReactionOptionComponent from './ReactionOptionComponent'
import ReactionsComponent from './ReactionsComponent'
import MessageItemContent from './MessageItemContent';
import { addMessageAPI } from '../../http/ChienHTTP';
import PortalMessage from './PortalMessage'
import { MessageCordinatesType } from '../../screens/message/MessageScreen'
import StateMessage from './StateMessage'

export type messageType = {
  id: number,
  create_at: string,
  update_at: string,
  state: number,
  message: string |
  {
    uri: string,
    type: string,
    fileName: string
  },
  type: string,
  sender: {
    id: number,
    fullname: string,
    avatar: string
  },
  reactions: Array<reactionType>
  group: number
}

export type reactionType = {
  user: number,
  reaction: number
}

interface MessageItemProp {
  setSelectedMessage: any,
  message: messageType,
  sender: boolean,
  group_id: number,
  setMessageCordinate: any
}

const MessageItem: React.FC<MessageItemProp> = ({ message, sender, group_id }) => {
  const { height } = useWindowDimensions()
  const [heightLayout, setHeightLayout] = useState()
  const [showState, setShowState] = useState(false)
  const [reactions, setReactions]
    = useState(
      message.reactions
    )
  //
  const [selectedMessage, setSelectedMessage] = useState<messageType | null>(null)
  const [messageCordinates, setMessageCordinates] = useState<MessageCordinatesType>({ x: 0, y: 0 })




  function ContentOnPress() {
    setShowState(prev => {
      if (prev) return false
      return true
    })

  }

  function ContentOnLongPress(e: any) {
    const { pageY, locationY } = e.nativeEvent;

    let y = pageY - locationY

    const isPassTopScreen = y < 100
    const isPassBottomScreen = height - y < heightLayout + 100

    if (isPassBottomScreen) {
      y = y - heightLayout + locationY
    }
    if (isPassTopScreen) {
      y = y + heightLayout
    }

    setMessageCordinates({
      x: 10,
      y: y,
    })
    setSelectedMessage({ ...message, reactions })
    //show component option reaction

  }


  function OptionReactionOnSubmit({ status, reactionCurrent }: { status: number, reactionCurrent: reactionType }) {
    console.log('reaction', reactionCurrent);

    switch (status) {
      //add reaction
      case 1:
        setReactions(prevValue => {
          return [...prevValue, reactionCurrent]
        })
        setSelectedMessage(null)
        break;
      //change reaction
      case 2:
        setReactions(prevValue => {
          return prevValue.map(rct => {
            if (parseInt(rct.user.toString()) === parseInt(reactionCurrent.user.toString())) {
              return { ...rct, ...reactionCurrent }
            }
            return rct;
          })
        })
        setSelectedMessage(null)

        break;
      //remove reaction
      case 3:
        setReactions(prevValue => {
          return prevValue.filter(rct => parseInt(rct.user.toString()) !== parseInt(reactionCurrent.user.toString()))
        })
        setSelectedMessage(null)

        break;
      default:
        break;
    }
  }

  function AvatarOnPress() {
    console.log('AvatarOnPress');

  }

  function onLayout(e: any) {
    const { height } = e.nativeEvent.layout
    setHeightLayout(height)
  }

  return (
    <View style={[styles.container, { flexDirection: sender ? 'row-reverse' : 'row' }]}>
      {
        !sender &&
        <TouchableOpacity activeOpacity={0.9} style={styles.avatarContainer} onPress={AvatarOnPress}>
          <Image style={styles.avatar} source={{ uri: message.sender.avatar }} />
        </TouchableOpacity>
      }

      <View style={{ paddingHorizontal: 10 }}>


        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.content}
          onPress={ContentOnPress}
          onLongPress={ContentOnLongPress}
          onLayout={onLayout}
        >
          <MessageItemContent message={message} sender={sender} />
          {
            reactions && reactions.length > 0 &&
            <ReactionsComponent reactions={reactions} />

          }
        </TouchableOpacity>
        {
          <StateMessage message={message} group_id={group_id} />
        }
      </View>

      <PortalMessage
        selectedMessage={selectedMessage}
        messageCordinates={messageCordinates}
        setSelectedMessage={setSelectedMessage}
        optionReactionOnSubmit={OptionReactionOnSubmit}
      />
    </View>

  )
}

export default MessageItem

const styles = StyleSheet.create({
  status: {

  },
  content: {
    minWidth: 0,
    maxWidth: 210
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
    minHeight: 50,
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5
  },


})