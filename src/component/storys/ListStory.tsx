import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import ItemStory from './ItemStory'


const DATA = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 1' },
  { id: '5', title: 'Item 2' },
  { id: '6', title: 'Item 3' },
  { id: '7', title: 'Item 1' },
  { id: '8', title: 'Item 2' },
  { id: '9', title: 'Item 3' },
  { id: '10', title: 'Item 1' },
  { id: '11', title: 'Item 2' },
  { id: '12', title: 'Item 3' },
  { id: '13', title: 'Item 1' },
  { id: '14', title: 'Item 2' },
  { id: '15', title: 'Item 3' },
]
const ListStory = () => {
  const [data,setData] = useState(DATA)
  const [index,setIndex] = useState(0);
  const flatRef = useRef<FlatList>(null)
  const {width,height} = Dimensions.get('screen');
console.log(index);

  useEffect(()=>{
    flatRef.current?.scrollToIndex({index,animated:true,viewPosition:0})
    console.log("dfdf");
    
  },[index])

  return (
    <View style={{ flex: 0 }}>
      <FlatList
      ref={flatRef}
      contentContainerStyle={{padding:10}}
      style={{flexGrow:0}}
      initialScrollIndex={index}
      data={data}
      renderItem={({item,index:findindex})=>{
        return(
          <ItemStory setIndex={setIndex} index={index} indexfind={findindex}/>
        )
      }}
      keyExtractor={item=>item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default ListStory

const styles = StyleSheet.create({})