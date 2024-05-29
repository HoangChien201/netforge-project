import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../constant/color'
import BODY from '../component/create-post-screen/Body'
import BODYMODAL from '../component/edit-post-modal/Body'
import { upLoadMedia, createNewPost } from '../http/QuyetHTTP'

const CreatePostScreen = () => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [text, setText] = useState('');
  const [media, setMedia] = useState([]);
  const [type, setType] = useState(1);
  const [creator, setCreator] = useState(2)

  // upload ảnh lên cloud và tạo bài viết mới
  const uploadPost = async () => {
    console.log('text: ' + text, 'media: ' + media, 'type: ' + type, 'creator: ' + creator);
    try {
      if (media && media.length > 0) {
        let uploadedMediaPaths = [];
        // Upload multiple media files
        const formData = new FormData();
        media.forEach((file, index) => {
          // console.log("File " + (index + 1) + ":");
          // console.log("URI:", file);
          // console.log("Type: " + (file.type || 'image/jpeg'));
          // console.log("Name: " + (file.name || `media${index}.jpg`));
          // let imgPath = file.replace("file:///", "");
          // console.log(imgPath);
          
          // Append each file to FormData
          formData.append('media', {
            uri: file,
            type: file.type || 'image/jpeg', 
            name: file.name || `media${index}.jpg`, 
          });
        });

        // upload media to cloudinary
        const uploadResult = await upLoadMedia(formData);
        uploadedMediaPaths = uploadResult.map(item => item.url);

        console.log('Uploaded media paths:', uploadedMediaPaths);

        //Create new post with the uploaded media paths
        const newPost = await createNewPost(creator, type, text, uploadedMediaPaths);
        console.log('Bài viết đã được tạo:', newPost);

        // Close the modal after creating the post
      } else {
        // upload post withought media

        console.log('No media to upload');
      }
    } catch (error) {
      console.error('Lỗi khi tạo bài viết:', error);
    }
  };

  const log = () => {
    console.log(text, media, type, creator);

  }
  const ShowModalEdit = () => {
    setShowModalEdit(true);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <TouchableOpacity>
          <Image style={styles.headerClose} source={require('../media/quyet_icon/x_w.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create New Post</Text>
        <TouchableOpacity onPress={ShowModalEdit} >
          <Text style={styles.headerPostText} >Post</Text>
        </TouchableOpacity>
      </View>
      <BODY text={text} setText={setText} media={media} setMedia={setMedia} type={type} setType={setType}></BODY>
      <BODYMODAL showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} />
    </View>
  )
}

export default CreatePostScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.PrimaryColor,
    height: '100%',
    width: '100%'
  },
  header: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16
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