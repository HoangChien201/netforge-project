import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { messageType } from './MessageItem'
import { addMessageAPI, updateMessageAPI } from '../../http/ChienHTTP'
import { uploadImage } from '../../http/TuongHttp'
import { socket } from '../../http/SocketHandle'
import { useMyContext } from '../navigation/UserContext'
import { StateMessageFormat } from './format/StatusMessage'
export type StateMessageType = {
  message: messageType,
  group_id: number,
  sender: boolean,
  lastMessage:boolean
}
const STATUS_SENDING = 0;
const STATUS_SEND = 1;
const STATUS_SEEN = 2;

const StateMessage: React.FC<StateMessageType> = ({ message, group_id, sender,lastMessage }) => {
  const [state, setState] = useState(message.state)
  const [seens, setSeens] = useState(message.reads)
  
  const { user } = useMyContext()
  //
  useEffect(() => {
    if (message.state === STATUS_SENDING) {
      addMessage()
    }
  }, [message.state])

  useEffect(()=>{
    
    socket.on(`read-message-${message.id}`,(m:any)=>{
      setSeens(
        prev=>{
          return [...prev,m.user]
        }
      )
    })
  },[])

  async function addMessage() {
    switch (message.type) {

      case 'text':
        message.state = STATUS_SEND;
        message['group'] = group_id
        if(message.parent){
          message.parent=typeof message.parent === 'object' ? message.parent.id : message.parent
        }
        const messageCreate = await addMessageAPI(message)
        if (messageCreate) {
          socket.emit(`message`, messageCreate)
          setState(messageCreate.state)
        }
        break;

      default:
        messgeMedia(message)

        break;
    }
  }

  async function messgeMedia(message: messageType) {
    const files = new FormData();

    files.append('files', {
      uri: typeof message.message === 'object' && message.message.uri,
      type: typeof message.message === 'object' && message.message.type,
      name: typeof message.message === 'object' && message.message.fileName,
    });
    try {
      const resultImage = await uploadImage(files);

      // Kiểm tra cấu trúc phản hồi từ API uploadImage
      // Kiểm tra xem phản hồi có phải là một mảng và có ít nhất một phần tử không
      if (Array.isArray(resultImage) && resultImage.length > 0) {
        message.state = 1;
        message.message = resultImage[0].url
        message['group'] = group_id

        const messageCreate = await addMessageAPI(message)
        if (messageCreate) {
          socket.emit(`message`, messageCreate)

          setState(messageCreate.state)
        }

      } else {
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <View style={styles.container}>
      {
        sender && lastMessage &&
        <Text style={styles.status}>{StateMessageFormat(seens.length > 0 ? STATUS_SEEN : state)}</Text>
      }
    </View>
  )
}

export default StateMessage

const styles = StyleSheet.create({
  status: {

  },
  container: {
    alignSelf: 'flex-end',
    marginTop:10
  }
})