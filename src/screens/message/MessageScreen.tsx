import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import MessageItem, { messageType } from '../../component/message/MessageItem'
import HeaderMessageComponent from '../../component/message/HeaderMessageComponent'
import { COLOR } from '../../constant/color'
import TextingComponent from '../../component/message/TextingComponent'
import { useNavigation, useRoute } from '@react-navigation/native'
import MessageCall from '../../component/message/MessageCall'
import { getMessageByGroupAPI } from '../../http/ChienHTTP'
import { useMyContext } from '../../component/navigation/UserContext'
import PortalMessage from '../../component/message/PortalMessage';
import { Host } from 'react-native-portalize';
import { socket } from '../../http/SocketHandle'

export type MessageCordinatesType={
  x:number,
  y:number,
}

const MessageScreen = () => {
  const [messages, setMessages] = useState<Array<messageType>>([])

  const [partner, setPartner] = useState({
    name: '',
    avatar: '',
    group_id: null,
    id: null
  })

  const navigation = useNavigation()
  const route = useRoute()
  const { user } = useMyContext()

  async function getMessages(group_id: number) {
    const respone = await getMessageByGroupAPI(group_id)
    setMessages(respone)
  }


  useLayoutEffect(() => {
    // console.log('render param');

    if (route.params?.group_id) {
      const { name, avatar, id } = route.params
      const group_id = route.params?.group_id
      console.log("id", id)
      getMessages(group_id)
      setPartner(prevValue => { return { ...prevValue, fullname: name, avatar, group_id, id} })
      socket.on(`message-${user?.id}`, (message) => {
        console.log('message'+user.id,message);
        getMessages(group_id)
      })

    }
  }, [route.params?.group_id]);

  useEffect(() => {

    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });

  }, []);


  function addMessage(message: messageType) {
  
    setMessages(
      (prevValue) => {
        return [message, ...prevValue]
      }
    )
  }

  const ListMessage = useCallback(() => {
    // console.log('render list', messages);

    return (
      <FlatList
        inverted
        data={messages}
        renderItem={({ item }) => {
          const sender = typeof (item.sender) === 'object' ? item.sender.id : item.sender

          return (
            <MessageItem
              message={item}
              sender={user.id === sender}
              group_id={partner.group_id}/>
          )
        }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    )
  }, [messages])

  // console.log('render');


  return (
      <View style={styles.container}>

        <HeaderMessageComponent partner={partner} />
        <View style={styles.content}>
          <ListMessage />
        </View>

        <TextingComponent addMessage={addMessage} />
      </View>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
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