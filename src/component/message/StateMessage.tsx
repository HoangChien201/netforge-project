import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { uploadImage } from '../../http/TuongHttp'
import { socket } from '../../http/SocketHandle'
import { StateMessageFormat } from './format/StatusMessage'
import { Message } from './class/MessageProvider'
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

  const user = useSelector((state: RootState) => state.user.value)
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

          const msgRespone = await message.PostMessage({ sender: user.id, group: group_id })

          if (msgRespone !== "Gửi tin nhắn lỗi") {
            socket.emit(`message`, msgRespone)
            setState(msgRespone.state)
          }
          else {
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
        const msgRespone = await message.PostMessage({ sender: user.id, group: group_id })

        if (msgRespone !== "Gửi tin nhắn lỗi") {
          socket.emit(`message`, msgRespone)
          setState(msgRespone.state)
        }
        else {
          setState(3);

        }

      } else {
      }
    } catch (error) {
      console.log(error);

    }
  }

  const isShowState = sender && lastMessage

  function StyleState() {
    if (seens?.length <1) {
      return <Text style={styles.status}>{StateMessageFormat(seens.length > 0 ? STATUS_SEEN : state)}</Text>
    }
    console.log('seen',seens);
    
    return (
    <View style={styles.listSeen}>
        <FlatList
          data={seens}
          renderItem={({item})=>{
            return (
              <Image style={styles.avatar} source={{uri:item.user?.avatar}}/>
            )
          }}
          horizontal={true}
          scrollEnabled={false}
          keyExtractor={(item)=>item?.id?.toString()}
        />
    </View>)
  }

  return (
    <View style={styles.container}>
      {
        isShowState && <StyleState/>
      }
    </View>
  )
}

export default StateMessage

const styles = StyleSheet.create({
  listSeen:{
    height:20,
    minWidth:50,
    alignItems:"flex-end"
  },
  avatar:{
    width:15,
    height:15,
    borderRadius:15,
    marginEnd:2
  },
  container: {
    alignSelf: 'flex-end',
    marginTop:2
  }
})