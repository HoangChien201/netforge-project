import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import MessageItem, { messageType } from '../../component/message/MessageItem'
import HeaderMessageComponent from '../../component/message/HeaderMessageComponent'
import { COLOR } from '../../constant/color'
import TextingComponent from '../../component/message/TextingComponent'
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import MessageCall from '../../component/message/MessageCall'
import { getMessageByGroupAPI } from '../../http/ChienHTTP'
import { useMyContext } from '../../component/navigation/UserContext'
import PortalMessage from '../../component/message/PortalMessage';
import { Host } from 'react-native-portalize';
import { socket } from '../../http/SocketHandle'
import { StackNavigationProp } from '@react-navigation/stack'
import { MessageRootStackParams } from '../../component/stack/MessageRootStackParams'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import ShowReactionComponent from '../../component/message/ShowReactionComponent'

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
  const { user } = useMyContext()
  const [messages, setMessages] = useState<Array<messageType>>([])
  const [partner, setPartner] = useState({
    fullnamename: '',
    avatar: '',
    group_id: null,
    id: null
  })
  const [reply,setReply] = useState<messageType | null>(null)
  const isFocus = useIsFocused()

  const navigation = useNavigation()
  const route: MessageScreenRouteProp = useRoute()


  async function getMessages(group_id: number) {
    const respone = await getMessageByGroupAPI(group_id)

    setMessages(respone)
  }

  function DeleteMessage(message_id:number){
    setMessages((prev)=>{
      const messagesFilter=prev.filter((message)=>message.id !== message_id)
      return messagesFilter
    })
  } 

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });

    if (route.params?.group_id) {
      const { fullname, avatar, id } = route.params
      const group_id = route.params?.group_id
      getMessages(group_id)
      setPartner(prevValue => { return { ...prevValue, fullname, avatar, group_id, id} })
        
      setMessages(route.params?.messages)
      socket.on(`message-${user.id}`, (message) => {
        if (isFocus) {
          //đọc tin nhắn khi vào tin nhắn
          socket.emit('read-message', {
            user: user.id,
            group: group_id
          })
        }
        getMessages(group_id)
      })
    }
    return () => {
      socket.off(`message-${user.id}`);
    };

  }, []);

  function addMessage(message: messageType) {
    let messageNew={...message}
    if(reply) {
      messageNew={
        ...message,
        parent:{
          id:message.parent,
          sender:reply?.sender
        }
      }
      
      setReply(null)
    }
    
    setMessages(
      (prevValue) => {
        return [messageNew, ...prevValue]
      }
    )
  }

  const ListMessage = useCallback(() => {
    console.log('render list');

    return (
      <FlatList
        inverted
        data={messages}
        renderItem={({ item,index }) => {
          const sender = typeof (item.sender) === 'object' ? item.sender.id : item.sender
          
          return (
            <MessageItem
              message={item}
              sender={user.id === sender}
              group_id={route.params?.group_id} 
              setMessageReactionsSelected={setMessageReactionsSelected}
              deleteMessage={DeleteMessage}
              setReply={setReply}
              lastMessage={index === 0}/>
          )
        }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        extraData={messages}
      />
    )
  },[messages])

  //--------bottomsheet
  const [messageReactionSelected,setMessageReactionsSelected]=useState()
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  // callbacks
  useEffect(() => {
    if(messageReactionSelected){
      bottomSheetModalRef.current?.present();
    }
  }, [messageReactionSelected]);
  
  const handleSheetChanges = useCallback((index: number) => {
    if(index < 0){
      setMessageReactionsSelected(undefined)
    }
  }, []);
//---------bottomsheet

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>

        <HeaderMessageComponent partner={partner} />
        <View style={styles.content}>
          <ListMessage/>
        </View>

        <TextingComponent addMessage={addMessage} reply={reply} setReply={setReply}/>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <ShowReactionComponent messageReactionsSelected={messageReactionSelected}/>
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
    paddingHorizontal: 20
  },
  container: {
    backgroundColor: COLOR.PrimaryColor,
    flex: 1
  }
})