import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MessageItem, { messageType } from '../../component/message/MessageItem'
import HeaderMessageComponent from '../../component/message/HeaderMessageComponent'
import { COLOR } from '../../constant/color'
import { FlatList } from 'react-native-gesture-handler'
import TextingComponent from '../../component/message/TextingComponent'
import { useNavigation, useRoute } from '@react-navigation/native'
import MessageCall from '../../component/message/MessageCall'
import { getMessageByGroupAPI } from '../../http/ChienHTTP'
import { useMyContext } from '../../component/navigation/UserContext'

export const MESSAGES_DEFAULT: Array<messageType> = [
  {
    "id": 1,
    "create_at": "2024-05-31T09:12:47.456Z",
    "update_at": "2024-06-12T10:57:38.809Z",
    "state": 1,
    "type": "text",
    "message": "dsfsdfsd",
    "sender": {
      "id": 2,
      "fullname": "Le Hoang lan",
      "avatar": "https://res.cloudinary.com/delivery-food/image/upload/v1717925230/btywul9nnqtzlzjaawrx.jpg"
    },
    "reactions": [
      {
        "user":2,
        "reaction": 3
      }
    ]
  },
  {
    "id": 2,
    "create_at": "2024-05-31T09:12:47.456Z",
    "update_at": "2024-06-12T10:57:38.809Z",
    "state": 1,
    "type": "image",
    "message": "https://res.cloudinary.com/delivery-food/image/upload/v1717925230/btywul9nnqtzlzjaawrx.jpg",
    "sender": {
      "id": 1,
      "fullname": "Le Hoang Chien",
      "avatar": "https://res.cloudinary.com/delivery-food/image/upload/v1717925230/btywul9nnqtzlzjaawrx.jpg"
    },
    "reactions": [
      {
        "user":1,
        "reaction": 2
      },
      {
        "user":2,
        "reaction": 0
      }
    ]
  },
  {
    "id": 3,
    "create_at": "2024-05-31T09:12:47.456Z",
    "update_at": "2024-06-12T10:57:38.809Z",
    "state": 1,
    "type": "image",
    "message": "file:///data/user/0/com.eventproject/cache/rn_image_picker_lib_temp_a5e9e753-6e98-4f9d-ad7e-f1b9ab5c12f2.jpg",
    "sender": {
      "id": 2,
      "fullname": "Le Hoang lan",
      "avatar": "https://res.cloudinary.com/delivery-food/image/upload/v1717925230/btywul9nnqtzlzjaawrx.jpg"
    },
    "reactions": []
  },
  {
    "id": 4,
    "create_at": "2024-05-31T09:12:47.456Z",
    "update_at": "2024-06-12T10:57:38.809Z",
    "state": 1,
    "type": "audiocall",
    "message": "",
    "sender": {
      "id": 1,
      "fullname": "Le Hoang lan",
      "avatar": "https://res.cloudinary.com/delivery-food/image/upload/v1717925230/btywul9nnqtzlzjaawrx.jpg"
    },
    "reactions": []
  },
  {
    "id": 5,
    "create_at": "2024-05-31T09:12:47.456Z",
    "update_at": "2024-06-12T10:57:38.809Z",
    "state": 1,
    "type": "videocall",
    "message": "",
    "sender": {
      "id": 2,
      "fullname": "Le Hoang lan",
      "avatar": "https://res.cloudinary.com/delivery-food/image/upload/v1717925230/btywul9nnqtzlzjaawrx.jpg"
    },
    "reactions": []
  }
]
const MessageScreen = () => {
  const [messages,setMessages]=useState<Array<messageType>>([])
  const [partner,setPartner]=useState({
    name:'',
    avatar:'',
    group_id:null
  })

  const flatListRef=useRef()
  const navigation=useNavigation()
  const route=useRoute()
  const {user} = useMyContext()

  async function getMessages(group_id:number){
    const respone=await getMessageByGroupAPI(group_id)
    setMessages(respone)
  }


  useEffect(() => {
    if (route.params?.group_id) {
      const {name,avatar} = route.params
      const group_id=route.params?.group_id
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      getMessages(group_id)
      setPartner(prevValue=>{return {...prevValue,fullname:name,avatar,group_id}})
      
    }
  }, [route.params?.group_id]);
  useEffect(() => {
        
    navigation.getParent()?.setOptions({ tabBarStyle: {display:'none'}});
    
}, []);


  function addMessage(message:messageType){
    
    setMessages(
      (prevValue)=>{
        return [message,...prevValue]
      }
    )
  }

  return (
    <View style={styles.container}>
      <HeaderMessageComponent partner={partner} />
      <View style={styles.content}>
        <FlatList
          inverted
          data={messages}
          renderItem={({ item }) => {
            const sender= typeof (item.sender) === 'object' ? item.sender.id : item.sender
            
            return (
              <MessageItem messsage={item} sender={user.id === sender} group_id={partner.group_id}/>
            )
          }}
          keyExtractor={(item)=>item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
      <TextingComponent addMessage={addMessage}/>
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