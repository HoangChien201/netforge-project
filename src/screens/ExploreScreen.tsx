import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ImageProps, FlatList, ScrollView, Modal } from 'react-native'
import React, { useState, useEffect, useId, useRef, useMemo } from 'react'
import { COLOR } from '../constant/color'
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetView, } from '@gorhom/bottom-sheet';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { searchUser } from '../http/TuongHttp';
import { NavigateRootStackEnum, NavigateRootStackParams } from '../component/stack/StackNavigate'



export type RecentItem = {
  id: number,
  fullname: string,
  avatar: ImageProps,
}
interface ItemRender {
  id?: number,
  image?: ImageProps,
  name: string
}
const DATA: Array<RecentItem> = [
  {
    id: 1,
    fullname: 'Lê Thanh Tường',
    avatar: require('../media/icon/avt_1_icon.png'),
  },
]



const ExploreScreen = () => {
  const navigation:NavigationProp<ParamListBase> = useNavigation();
  const Open = () => {
    navigation.navigate(NavigateRootStackEnum.CommentsScreen);
  }
  // modal comments
  const [keyword, setKeyword] = useState('');

  const onSearch = async text =>{
    if(text.trim() === ''){
      setUser([]);
      setIsSearching(true)
      return;
    }
    try {
      const result = await searchUser(text)
      setUser(result);
      setIsSearching(false)
    } catch (error) {
      console.log(error);
    }
   
  }
  const [isSearching, setIsSearching] = useState(true);
  const [users, setUser] = useState([]);
  const [modalVisible, setModalVisibal] = useState(false);
  const [items, setItems] = useState<Array<RecentItem>>(DATA);
  const DeleteItem = (id: number) => {
    const newData = items.filter(item => item.id !== id)
    setItems(newData);

  }
  const addItem = (item: RecentItem) => {
    if (!items.some(existingItem => existingItem.id === item.id)) {
      setItems(prevItems => [...prevItems, item]);
    }
  };

  const RenderItem = ({item, onPress = () => {}}) => {
    const {id, fullname, avatar} = item
    return(
      <View style={styles.itemRecentContai}>
             <TouchableOpacity style={styles.itemRecent}  onPress={() => onPress(item)}>
               <Image source={require('../media/icon_tuong/imagecuatoi.jpg')} style={styles.imageItem} />

               <Text style={styles.nameItem}>{fullname}</Text>
               <TouchableOpacity onPress={() => DeleteItem(item.id)} style = {{marginRight:10}}>
                 <Image source={require('../media/icon_tuong/option.png')} style={{ width: 25, height: 25 }} />
               </TouchableOpacity>

             </TouchableOpacity>
           </View>
    );
  }




  return (
    
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.SearchContai}>
            <TouchableOpacity>
              <Image source={require('../media/icon_tuong/search.png')} style={styles.iconSearch} />
            </TouchableOpacity>
            <TextInput style={styles.SearchInputn} onChangeText={text => {
              setKeyword(text)
              onSearch(text)
            }} value={keyword} onFocus={()=> setIsSearching(false)}>
            </TextInput>
            <TouchableOpacity>
              <Image source={require('../media/icon_tuong/mic.png')} style={styles.iconMic} />
            </TouchableOpacity>
          </View>
        </View>
        {users.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
          {users.map(item => {
              return(
                <View key={item.id}>
                  <RenderItem item={item}/>
                </View>
              )
            })}
          </ScrollView>
        ) :(keyword.trim() !== '' &&(
            <View style ={styles.ViewNull}>
            <Text style= {styles.textNull}>Không có kết quả</Text>
          </View>
          
        ))}
       {isSearching && users.length === 0  && (
         <View>
         <View style={styles.RecentContai}>
           <Text style={styles.Recent}>Gần đây</Text>
           <TouchableOpacity onPress={() => setModalVisibal(true)}>
             <Text style={styles.ClearAll}>Xóa tất cả</Text>
           </TouchableOpacity>
         </View>
        <ScrollView showsVerticalScrollIndicator={false}>

        </ScrollView>


       </View>
       )}
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}>
          <View style={styles.Modal}>
            <Text style={styles.status}>Bạn muốn xóa tất cả không</Text>
            <View style={styles.viewBtnModal}>
              <TouchableOpacity style={styles.Btn}>
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisibal(false)} style={styles.Btn}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>

        </Modal>

        <TouchableOpacity onPress={() => Open()} >
          <Text>Open Moddal</Text>
        </TouchableOpacity>
       </View>
       </BottomSheetModalProvider>

  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  textNull:{
    fontSize: 18,
    fontWeight: '700',
    color: 'black'
  },
  ViewNull:{
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white'
  },
  Btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 35,
    borderWidth: 1,
    margin: 15,
    borderRadius: 5,
    backgroundColor: COLOR.PrimaryColor
  },
  viewBtnModal: {
    flexDirection: 'row',

  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginTop: 15

  },
  Modal: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    margin: 50,
    marginTop: 340,
    marginBottom: 340,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  middle: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  itemRecentContai: {
    marginTop: 15,
    flexDirection: 'column',


  },
  nameItem: {
    position: 'absolute',
    left: 58,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  imageItem: {
    marginStart:10,  
    borderRadius: 100,
    width: 38,
    height: 38
  },
  itemRecent: {

    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    padding: 20,

  },
  iconSearch: {
    width: 18,
    height: 18
  },
  iconMic: {
    width: 18, height: 18
  },
  SearchContai: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    width: 350,
    height: 38,
    backgroundColor: '#E3E1E6',
    borderRadius: 10,
  },
  SearchInputn: {
    width: 230, height: 50,
    marginStart: 10,
    marginRight: 50
  },
  RecentContai: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  Recent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'

  },
  ClearAll: {
    fontSize: 16,
    color: COLOR.PrimaryColor

  },


})