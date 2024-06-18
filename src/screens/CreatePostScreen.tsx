import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../constant/color'
import BODY from '../component/create-post-screen/Body'
import BODYMODAL from '../component/edit-post-modal/Body'
import { upLoadMedia, createNewPost } from '../http/QuyetHTTP'
import ModalPoup from '../component/Modal/ModalPoup'
import ModalFail from '../component/Modal/ModalFail'
import { useMyContext } from '../component/navigation/UserContext';
import { fileType } from '../component/create-post-screen/Options'
import Loading from '../component/Modal/Loading'

const CreatePostScreen = () => {
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);
  const { user, setUser } = useMyContext();
  const [friends, setFriends] = useState([]);
  const [content, setContent] = useState('duy ne');
  // const [tags, setTags] = useState([]);
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const type = 1;
  const [permission, setPermission] = useState(1)
  const clear = () => {
    setContent('');
    setMedia([]);
    setPermission(1);
  };
  const tags = [
    { "user": "1" },
    { "user": "2" }
  ];
  const uploadPost = async () => {
    try {
      setIsLoading(true);
      if (media && media.length>0 && content.length > 0) {
        const formData = new FormData();
        media.forEach((file: fileType, index) => {
          formData.append('files', {
            uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
            type: file.type || 'image/jpeg', 
            name: file.fileName || `image-${index}.jpg`,
          });
        });
        console.log('media: ' + media);
        console.log('formData: ' + JSON.stringify(formData))
        const uploadedMedias = await upLoadMedia(formData);
        let medias: { url: any; resource_type: any }[] = [];
        if (Array.isArray(uploadedMedias)) {
          medias = uploadedMedias.map(item => ({
            url: item.url,
            resource_type: item.resource_type,
          }));
          console.log('Uploaded media paths:', medias);
        } else {
          console.error('uploadedMedias is not an array or is undefined');
        }
        //Create new post with the uploaded media paths
        const newPost = await createNewPost({ content, type, tags, medias, permission });
        console.log('Bài viết đã được tạo:', JSON.stringify(newPost));
        setTimeout(() => {
          setIsLoading(false);
          setStatus('Tạo bài viết thành công');
          setShowPopup(true);
          setIsError(false);
          setTimeout(() => {
            setStatus('');
            setShowPopup(false);
            setIsError(true);
          }, 1500);
        }, 1000);
        clear();
      } else if (content.length > 0) {
        // upload post withought media
        console.log('here: ' + JSON.stringify(media));
        const newPost = await createNewPost({ content, type, tags, permission });
        console.log('Bài viết đã được tạo không medias:', newPost);
        setTimeout(() => {
          setIsLoading(false);
          setStatus('Tạo bài viết thành công');
          setShowPopup(true);
          setIsError(false);
          setTimeout(() => {
            setStatus('');
            setShowPopup(false);
          }, 1500);
        }, 1000);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setStatus('Bạn chưa viết gì');
          setShowPopup(true);
          setIsError(true);
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
        setIsLoading(false);
        setStatus('Có lỗi khi tạo');
        setShowPopup(true);
        setIsError(true);
        setTimeout(() => {
          setStatus('');
          setShowPopup(false);
        }, 1500);
      }, 1000);
    }
  };

  const log = () => {
    //const tags = friends.map(friendId => ({ friendId: String(friendId) }));
    console.log(content, media, type, permission, tags);

  }

  const uries = media.map((file: fileType) => file.uri)

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
      <View style={styles.header} >
        <Text></Text>
        <Text style={styles.headerText}>Tạo bài viết</Text>
        <TouchableOpacity onPress={uploadPost} >
          <Text style={styles.headerPostText} >Lưu</Text>
        </TouchableOpacity>
      </View>
      <BODY content={content}
        setContent={setContent}
        media={uries}
        setMedia={setMedia}
        permission={permission}
        setPermission={setPermission}
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