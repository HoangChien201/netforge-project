import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAll, deletePost } from '../../http/userHttp/getpost';
import { useFocusEffect } from '@react-navigation/native';
import ItemStory from './ItemStory';

const ListStory = ({ onrefresh }) => {
  const [data, setData] = useState([]);
  const [postss, setPostID] = useState([]);
  const flatRef = useRef(null);
  const [index, setIndex] = useState(0);
  const { width, height } = Dimensions.get('screen');


  

  useEffect(() => {
    if (data.length > 0 && index < data.length) {
      flatRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0 });
    }
  }, [index, data]);

  const getAllPost = useCallback(async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response:any = await getAll(token);
      if (response.length > 0) {
        const createrMap = new Map();
        response.forEach((post) => {
          if (post.type === 2 || post.type === 3) {
            const createdAtDate = new Date(post.create_at);
            const currentDate = new Date();
            const differenceInMilliseconds = currentDate - createdAtDate;
            const hoursDifference = differenceInMilliseconds / (1000 * 60 * 60);

            if (hoursDifference >= 24) {
              setTimeout(async () => {
                try {
                  await deletePost(post.id);
                } catch (error) {
                  console.error(`Lỗi khi xóa bài đăng ${post.id}:`, error);
                }
              }, 500);
            } else {
              if (!createrMap.has(post.creater.id)) {
                createrMap.set(post.creater.id, {
                  creater_id: post.creater.id,
                  avatar: post.creater.avatar,
                  fullname: post.creater.fullname,
                  posts: [],
                });
              }
              createrMap.get(post.creater.id).posts.push(post);
            }
          }
        });

        const groupedPosts = Array.from(createrMap.values());
        setData([...groupedPosts]);
        
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllPost();
  }, [getAllPost, onrefresh]);

  useFocusEffect(
    useCallback(() => {
      getAllPost();
    }, [getAllPost,onrefresh])
  );

 

  return (
    <View style={{ flex: 0 }}>
      <FlatList
        ref={flatRef}
        contentContainerStyle={{ padding: 10 }}
        style={{ flexGrow: 0 }}
        initialScrollIndex={index}
        data={data}
        renderItem={({ item, index: findindex }) => (
          <ItemStory
            list={data}
            data={item}
            setIndex={setIndex}
            index={index}
            indexfind={findindex}
          />
        )}
        keyExtractor={(item, index) => item.creater_id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ListStory;

const styles = StyleSheet.create({});
