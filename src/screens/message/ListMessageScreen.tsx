import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import {useIsFocused} from '@react-navigation/native'
import { useSelector } from 'react-redux'

import ListMessageItem, { GroupChatType } from '../../component/message/ListMessageItem'
import { getGroupsAPI } from '../../http/ChienHTTP'
import { socket } from '../../http/SocketHandle'
import ModalNewMessage from '../../component/message/ModalNewMessage'
import SkelotonMessage from '../../component/message/SkelotonMessage'
import { RootState } from '../../component/store/store'

const ListMessageScreen = () => {
  const user = useSelector((state:RootState)=>state.user.value)
  const [groups,setGroups]=useState<Array<GroupChatType>|null>(null)
  const [visibleModalNewMessage,SetVisibleModalNewMessage]=useState(false)
  const isFocus=useIsFocused()
  useEffect(()=>{
    getGroups()
    socket.on(`list-group-${user?.id}`, (message) => {

      getGroups()
    })

    return () => {
      socket.off(`list-group-${user?.id}`)
    }
  }, [isFocus])
  async function getGroups() {
    const respone = await getGroupsAPI()
    if (respone) {
      setGroups(respone)
    }
  }

  return (

    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Nhắn tin</Text>
        <TouchableOpacity onPress={() => SetVisibleModalNewMessage(true)} >
          <EntypoIcon name='new-message' size={24} color={'#000'} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {
          groups ?
            <FlatList
              data={groups}
              renderItem={({ item }) => {
                return (
                  <ListMessageItem group={item} />
                )
              }}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
            :
            <SkelotonMessage />
        }


      </View>
      <ModalNewMessage visible={visibleModalNewMessage} setVisible={SetVisibleModalNewMessage} />
    </View>
  )
}

export default ListMessageScreen

const styles = StyleSheet.create({
  content: {
    marginTop: 20
  },
  header: {
    color: '#000',
    fontSize: 24,
    fontWeight: '700'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8
  },
})