import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import ItemPost from './ItemPost'
import { getAll } from '../../http/userHttp/getpost'
import { AxiosResponse } from 'axios'

const ListPorts = () => {
  const [data, setData] = useState([])


  useEffect(()=>{
    const getAllPost = async () => {
      try {
        const response:AxiosResponse<any, any> = await getAll();
        //console.log("res",response);
        if(response){
          const filteredPosts = response.filter(post => post.type === 1);
          setData([...response]);
        }else{
          return
        }
       
      } catch (error) {
        console.error(error);
      }
    };
    getAllPost()
  },[])

  return (
    <View>

      <FlatList
        data={data}
        renderItem={(item) => {
          return <ItemPost data={item} />
        }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />

    </View>
  )
}

export default ListPorts

const styles = StyleSheet.create({

})

const Data = [
  {
    id: 1,
    name: "Lê Hoàng Duy",
    time: 4,
    content: "Khoảng thời gian hôm ấy t chợt nhận ra",
    image: ["https://th.bing.com/th/id/OIP.dNct3PwrSiNPbWW_VynaIgHaFj?w=500&h=375&rs=1&pid=ImgDetMain",
      "https://res.cloudinary.com/dyjxyz2jc/video/upload/v1717001460/demo1/ejpinaoiwxunfk8t5mfk.mp4",],
      type:5
  },
  {
    id: 2,
    name: "Lê Thanh Tường",
    time: 15,
    content: "Khoảng thời gian hôm ấy t chợt nhận ra",
    image: ["https://th.bing.com/th/id/OIP.dNct3PwrSiNPbWW_VynaIgHaFj?w=500&h=375&rs=1&pid=ImgDetMain",
      "https://res.cloudinary.com/dyjxyz2jc/video/upload/v1717001460/demo1/ejpinaoiwxunfk8t5mfk.mp4",],
      type:2
  },
  {
    id: 4,
    name: "Lê Hoàng Chiến",
    time: 14,
    content: "Khoảng thời gian hôm ấy t chợt nhận ra",
    image: ["https://th.bing.com/th/id/OIP.dNct3PwrSiNPbWW_VynaIgHaFj?w=500&h=375&rs=1&pid=ImgDetMain",
      "https://res.cloudinary.com/dyjxyz2jc/video/upload/v1717001460/demo1/ejpinaoiwxunfk8t5mfk.mp4",],
      type:1
  },
  {
    id: 5,
    name: "Lục Thiên Phú",
    time: 10,
    content: "Khoảng thời gian hôm ấy t chợt nhận ra",
    image: ["https://th.bing.com/th/id/OIP.dNct3PwrSiNPbWW_VynaIgHaFj?w=500&h=375&rs=1&pid=ImgDetMain",
      "https://res.cloudinary.com/dyjxyz2jc/video/upload/v1717001460/demo1/ejpinaoiwxunfk8t5mfk.mp4",],
    type:4
  },
  {
    id: 6,
    name: "Trần Văn Quyết",
    time: 19,
    content: "Khoảng thời gian hôm ấy t chợt nhận ra",
    type:3
  },
  {
    id: 7,
    name: "Trần Hữu Trí",
    time: 20,
    content: "Khoảng thời gian hôm ấy t chợt nhận ra",
    image: ["https://th.bing.com/th/id/OIP.dNct3PwrSiNPbWW_VynaIgHaFj?w=500&h=375&rs=1&pid=ImgDetMain", "https://th.bing.com/th/id/OIP.dNct3PwrSiNPbWW_VynaIgHaFj?w=500&h=375&rs=1&pid=ImgDetMain",
      "https://res.cloudinary.com/dyjxyz2jc/video/upload/v1717001460/demo1/ejpinaoiwxunfk8t5mfk.mp4",],
      type:6
  }
]