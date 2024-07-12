import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import ListMessageItem, { GroupChatType } from '../../component/message/ListMessageItem'
import { useMyContext } from '../../component/navigation/UserContext'
import { getGroupsAPI } from '../../http/ChienHTTP'
import { socket } from '../../http/SocketHandle'
import { StackNavigationProp } from '@react-navigation/stack'
import { MessageRootStackParams } from '../../component/stack/MessageRootStackParams'
import { RouteProp, useIsFocused } from '@react-navigation/native'
import ModalNewMessage from '../../component/message/ModalNewMessage'

const ListMessageScreen = () => {
  const {user}=useMyContext()
  const [groups,setGroups]=useState<Array<GroupChatType>>([])
  const [visibleModalNewMessage,SetVisibleModalNewMessage]=useState(false)

  const isFocus=useIsFocused()
  useEffect(()=>{
    getGroups()
    socket.on(`list-group-${user.id}`, (message) => {
      
      getGroups()
    })
    return ()=>{
      socket.off(`list-group-${user.id}`)
    }
  },[isFocus])

  useEffect(()=>{
    

    
  },[])
  async function getGroups(){
    const respone= await getGroupsAPI()
    if(respone){
      setGroups(respone)
    } 
  }

  
  return (
    
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Nhắn tin</Text>
        <TouchableOpacity onPress={()=>SetVisibleModalNewMessage(true)} >
          <EntypoIcon name='new-message' size={24} color={'#000'}/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
          <FlatList
            data={groups}
            renderItem={({item})=>{
              return (
                <ListMessageItem group={item}/>
              )
            }}
            keyExtractor={(item)=>item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
      </View>
      <ModalNewMessage visible={visibleModalNewMessage} setVisible={SetVisibleModalNewMessage}/>
    </View>
  )
}

export default ListMessageScreen

const styles = StyleSheet.create({
  content:{
    marginTop:20
  },
  header:{
    color:'#000',
    fontSize:30,
    fontWeight:'700'
  },  
  headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  container:{
    paddingHorizontal:24,
    paddingVertical:8
  },
})