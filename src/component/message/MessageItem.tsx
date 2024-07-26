import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import ReactionsComponent from './ReactionsComponent'
import MessageItemContent from './MessageItemContent';
import PortalMessage from './PortalMessage'
import { MessageCordinatesType } from '../../screens/message/MessageScreen'
import StateMessage from './StateMessage'
import { socket } from '../../http/SocketHandle'
import { useMyContext } from '../navigation/UserContext';
import { MessageProvider } from './class/MessageProvider';
import test from './test';
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
  reads: Array<{
    "id": number,
    "user": {
      "id": number,
      "fullname": string,
      "avatar": string
    },
    "message": number,
    "read_at": string
  }>,
  reactions: Array<reactionType>
  group: number | {
    id: number
  },
  parent: number  |{
    sender: {
      "id": number,
      "fullname": string,
      "avatar": string
    },
    id: number,
  } 
}

export type reactionType = {
  user: number | {
    "id": number,
    "fullname": string,
    "avatar": string
  },
  reaction: number
}

interface MessageItemProp {
  message: MessageProvider,
  sender: boolean,
  group_id: number | null,
  setMessageReactionsSelected: any,
  deleteMessage: any,
  setReply: any,
  lastMessage: boolean
}

type DataResponeReactionMessageSocket = {
  reaction: reactionType,
  status: number
}

const MessageItem: React.FC<MessageItemProp> = React.memo((
  { message,
    sender,
    group_id,
    setMessageReactionsSelected,
    deleteMessage,
    setReply,
    lastMessage }) => {
  const { user } = useMyContext()
  const { height } = useWindowDimensions()
  const [heightLayout, setHeightLayout] = useState<number>(0)
  const [reactions, setReactions]
    = useState(
      message.reactions
    )
  //
  const [selectedMessage, setSelectedMessage] = useState<messageType | null>(null)
  const [messageCordinates, setMessageCordinates] = useState<MessageCordinatesType>({ x: 0, y: 0 })

  useEffect(() => {
    socket.on(`reaction-message-${message.id}`, (data: DataResponeReactionMessageSocket) => {
      switch (data.status) {
        case 1:
          createReaction(data.reaction)
          return

        case 2:
          updateReaction(data.reaction)
          return

        case 3:
          deleteReaction(data.reaction)
          return
      }

    })
    return () => {
      socket.off(`reaction-message-${message.id}`)
    }
  }, [])


  function ContentOnPress() {


  }

  //sự kiện show option reaction
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

  function updateReaction(reactionCurrent: any) {

    setReactions(prevValue => {
      //
      const reactionExist = prevValue.find((reation) => {
        return reation.user === reactionCurrent.user && reation.reaction === reactionCurrent.reaction
      })

      if (reactionExist) return prevValue

      //
      return prevValue.map(rct => {
        if (parseInt(rct.user.toString()) === parseInt(reactionCurrent.user.toString())) {
          return { ...rct, ...reactionCurrent }
        }
        return rct;
      })
    })
  }

  function createReaction(reactionCurrent: any) {

    setReactions(prevValue => {
      const reactionExist = prevValue.find((reation) => {
        return (reation.user === reactionCurrent.user) && (reation.reaction === reactionCurrent.reaction)
      })

      if (reactionExist) return prevValue

      return [...prevValue, reactionCurrent]
    })
  }

  function deleteReaction(reactionCurrent: any) {
    setReactions(prevValue => {
      return prevValue.filter(rct => parseInt(rct.user.toString()) !== parseInt(reactionCurrent.user.toString()))
    })
  }

  //lắng nghe sự kiện submit reaction
  function OptionReactionOnSubmit({ status, reactionCurrent }: { status: number, reactionCurrent: reactionType }) {
    console.log('reaction', reactionCurrent);

    switch (status) {
      //add reaction
      case 1:
        console.log({
          ...reactionCurrent,
          message: message.id
        });

        socket.emit('reaction-message',
          {
            ...reactionCurrent,
            message: message.id
          }
          , status)

        createReaction(reactionCurrent)

        setSelectedMessage(null)
        break;
      //change reaction
      case 2:
        socket.emit('reaction-message',
          {
            ...reactionCurrent,
            message: message.id
          }
          , status)
        updateReaction(reactionCurrent)
        setSelectedMessage(null)

        break;
      //remove reaction
      case 3:
        socket.emit('reaction-message',
          {
            ...reactionCurrent,
            message: message.id
          }
          , status)
        deleteReaction(reactionCurrent)
        setSelectedMessage(null)

        break;
      default:
        break;
    }
  }

  //set id tin nhắn để show danh sách chi tiết reaction
  function OnReactionComponent() {
    setMessageReactionsSelected(message.id)
  }

  function AvatarOnPress() {
    console.log('AvatarOnPress');

  }

  //lấy kích thước của item message
  function onLayout(e: any) {
    const { height } = e.nativeEvent.layout
    setHeightLayout(height)
  }
  const isMessageSennder = typeof message.sender === 'object' ? message.sender.id === user.id : message.sender === user.id;

  // console.log('mesageprarent',message);

  return (
    <View style={styles.container}>
      {
        (message.parent) &&
        <View style={[styles.replyStyle, { justifyContent: isMessageSennder ? 'flex-end' : 'flex-start' }]}>
          <MIcon name='reply' size={20} color={'#707777'} />
          {
            isMessageSennder ?
              <Text>Trả lời { message.parent?.sender?.fullname }</Text>
              :
              <Text>Chiến trả lời bạn</Text>

          }
        </View>
      }
      <View style={[styles.wrapperMessage, { flexDirection: sender ? 'row-reverse' : 'row' }]}>
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
              <ReactionsComponent reactions={reactions} onPress={OnReactionComponent} />

            }
          </TouchableOpacity>

          <StateMessage message={message} group_id={group_id} sender={sender} lastMessage={lastMessage} />

        </View>

      </View>
      <PortalMessage
        selectedMessage={selectedMessage}
        messageCordinates={messageCordinates}
        setSelectedMessage={setSelectedMessage}
        optionReactionOnSubmit={OptionReactionOnSubmit}
        heightLayout={heightLayout}
        deleteMessage={deleteMessage}
        setReply={setReply}
      />
    </View>

  )
})

export default MessageItem

const styles = StyleSheet.create({
  replyStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 50
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
  wrapperMessage: {
    minHeight: 50,
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5
  },
  container: {

  }

})