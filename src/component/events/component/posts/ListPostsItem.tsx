import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LIST_POSTS } from '../../screens/AboutScreen'
import PostsItem, { PostsItemType } from './PostsItem'

const ListPostsItem = ({list_post,scrollEnabled}:{list_post:Array<PostsItemType>,scrollEnabled:boolean}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={list_post} 
        renderItem={({item})=>{
            return (
                <PostsItem posts={item}/>
            )
        }} 
        keyExtractor={item=>item.id.toString()}
        scrollEnabled={scrollEnabled}
    />
    </View>
  )
}

export default ListPostsItem

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})