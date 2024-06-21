import { FlatList, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import ItemPost from './ItemPost';
import { getAll } from '../../http/userHttp/getpost';
import { AxiosResponse } from 'axios';

const ListPorts = ({onrefresh}) => {
  const [islike, setIsLike] = useState(false);
  const [active,setActive]= useState<number | null>(null)
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const getAllPost = async () => {
      try {
        const response: any = await getAll();
     
        if (response) {
          // const filteredPosts = response.filter(post => post.type === 1);
          setData([...response]);
        } else {
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };
     getAllPost();
  }, [onrefresh]);

  return (
    <View style={{ backgroundColor: 'rgba(155,155,155,0.2)' }}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return <ItemPost active={active} setActive={setActive} index={index} setIsLike={setIsLike} islike={islike} data={item} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListPorts;

const styles = StyleSheet.create({});
