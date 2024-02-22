import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BrowseEventItem, { EventItemType } from '../component/BrowseEventItem'
import { GetBrowseEventHTTP } from '../../../http/admin/BrowseHTTP'
import Loading from '../../events/component/ui/Loading'

const BrowseEvent = () => {
  const [listBrowseEvent, setListBrowseEvent] = useState<Array<EventItemType>>([])
  const [isLoading, setIsLoading] = useState(false)

  async function GetBrowseEvent() {
    setIsLoading(true)
    const browseEvent = await GetBrowseEventHTTP()
    setListBrowseEvent([...browseEvent])
    setIsLoading(false)

  }

  useEffect(() => {
    GetBrowseEvent()
    setInterval(GetBrowseEvent, 10000)
  }, [])

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
      <FlatList
        data={listBrowseEvent}
        renderItem={({ item }) => {
          return (
            <BrowseEventItem item={item} getBrowseEvent={GetBrowseEvent} />
          )
        }}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default BrowseEvent

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    alignItems: 'center'
  }
})