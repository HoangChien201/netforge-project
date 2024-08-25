import { StyleSheet, Text, View, FlatList, Button, FlatListProps } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import MessageItem, { messageType } from '../../component/message/MessageItem'
import HeaderMessageComponent from '../../component/message/HeaderMessageComponent'
import { COLOR } from '../../constant/color'
import TextingComponent from '../../component/message/TextingComponent'
import { RouteProp, useFocusEffect, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { createGroupsHTTP, getMessageByGroupAPI } from '../../http/ChienHTTP'
import { socket } from '../../http/SocketHandle'
import { StackNavigationProp } from '@react-navigation/stack'
import { MessageRootStackParams } from '../../component/stack/MessageRootStackParams'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import ShowReactionComponent from '../../component/message/ShowReactionComponent'
import { GroupChatType } from '../../component/message/ListMessageItem'
import { MessageManage, Message } from '../../component/message/class/MessageProvider'
import ToolBar from '../../component/message/ToolBar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../component/store/store'

export type MessageCordinatesType = {
  x: number,
  y: number,
}

export type MessageScreenNavigationProp = StackNavigationProp<
  MessageRootStackParams,
  'MessageScreen'
>;


export type MessageScreenRouteProp = RouteProp<MessageRootStackParams, 'MessageScreen'>;

const MessageScreen = () => {
  const user = useSelector((state: RootState) => state.user?.value)
  const [messages, setMessages] = useState<Array<Message>>([])
  const [partner, setPartner] = useState<{ fullname: string, avatar: string, partner_id: number | null }>({
    fullname: '',
    avatar: '',
    partner_id: null
  })
  const [groupId, setGroupId] = useState<number | null>(null)
  const [reply, setReply] = useState<messageType | null>(null)

  const isFocus = useIsFocused()

  const navigation = useNavigation()
  const route: MessageScreenRouteProp = useRoute()


  async function getMessages(group_id: number) {
    const messagesAPI = await getMessageByGroupAPI(group_id, 30)
    //convert listMessage to listObject
    const messages = new MessageManage(messagesAPI).messages

    setMessages(messages)

  }

  function DeleteMessage(message_id: number) {
    setMessages((prev) => {
      const messagesFilter = prev.filter((message) => message.getId !== message_id)
      return messagesFilter
    })
  }
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });

      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: '#1F1F2F',
            margin: 20,
            borderRadius: 15,
          },
        });
      };
    }, [navigation, isFocus])
  );
  useLayoutEffect(() => {

    if (route.params?.group_id) {
      const { fullname, avatar } = route.params
      const group_id = route.params?.group_id

      getMessages(group_id)
      setPartner(prevValue => { return { ...prevValue, fullname, avatar } })
      setGroupId(group_id)

      socket.on(`message-${user?.id}`, (message) => {
        if (isFocus) {
          //đọc tin nhắn khi đang trong phần tin nhắn tin nhắn
          socket.emit('read-message', {
            user: user?.id,
            group: group_id
          })
        }
        getMessages(group_id)
      })
      //đọc tin nhắn khi vào tin nhắn
      socket.emit('read-message', {
        user: user.id,
        group: group_id
      })
    } else {
      const { fullname, avatar, members } = route.params
      const partner_id = members[0].user.id
      setPartner(prevValue => { return { ...prevValue, fullname, avatar } })
      if (!partner_id) return
      createGroupAPIs(partner_id)
    }


    return () => {
      socket.off(`message-${user.id}`);
    };

  }, [isFocus]);

  //add
  function addMessage(message: Message) {
    setReply(null)

    setMessages(
      (prevValue) => {
        return [message, ...prevValue]
      }
    )
  }

  async function createGroupAPIs(friend_id: number) {
    const createGroup = {
      type: 'single',
      members: [user?.id, friend_id]
    }
    const group: GroupChatType = await createGroupsHTTP(createGroup)

    if (!group) return

    socket.on(`message-${user?.id}`, (message) => {
      if (isFocus) {
        //đọc tin nhắn khi đang trong phần tin nhắn tin nhắn
        socket.emit('read-message', {
          user: user?.id,
          group: group.id
        })
      }
      getMessages(group.id)
    })
    //đọc tin nhắn khi vào tin nhắn
    socket.emit('read-message', {
      user: user?.id,
      group: group.id
    })
    getMessages(group.id)

    setGroupId(group.id)
    return group;
  }

  const ListMessage = useCallback(() => {
    return (
      <FlatList
        inverted
        data={messages}
        renderItem={({ item, index }) => {
          const sender = typeof (item.sender) === 'object' ? item.sender.id : item.sender

          return (
            <MessageItem
              message={item}
              sender={user?.id === sender}
              group_id={groupId}
              setMessageReactionsSelected={setMessageReactionsSelected}
              deleteMessage={DeleteMessage}
              setReply={setReply}
              lastMessage={index === 0}
            />
          )
        }}
        keyExtractor={(item) => item.getId.toString()}
        showsVerticalScrollIndicator={false}
      />
    )
  }, [messages])

  //--------bottomsheet
  const [messageReactionSelected, setMessageReactionsSelected] = useState()
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  // callbacks
  useEffect(() => {
    if (messageReactionSelected) {
      bottomSheetModalRef.current?.present();
    }
  }, [messageReactionSelected]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index < 0) {
      setMessageReactionsSelected(undefined)
    }
  }, []);
  //---------bottomsheet

  return (
    <BottomSheetModalProvider>

      <View style={styles.container}>
        <ToolBar title='Tin nhắn' />
        <HeaderMessageComponent partner={partner} />
        <View style={styles.content}>
          {
            groupId &&
            <ListMessage />
          }
        </View>

        <TextingComponent addMessage={addMessage} reply={reply} setReply={setReply} />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <ShowReactionComponent messageReactionsSelected={messageReactionSelected} />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
  content: {
    backgroundColor: "rgba(255,255,255,.9)",
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: COLOR.PrimaryColor,
    flex: 1
  }
})