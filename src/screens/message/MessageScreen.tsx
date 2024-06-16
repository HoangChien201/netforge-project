import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MessageItem, { messageType } from '../../component/message/MessageItem'
import HeaderMessageComponent from '../../component/message/HeaderMessageComponent'
import { COLOR } from '../../constant/color'
import { FlatList } from 'react-native-gesture-handler'
import TextingComponent from '../../component/message/TextingComponent'
import { useNavigation } from '@react-navigation/native'

const MESSAGES_DEFAULT: Array<messageType> = [
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
        "reaction": 2
      },
      {
        "reaction": 0
      }
    ]
  },
  {
    "id": 3,
    "create_at": "2024-05-31T09:12:47.456Z",
    "update_at": "2024-06-12T10:57:38.809Z",
    "state": 1,
    "type": "video",
    "message": "https://res.cloudinary.com/delivery-food/video/upload/v1718214172/kqomdj0lkwxgglhvtni5.mp4",
    "sender": {
      "id": 2,
      "fullname": "Le Hoang lan",
      "avatar": "https://res.cloudinary.com/delivery-food/image/upload/v1717925230/btywul9nnqtzlzjaawrx.jpg"
    },
    "reactions": []
  }
]
export const user={
  id:1
}
const MessageScreen = () => {
  const [messages,setMessages]=useState<Array<messageType>>(MESSAGES_DEFAULT)
  const flatListRef=useRef()
  const navigation=useNavigation()
  useEffect(() => {
        
    navigation.getParent()?.setOptions({ tabBarStyle: {display:'none'}});
    
}, []);
  const partner = {
    avatar: 'https://res.cloudinary.com/delivery-food/image/upload/v1717925230/btywul9nnqtzlzjaawrx.jpg',
    fullname: "Hoàng Chiến",
  }

  function addMessage(message:messageType){
    console.log(message);
    
    setMessages(
      (prevValue)=>{
        return [...prevValue,message]
      }
    )
  }

  return (
    <View style={styles.container}>
      <HeaderMessageComponent partner={partner} />
      <View style={styles.content}>
        <FlatList
          inverted
          data={[...messages].reverse()}
          renderItem={({ item }) => {
            const sender= typeof (item.sender) === 'object' ? item.sender.id : item.sender
            
            return (
              <MessageItem messsage={item} sender={user.id === sender} />
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