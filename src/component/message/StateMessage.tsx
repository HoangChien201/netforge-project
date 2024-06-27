import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { messageType } from './MessageItem'
import { addMessageAPI } from '../../http/ChienHTTP'
import { uploadImage } from '../../http/TuongHttp'
import { socket } from '../../http/SocketHandle'
export type StateMessageType = {
  message: messageType,
  group_id: number
}
const StateMessage: React.FC<StateMessageType> = ({ message, group_id }) => {
  const [state, setState] = useState(message.state)
  
  //
  useEffect(() => {
    if (message.state === 0) {

      addMessage()
    }
  }, [message.state])

  async function addMessage() {
    switch (message.type) {

      case 'text':
        message.state = 1;
        message['group'] = group_id
        const messageCreate = await addMessageAPI(message)
        if (messageCreate) {
          socket.emit(`message`,messageCreate)
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
    console.log('message',message);

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
          socket.emit(`message`,messageCreate)

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
      <Text style={styles.status}>{state === 0 ? 'Đang gửi' : "Đã gửi"}</Text>
    </View>
  )
}

export default StateMessage

const styles = StyleSheet.create({
  status: {

  },
  container: {
    alignSelf: 'flex-end'
  }
})