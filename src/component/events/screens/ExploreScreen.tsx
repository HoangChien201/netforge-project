import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderExplore from '../component/home/HeaderExplore'
import UpcomingEventsComponent from '../component/home/UpcomingEventsComponent'
import ListPostsItem from '../component/posts/ListPostsItem'
import { GetAllPosts } from '../../../http/chien_posts/PostHTTP'

const ExploreScreen = ({navigation}) => {
  const [posts, setPosts] = useState([])
  async function GetPost() {
    const response = await GetAllPosts()
    setPosts([...response])
  }

  useEffect(() => {
    GetPost()
  }, [])
  return (
    <View style={styles.container}>
      <HeaderExplore navigation={navigation}/>
      <ScrollView style={styles.content}>
        <UpcomingEventsComponent/>
        <Text style={styles.title}>Bài viết</Text>
        <ListPostsItem list_post={posts} scrollEnabled={false}/>
      </ScrollView>
    </View>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container:{
    paddingBottom:160,
    backgroundColor:'#fff'
  },
  content:{
    paddingHorizontal:24,
    marginBottom:20
  },
  title:{
    fontSize:18,
    color:'#000',
    fontWeight:'600',
    marginVertical:20
}
})