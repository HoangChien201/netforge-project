import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../constant/color'
import BODY from '../component/create-post-screen/Body'
import BODYMODAL from '../component/edit-post-modal/Body'
import {upLoadImage,createNew} from '../http/QuyetHTTP'

const CreatePostScreen = () => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState('');
  const [type, setType] = useState(1);
  // upload ảnh lên cloud và tạo bài viết mới
  const uploadPost = async () => {
    try {
      let uploadedImagePath = imagePath;
      if (image) {
        // Upload hình ảnh trước nếu có
        const formData = new FormData();
        formData.append('file', {
          uri: image,
          type: 'image/jpeg', // hoặc loại file phù hợp
          name: 'photo.jpg', // hoặc tên file phù hợp
        });
        const uploadResult = await upLoadImage(formData);
        uploadedImagePath = uploadResult.path;
      }

      // Tạo bài viết mới
      const newPost = await createNew(id,type, text, uploadedImagePath);
      console.log('Bài viết đã được tạo:', newPost);

      // Đóng modal sau khi tạo bài viết
      setShowModalEdit(false);
    } catch (error) {
      console.error('Lỗi khi tạo bài viết:', error);
    }
  };
  const ShowModalEdit = () =>{
    setShowModalEdit(true);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <TouchableOpacity>
          <Image style={styles.headerClose} source={require('../media/quyet_icon/x_w.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create New Post</Text>
        <TouchableOpacity onPress={ShowModalEdit}>
          <Text style={styles.headerPostText} >Post</Text>
        </TouchableOpacity>
      </View>
      <BODY  text={text} setText={setText} image={image} setImage={setImage} type={type} setType={setType}></BODY>
      <BODYMODAL showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} />
    </View>
  )
}

export default CreatePostScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor: COLOR.PrimaryColor,
    height:'100%',
    width:'100%'
  },
  header: {
    height:'10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginHorizontal:16
  },
  headerText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 24,

  },
  headerPostText: {
    color: 'white',
    fontWeight: '300',
    fontSize: 24

  },
  headerClose: {
    height: 40,
    width: 40,
    

  },

})