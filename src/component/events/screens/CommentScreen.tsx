import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FormComment from '../component/posts/FormComment';
import CommentItem, { CommentType } from '../component/posts/CommentItem';
import { CommentTypeRequest, CreateCommentByPostsHTTP, GetCommentByPostsHTTP } from '../../../http/chien_comment/CommentHTTP';
import { userType } from './ProfileScreen';
import { useMyContext } from '../../navigation/UserContext';

// import { comments } from '../../../http/value'

const CommentScreen = ({route}) => {
  const idPosts=route.params.id;
  const {user}:userType=useMyContext()
  const [valueComment,setValueComment]=useState<Array<CommentType>>([])

  async function GetValueComment() {
    const respone= await GetCommentByPostsHTTP(idPosts)
    setValueComment([...respone])
  }

  useEffect(()=>{
    GetValueComment()
  },[])

  function CancelReplyHandle() {
  }

  async function CommentSubmit(comment:string) {
    const dataComment:CommentTypeRequest={
      posts_id:idPosts,
      user:user.id,
      content:comment
    }
    
      const respone=await CreateCommentByPostsHTTP(dataComment)
      
      GetValueComment()
  }
  return (
    <View style={styles.container}>
      <View style={styles.commnents}>
        <FlatList
          data={valueComment}
          renderItem={({ item }) => {
            return (
                <CommentItem item={item}/>
            )
          }}
          keyExtractor={item => item.comment_id.toString()}
          showsVerticalScrollIndicator={false}
        />

      </View>
      <FormComment onPressCancle={CancelReplyHandle} submit={CommentSubmit} />
    </View>
  )
}

export default CommentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    paddingTop:16
  },
  commnents: {
    flex: 1,
    paddingHorizontal: 24,

  },

})