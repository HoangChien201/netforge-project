import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BODYMODAL from '../component/edit-post-modal/Body'
import { COLOR } from '../constant/color'
import REQFriend from '../component/notificationes/RequestFriend'
import OldNotificationes from '../component/notificationes/OldNotificationes'
import NewNotificationes from '../component/notificationes/NewNotificationes'
import MODALFRIEND from '../component/friend-request-accept-modal/Body'
import MODALHISTORIES from '../component/user-histories-modal/Body'
import FRIENDS from '../screens/profile/FriendScreen'
const NotificationScreen = () => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalFriend, setShowModalFriend] = useState(false);
  const [showModalHistories, setShowModalHistories] = useState(false);
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);
  const [reload, setReload] = useState(false);
  const [dot, setDot] = useState(Number);
  const ShowModalEdit = () => {
    setShowModalEdit(true);
  }
  const ShowModalFriend = () => {
    setShowModalFriend(true);
  }
  const ShowModalHistories = () => {
    setShowModalHistories(true)
  }
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Thông báo</Text>
        <TouchableOpacity style={{ height: 20, width: 60, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}
          onPress={ShowModalEdit}>
          <Text>edit Post</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={ShowModalFriend}>
        <REQFriend />
        {dot > 0 ? <View style={styles.dot}>
          <Text style={{ color: 'red', fontSize: 16 }}>{dot}</Text>
        </View> : null}
      </TouchableOpacity>
      <View style={{ flexDirection: 'column' }}>
        <NewNotificationes></NewNotificationes>
      </View>
      <View style={{ flexDirection: 'column' }}>
        <OldNotificationes></OldNotificationes>
      </View>
      <BODYMODAL
        showModalEdit={showModalEdit}
        setShowModalEdit={setShowModalEdit}
      />
      <MODALFRIEND
        reload={reload}
        showModalFriend={showModalFriend}
        setShowModalFriend={setShowModalFriend}
        setDot={setDot}
        setReload={setReload}
      />
    </View>

  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {

  },
  header: {
    height: 40,
    backgroundColor: COLOR.PrimaryColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'

  },
  headerText: {
    marginHorizontal: 16,
    fontWeight: '500',
    fontSize: 24,
    color: COLOR.primary100

  },
  dot: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 31,
    start: 35,
    backgroundColor: COLOR.primary300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  }
})