import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { user as userRoot, userType } from './ProfileScreen'
import { GetPostsByUserHTTP } from '../../../http/profile/profilehttp'
import PostsItem, { PostsItemType } from '../component/posts/PostsItem'
import ListPostsItem from '../component/posts/ListPostsItem'
const AboutScreen = () => {
  const user: userType = userRoot
  const [listPosts, setListPost] = useState([])

  async function GetPostsByUser() {
    const posts = await GetPostsByUserHTTP(user.id)
    setListPost([...posts])
  }
  useEffect(() => {
    GetPostsByUser()
  }, [])

  return (
    <View style={styles.container}>
      <ListPostsItem list_post={listPosts}/>
    </View>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    flex: 1
  }
})