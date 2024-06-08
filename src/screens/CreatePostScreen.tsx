import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../constant/color'
import BODY from '../component/create-post-screen/Body'
import BODYMODAL from '../component/edit-post-modal/Body'
import { upLoadMedia, createNewPost } from '../http/QuyetHTTP'
import ModalPoup from '../component/Modal/ModalPoup'
import ModalFail from '../component/Modal/ModalFail'
import { useMyContext } from '../component/navigation/UserContext';
const CreatePostScreen = () => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState([]);
  const [type, setType] = useState(1);
  const [creator, setCreator] = useState(2)
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);
  const { user, setUser } = useMyContext();
  const [friends, setFriends] = useState([]);
  // upload ảnh lên cloud và tạo bài viết mới

  const clear =() =>{
    setText('');
    setMedia([]);
    setType(1);
  }
  const uploadPost = async () => {
    console.log('text: ' + text, 'media: ' + media, 'type: ' + type, 'creator: ' + user._id , 'friends: '+friends) ;
    setCreator(user._id);
    const tags = friends.map(friendId => ({ friendId: String(friendId) }));
    try {
      if (media && media.length > 0 && text.length > 0) {
        let uploadedMediaPaths = [];
        // Upload multiple media files
        const formData = new FormData();
        media.forEach((file, index) => {
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
        const newPost = await createNewPost({ creator, type, text,tags, uploadedMediaPaths });
        console.log('Bài viết đã được tạo:', newPost);
        setTimeout(() => {
          setStatus('Tạo bài viết thành công');
          setShowPopup(true);
          setIsError(false);
          // Đặt lại giá trị sau một khoảng thời gian nhất định
          setTimeout(() => {
            setStatus('');
            setShowPopup(false);
            setIsError(true);
          }, 1500);
        }, 1000);
        clear();
        // Close the modal after creating the post
      } else if (text.length > 0) {
        // upload post withought media
        const newPost = await createNewPost({ creator, type, text, tags });
        console.log('Bài viết đã được tạo:', newPost);
        setTimeout(() => {
          setStatus('Tạo bài viết thành công');
          setShowPopup(true);
          setIsError(false);
          // Đặt lại giá trị sau một khoảng thời gian nhất định
          setTimeout(() => {
            setStatus('');
            setShowPopup(false);
          }, 1500);
        }, 1000);
      } else {
        setTimeout(() => {
          setStatus('Bạn chưa viết gì');
          setShowPopup(true);
          setIsError(true);
          // Đặt lại giá trị sau một khoảng thời gian nhất định
          setTimeout(() => {
            setStatus('');
            setShowPopup(false);
          }, 1500);
        }, 1000);
      }
      clear();
    } catch (error) {
      console.error('Lỗi khi tạo bài viết:', error);
      setTimeout(() => {
        setStatus('Có lỗi khi tạo');
        setShowPopup(true);
        setIsError(true);
        // Đặt lại giá trị sau một khoảng thời gian nhất định
        setTimeout(() => {
          setStatus('');
          setShowPopup(false);
        }, 1500);
      }, 1000);
    }
  };

  const log = () => {
    const tags = friends.map(friendId => ({ friendId: String(friendId) }));
    console.log(text, media, type,tags);

  }
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <TouchableOpacity>
          <Image style={styles.headerClose} source={require('../media/quyet_icon/x_w.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tạo bài viết</Text>
        <TouchableOpacity onPress={uploadPost} >
          <Text style={styles.headerPostText} >Lưu</Text>
        </TouchableOpacity>
      </View>
      <BODY text={text}
        setText={setText}
        media={media}
        setMedia={setMedia}
        type={type}
        setType={setType}
        setStatus={setStatus}
        setShowPopup={setShowPopup}
        friends={friends}
        setFriends={setFriends}

      />
      {showPopup ? (
        isError ? (
          <ModalFail text={status} visible={showPopup} />
        ) : (
          <ModalPoup text={status} visible={showPopup} />
        )
      ) : null}
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