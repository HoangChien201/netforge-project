import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BrowsePostsItem, { PostsItemType } from '../component/BrowsePostsItem'
import { GetBrowseEventHTTP, GetBrowsePostsHTTP } from '../../../http/admin/BrowseHTTP'
import Loading from '../../events/component/ui/Loading'
import { useIsFocused } from '@react-navigation/native'

const BrowsePosts = () => {
  const [listBrowsePosts,setListBrowsePosts]=useState<Array<PostsItemType>>([])
  const [isLoading,setIsLoading]=useState(false)
  const isFocus=useIsFocused()

  async function GetBrowsePosts() {
    setIsLoading(true)

    const browsePost=await GetBrowsePostsHTTP()
    setListBrowsePosts([...browsePost])

    setIsLoading(false)

}

useEffect(()=>{
    GetBrowsePosts()
    setInterval(()=>{
      isFocus && GetBrowsePosts()
    }, 10000)
},[])

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading}/>

      <FlatList
        data={listBrowsePosts}
        renderItem={({item})=>{
          return (
            <BrowsePostsItem item={item} getBrowsePosts={GetBrowsePosts}/>
          )
        }}
        keyExtractor={item=>item.id.toString()}
      />
    </View>
  )
}

export default BrowsePosts

const styles = StyleSheet.create({
  container:{
    padding:16
  }
})