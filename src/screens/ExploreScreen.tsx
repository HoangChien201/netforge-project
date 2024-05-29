import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ImageProps, FlatList, ScrollView, Modal } from 'react-native'
import React, { useState, useEffect, useId, useRef, useMemo } from 'react'
import { COLOR } from '../constant/color'
import { useNavigation } from '@react-navigation/native'
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetView, } from '@gorhom/bottom-sheet';
import CommentsScreen from './CommentsScreen'

export type RecentItem = {
  id: number,
  image: ImageProps,
  name: string
}
interface ItemRender {
  id?: number,
  image?: ImageProps,
  name: string
}
const DATA: Array<RecentItem> = [
  {
    id: 1,
    image: require('../media/icon/avt_1_icon.png'),
    name: 'Lê Thanh Tường'
  },
  {
    id: 2,
    image: require('../media/icon/avt_1_icon.png'),
    name: 'Tường Cu To'
  },
  {
    id: 3,
    image: require('../media/icon/avt_1_icon.png'),
    name: 'Tường Đẹp Trai'
  },

]



const ExploreScreen = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['90%', '90%', '90%', '90%'], []);
  const handleCloseModal = () =>{
    bottomSheetRef.current?.close();
  }
  const Open = () => {
    bottomSheetRef.current?.present()
  }
  // modal comments
  const [modalComments, setModalComments] = useState(false);
  const [modalVisible, setModalVisibal] = useState(false);
  const [items, setItems] = useState<Array<RecentItem>>(DATA);
  const DeleteItem = (id: number) => {
    const newData = items.filter(item => item.id !== id)
    setItems(newData);

  }

  // const RenderItemRecent: React.FC<ItemRender> = ({ id,image, name }) => {

  //   return (

  //   )
  // }


  return (
    
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.SearchContai}>
            <TouchableOpacity>
              <Image source={require('../media/icon_tuong/search.png')} style={styles.iconSearch} />
            </TouchableOpacity>
            <TextInput style={styles.SearchInputn}>
            </TextInput>
            <TouchableOpacity>
              <Image source={require('../media/icon_tuong/mic.png')} style={styles.iconMic} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.RecentContai}>
            <Text style={styles.Recent}>Gần đây</Text>
            <TouchableOpacity onPress={() => setModalVisibal(true)}>
              <Text style={styles.ClearAll}>Xóa tất cả</Text>
            </TouchableOpacity>
          </View>
         <ScrollView>
         {items.map((item) => (
             <View key={item.id} style={styles.itemRecentContai}>
             <TouchableOpacity style={styles.itemRecent}>
               <Image source={item.image} style={styles.imageItem} />

               <Text style={styles.nameItem}>{item.name}</Text>
               <TouchableOpacity onPress={() => DeleteItem(item.id)}>
                 <Image source={require('../media/icon_tuong/exit.png')} style={{ width: 25, height: 25 }} />
               </TouchableOpacity>

             </TouchableOpacity>
           </View>
          ))}
         </ScrollView>


        </View>
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
       
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}

        >
          <BottomSheetView>
            <CommentsScreen/>
          </BottomSheetView>

        </BottomSheetModal>
     
      
       </View>
       </BottomSheetModalProvider>

  )
}

export default ExploreScreen

const styles = StyleSheet.create({
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
    marginTop: 295,
    marginBottom: 295,
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
    left: 50,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  imageItem: {
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