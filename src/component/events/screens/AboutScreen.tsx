import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetPostsByUserHTTP } from '../../../http/profile/profilehttp'
import PostsItem, { PostsItemType } from '../component/posts/PostsItem'
import ListPostsItem from '../component/posts/ListPostsItem'
import ModalCreatPosts from '../component/posts/ModalCreatPosts'
import Loading from '../component/ui/Loading'
import { useMyContext } from '../../navigation/UserContext'
const AboutScreen = () => {
  const {user}=useMyContext()
  
  const [listPosts, setListPost] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [visibleModalCreatePosts, setVisibleModalCreatePosts] = useState(false)

  async function GetPostsByUser() {
    try {
      setIsLoading(true)

      const posts = await GetPostsByUserHTTP(user.id)
      setListPost([...posts])

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)

    }


  }
  useEffect(() => {
    GetPostsByUser()
  }, [])

  function OpenCreatePosts() {
    setVisibleModalCreatePosts(true)
  }

  function CloseCreatePosts(): void {
    setVisibleModalCreatePosts(false)
  }

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
      <ModalCreatPosts visible={visibleModalCreatePosts} closeModal={CloseCreatePosts} getPosts={GetPostsByUser} />
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Bài viết của bạn</Text>
        <View style={styles.createPost}>
          <Image style={styles.avatar} source={{ uri: user.avatar }} />
          <TouchableOpacity onPress={OpenCreatePosts}>
            <Text style={styles.textYourThink} >Bạn đang nghĩ gì ?</Text>
          </TouchableOpacity>
        </View>
        <ListPostsItem list_post={listPosts} scrollEnabled={false} />

      </ScrollView>
    </View>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    flex: 1
  },
  //createpost-start
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
    borderColor: '#ccc'
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
  //createpost-end

})