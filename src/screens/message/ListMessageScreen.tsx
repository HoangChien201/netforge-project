import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { useIsFocused } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import ListMessageItem, { GroupChatType } from '../../component/message/ListMessageItem'
import { getGroupsAPI } from '../../http/ChienHTTP'
import { socket } from '../../http/SocketHandle'
import ModalNewMessage from '../../component/message/ModalNewMessage'
import SkelotonMessage from '../../component/message/SkelotonMessage'
import { RootState } from '../../component/store/store'

const ListMessageScreen = () => {
  const user = useSelector((state: RootState) => state.user.value)
  const [groups, setGroups] = useState<Array<GroupChatType> | null>(null)
  const [visibleModalNewMessage, SetVisibleModalNewMessage] = useState(false)
  const isFocus = useIsFocused()
  useEffect(() => {
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

  function ListMessage() {
    if (groups?.length === 0) {
      return (
        <View style={{
          justifyContent: "center",
          alignItems: 'center',
          height: "100%"
        }}>
          <Image
            source={require('../../media/icon/message-nothing.png')}
            style={{
              width: 300,
              height: 200,
              marginBottom: 20
            }}
            resizeMode='center'
          />
          <Text>Hiện bạn chưa có tin nhắn nào</Text>
          <Text>Hãy kết bạn và trò chuyện cùng bạn bè</Text>

        </View>
      )
    }

    return (
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
    )

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
            <ListMessage />
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