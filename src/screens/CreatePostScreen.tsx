import { Alert, Animated, Easing, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { replaceMentionValues } from 'react-native-controlled-mentions'
import { useNavigation } from '@react-navigation/native'

import { COLOR } from '../constant/color'
import BODY from '../component/create-post-screen/Body'
import { upLoadMedia, createNewPost } from '../http/QuyetHTTP'
import ModalPoup from '../component/Modal/ModalPoup'
import ModalFail from '../component/Modal/ModalFail'
import { fileType } from '../component/create-post-screen/Options'
import Loading from '../component/Modal/Loading'
import { useSendNotification } from '../constant/notify'
import GenerImageAI from '../component/create-post-screen/GenerImageAI'
import { RootState } from '../component/store/store'
const CreatePostScreen = memo(() => {
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);
  const user = useSelector((state : RootState)=>state.user.value)
  const [friends, setFriends] = useState([]);
  const [content, setContent] = useState('');
  // const [tags, setTags] = useState([]);
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const type = 1;
  const isFocused = useIsFocused()
  const [permission, setPermission] = useState(1);
  const [emotions, setEmotions] = useState(null);
  const [emotion, setEmotion] = useState(0);

  const [sendAll, setSendAll] = useState(true);
  const { sendNCreateNewPostHistory, sendTagFriend } = useSendNotification();

  const [showAI, setShowAI] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const navigation = useNavigation();
  const contentRef = useRef(content);
  const mediaRef = useRef(media);
  const emotionRef = useRef(emotions);
  const [hiddenView, setHiddenView] = useState(false);
  // const [imageUrl, setImageUrl] = useState('https://oaidalleapiprodscus.blob.core.windows.net/private/org-xPqRqNjg7rhJctL5M8HgZuVW/user-7aLXFzohKCutW9RLwKG25OxW/img-OV7ku7s8LUd6BUMEu0hbXT4v.png?st=2024-07-11T14%3A47%3A14Z&se=2024-07-11T16%3A47%3A14Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-10T23%3A22%3A00Z&ske=2024-07-11T23%3A22%3A00Z&sks=b&skv=2023-11-03&sig=5g5HtkuVSHgbNk%2By60LIx7FLtyaxDdXcR%2BenAaz3CCA%3D');
  let textContent: { name: string; id: string }[] = [];
  let textOnly = '';
  const format = content?.split(/@\[([^\]]+)\]\(\d+\)/g);
  useEffect(() => {
    contentRef.current = content;
  }, [content]);
  let replacedContent  = replaceMentionValues(
    content,
    mention => {
      const { name, id } = mention;
      if (!textContent.some(m => m.id === id)) {
        textContent.push({ name, id });
      }
      return name;
    }
  );
  textContent.forEach(mention => {
    const name = mention.name;
    const regex = new RegExp(`${name} 'g' `);
    replacedContent = replacedContent.replace(regex, '');
  });
  textOnly = replacedContent.trim();
  useEffect(() => {
    mediaRef.current = media;
  }, [media]);
  useEffect(() => {
    emotionRef.current = emotions;
  }, [emotions]);
  useEffect(() => {
    if (emotions) {
      setEmotion(Number(emotions.type))
    } else {
      setEmotion(0);
    }

  }, [emotions])
  const clear = () => {
    setContent('');
    setMedia([]);
    setPermission(1);
    setImageUrl('');
    setEmotions(null);
    navigation.navigate('HomeScreen');
  };

  const handleLeaveScreen = useCallback(() => {
    if (contentRef.current.trim().length > 0 || mediaRef.current.length > 0 || emotionRef.current) {
      Alert.alert(
        'Bài viết chưa được đăng!',
        'Bạn có muốn giữ lại dữ liệu?',
        [
          {
            text: 'Giữ lại',
            onPress: () => {
              //clear();
              navigation.goBack();
            },
          },
          {
            text: 'Xóa bỏ',
            onPress: () => {
              clear();
              //navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
      return true;
    }
    return false;
  }, [navigation]);

  useEffect(() => {
    if (!isFocused) {
      handleLeaveScreen();
    }
  }, [isFocused, handleLeaveScreen]);

  const tags = friends.map(id => ({ user: String(id) }));
  const uploadPost = async () => {
    setIsLoading(true);
    try {
      if (media && media.length > 0 && content.length > 0) {
        const formData = new FormData();
        media.forEach((file: fileType, index) => {
          formData.append('files', {
            uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
            type: file.type || 'image/jpeg',
            name: file.fileName || `image-${index}.jpg`,
          });
        });
        const uploadedMedias = await upLoadMedia(formData);
        let medias: { url: any; resource_type: any }[] = [];
        if (Array.isArray(uploadedMedias)) {
          medias = uploadedMedias.map(item => ({
            url: item.url,
            resource_type: item.resource_type,
          }));
        } else {
          console.error('uploadedMedias is not an array or is undefined');
        }
        // if (imageUrl) {
        //   medias.push({
        //     url: imageUrl,
        //     resource_type: 'image/jpeg'
        //   });
        //   console.log('Added imageUrl to media paths:', medias);
        // }
        //Create new post with the uploaded media paths
        const newPost = await createNewPost({ content, type, tags, medias, permission, emotion });
        if (newPost.status == 1 && permission == 1) {
          handleSendReaction(newPost);
          handleSendTags(newPost);
        }
        if (newPost.status == 1) {
          setTimeout(() => {
            setIsLoading(false);
            setStatus('Tạo bài viết thành công');
            setShowPopup(true);
            setIsError(false);
            setTimeout(() => {
              setStatus('');
              setShowPopup(false);
              setIsError(true);
              clear();
            }, 1500);

          }, 1000);
        } else {
          console.error('Lỗi khi tạo bài viết!', newPost.message);
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

      } else if (content.length > 0) {
        // upload post withought media
        let medias: { url: any; resource_type: any }[] = [];
        if (imageUrl) {
          medias.push({
            url: imageUrl,
            resource_type: 'image'
          });
        }
        const newPost = await createNewPost({ content, type, tags, medias, permission, emotion });
        if (newPost.status == 1 && permission == 1) {
          handleSendReaction(newPost);
          handleSendTags(newPost);
        }
        if (newPost.status == 1) {
          setTimeout(() => {
            setIsLoading(false);
            setStatus('Tạo bài viết thành công');
            setShowPopup(true);
            setIsError(false);
            setTimeout(() => {
              setStatus('');
              setShowPopup(false);
              clear();
            }, 1500);

          }, 1000);

        } else {
          console.error('Lỗi khi tạo bài viết:', newPost.message);
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

  const handleSendReaction = (post: any) => {
    const data = {
      postId: post.post,
      body: textOnly
    };

    sendNCreateNewPostHistory(data);

  };
  const handleSendTags = (post: any) => {
    if (friends.length > 0) {
      friends.forEach(friend => {
        const data2 = {
          postId: post.post,
          body: textOnly,
          receiver: Number(friend)
        };
        sendTagFriend(data2);

      });
    } else {
      console.log('No friends to tag');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Khi màn hình được focus, hiển thị lại bottom-tab
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#1F1F2F',
          margin: 20,
          borderRadius: 15,
        },
      });
    }, [navigation])
  );

  const handleKeyboardShow = useCallback(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      }
    });
    setHiddenView(true)
  }, []);
  const handleKeyboardHide = useCallback(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#1F1F2F',
        margin: 20,
        borderRadius: 15
      },
    });
    setHiddenView(false)
  }, []);
  useFocusEffect(
    useCallback(() => {
      // Lắng nghe sự kiện hiển thị và ẩn bàn phím
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, [handleKeyboardShow, handleKeyboardHide]),
  );
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Loading isLoading={isLoading} />
      <View style={styles.header} >
        <Text style={styles.headerText}>Tạo bài viết</Text>
        <TouchableOpacity onPress={uploadPost} style={styles.buttonD}>
          <Text style={styles.headerPostText} >Đăng</Text>
        </TouchableOpacity>
      </View>
      <BODY
        hiddenView={hiddenView}
        content={content}
        setContent={setContent}
        media={media}
        setMedia={setMedia}
        permission={permission}
        setPermission={setPermission}
        setStatus={setStatus}
        setShowPopup={setShowPopup}
        friends={friends}
        setFriends={setFriends}
        setShowAI={setShowAI}
        imageUrl={imageUrl}
        emotions={emotions}
        setEmotions={setEmotions}
        setImageUrl ={setImageUrl}
        setHiddenView={setHiddenView}
      />
      {showPopup ? (
        isError ? (
          <ModalFail text={status} visible={showPopup} />
        ) : (
          <ModalPoup text={status} visible={showPopup} />
        )
      ) : null}
      <GenerImageAI showAI={showAI} setShowAI={setShowAI} imageUrl={imageUrl} setImageUrl={setImageUrl} />
    </KeyboardAvoidingView>
  )
});

export default CreatePostScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.PrimaryColor,
    height: '100%',
    width: '100%'
  },
  header: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16
  },
  headerText: {
    color: COLOR.primary300,
    fontWeight: '700',
    fontSize: 24,

  },
  headerPostText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 17

  },
  headerClose: {
    height: 40,
    width: 40,
  },
  buttonD: {
    borderRadius: 5,
    marginEnd: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }

})