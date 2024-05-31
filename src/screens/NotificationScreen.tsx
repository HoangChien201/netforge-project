import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BODYMODAL from '../component/edit-post-modal/Body'
import { COLOR } from '../constant/color'
import REQFriend from '../component/notificationes/RequestFriend'
import OldNotificationes from '../component/notificationes/OldNotificationes'
import NewNotificationes from '../component/notificationes/NewNotificationes'


const NotificationScreen = () => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);
  const ShowModalEdit = () => {
    setShowModalEdit(true);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông báo</Text>
        <TouchableOpacity style={{ height: 20, width: 60, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }} onPress={ShowModalEdit}>
          <Text>edit</Text>
        </TouchableOpacity>
      </View>

      <REQFriend></REQFriend>
      <View style={{flexDirection:'column'}}>
        <NewNotificationes></NewNotificationes>
      </View>
      <View style={{flexDirection:'column'}}>  
        <OldNotificationes></OldNotificationes>
      </View>
      <BODYMODAL
        showModalEdit={showModalEdit}
        setShowModalEdit={setShowModalEdit}
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

  }
})