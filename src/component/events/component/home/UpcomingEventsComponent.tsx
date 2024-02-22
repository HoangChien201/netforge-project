import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TitleBarComponent from './TitleBarComponent'
import EventItem, { EventItemType } from './EventItem'
import { GetAllEventHTTP } from '../../../../http/chien_event/EventHTTP'

const PARTICIPANTS = [
  require('../../../../media/icon/avt_1_icon.png'),
  require('../../../../media/icon/avt_2_icon.png'),
  require('../../../../media/icon/avt_3_icon.png'),
  require('../../../../media/icon/avt_3_icon.png'),
]

const UpcomingEventsComponent = () => {
  const [events, setEvents] = useState([])
  async function GetEvent() {
    const response = await GetAllEventHTTP()
    setEvents([...response])
  }

  useEffect(() => {
    GetEvent()
  }, [])

  return (
    <View style={styles.container}>
      <TitleBarComponent title='Sự kiện mới nhất' />
      <FlatList
        data={events}
        renderItem={({item}:{item:EventItemType}) => {
          return (
            <EventItem event={item} />
          )
        }}
        keyExtractor={item=>item.id.toString()}
        horizontal={true}
      />


    </View>
  )
}

export default UpcomingEventsComponent

const styles = StyleSheet.create({
  container:{
  }
})