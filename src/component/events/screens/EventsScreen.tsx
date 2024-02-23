import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ItemListEvents from '../component/profile/ItemListEvents'
import { user as userRoot, userType } from './ProfileScreen'
import ModalCreateEvent from '../component/createNewEvent/ModalCreateEvent'
import { useMyContext } from '../../navigation/UserContext'

const EventsScreen = (prop) => {  
  const {user}: userType = useMyContext()

  const [visibleModalCreateEvent, setVisibleModalCreateEvent] = useState(false)

  function OpenCreateEvent() {
    setVisibleModalCreateEvent(true)
  }

  function CloseCreateEvent() {
    setVisibleModalCreateEvent(false)
  }
  return (
    <View style={styles.container}>
      <ModalCreateEvent visible={visibleModalCreateEvent} closeModal={CloseCreateEvent} />
      <ScrollView >
        {
          prop.route.name == 'Events' &&
          <View>
            <Text style={styles.title}>Sự kiện của bạn</Text>
            <View style={styles.createPost}>
              <Image style={styles.avatar} source={{ uri: user.avatar }} />
              <TouchableOpacity onPress={OpenCreateEvent}>
                <Text style={styles.textYourThink} >Sắp tới bạn có tổ chức sự kiện gì không ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        }

        <ItemListEvents scrollEnabled={false} />
      </ScrollView>
    </View>
  )
}

export default EventsScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
  //create_event-end

  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 5
  },
  createPost: {
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginEnd: 10
  },
  textYourThink: {
    color: "#000",
    fontSize: 16
  }
  //create_event-end
})