import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { messageType } from './MessageItem'
import { addMessageAPI, updateMessageAPI } from '../../http/ChienHTTP'
import { uploadImage } from '../../http/TuongHttp'
import { socket } from '../../http/SocketHandle'
import { useMyContext } from '../navigation/UserContext'
import { StateMessageFormat } from './format/StatusMessage'
import { Message } from './class/MessageProvider'
import { useSendNotification } from '../../constant/notify'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
export type StateMessageType = {
  message: Message,
  group_id: number | null,
  sender: boolean,
  lastMessage: boolean,
}
const STATUS_SENDING = 0;
const STATUS_SEND = 1;
const STATUS_SEEN = 2;

const StateMessage: React.FC<StateMessageType> = ({ message, group_id, sender, lastMessage }) => {
  const [state, setState] = useState(message.state)
  const [seens, setSeens] = useState(message.reads)

  const user = useSelector((state:RootState)=>state.user.value)
  //
  useEffect(() => {
    if (message.state === STATUS_SENDING) {
      addMessage()
    }
  }, [message.state])

  useEffect(() => {

    socket.on(`read-message-${message.getId}`, (m: any) => {
      setSeens(
        prev => {
          return [...prev, m.user]
        }
      )
    })
  }, [])

  async function addMessage() {
    if (group_id) {
      switch (message.type) {

        case 'text':
          console.log('g',group_id);
          
          const msgRespone = await message.PostMessage({sender:user.id,group:group_id})
          console.log('msgRespone1',msgRespone);

          if (msgRespone !==  "Gửi tin nhắn lỗi") {
            socket.emit(`message`, msgRespone)
            setState(msgRespone.state)
          }
          else{
            setState(3);
            
          }
          break;

        default:
          messgeMedia(message)

          break;
      }
    }

  }

  async function messgeMedia(message: Message) {
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
        if (!group_id) return
        
        message.message = resultImage[0].url
        const msgRespone = await message.PostMessage({sender:user.id,group:group_id})
        console.log('msgRespone',msgRespone);
        
        if (msgRespone !==  "Gửi tin nhắn lỗi") {
          socket.emit(`message`, msgRespone)
          setState(msgRespone.state)
        }
        else{
          setState(3);
          
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
    marginTop: 10
  }
})