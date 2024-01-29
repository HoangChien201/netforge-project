<<<<<<< HEAD
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageProps, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
=======
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageProps, FlatList, Modal } from 'react-native'
import React, { useState, useCallback, useMemo, useRef } from 'react'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';




>>>>>>> 3709edf (modalshare)




const CATEGORIES: Array<CategoryEntity> = [
  {
    id: 1,
    image: require('../../../media/icon/avt_1_icon.png'),
    name: 'LeHoangChien',
    status: 'Like you events',
    minute: '1 year ago',
  },
  {
    id: 2,
    image: require('../../../media/icon/avt_3_icon.png'),
    name: 'LeHoangDuy',
    status: 'Like you events',
    minute: '2 year ago',
  },
  {
    id: 3,
    image: require('../../../media/icon/avt_1_icon.png'),
    name: 'LucThienPhu',
    status: 'Your Event Gala Music Festival',
    minute: '1 year ago',
  }
];
type CategoryEntity = {
  id: number,
  image: ImageProps,
  name: string,
  status: string,
  minute: string
}
interface ItemRenderProp {
  id?: number,
  image?: ImageProps,
  name: string,
  status: string,
  minute: string
}
const ItemRender: React.FC<ItemRenderProp> = ({ image, name, status, minute }) => {

  return (
    <TouchableOpacity style={styles.containerUser}>
      <Image style={styles.imageUser} source={image} />
      <View style={styles.containerText}>
        <View style={styles.ConStatus}>
          <Text style={styles.NameUser}>{name}</Text>
          <Text style={styles.Status}>{status}</Text>
        </View>
        <Text style={styles.textTime}>{minute}</Text>
      </View>
    </TouchableOpacity>
  )

}


const NotificationScreen = () => {
  // function ModelshareOnpress() {
  //   navigation.navigate('modalshare')
  // }
  // const [visible, setVisible] = useState(false);
  // const show = () => setVisible(true);
  // const hide = () => setVisible(false);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);


  // renders

  return (<View style={styles.container}>
    <View>
      <FlatList
        data={CATEGORIES}
        renderItem={({ item }) => {
          return (
            <ItemRender image={item.image} name={item.name} status={item.status} minute={item.minute} />
          )
        }}
        keyExtractor={item => item.id.toString()} />
    </View>
    <TouchableOpacity onPress={handlePresentModalPress}>
      <Text >Open Modal</Text>
    </TouchableOpacity>
    <BottomSheetModalProvider>
      <View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={[350, 350]}
          style={styles.bottomSheetModal}>
          <View style={styles.bottomView}>
            <Text style={styles.TextShare}>Share with friends</Text>
            <View style = {styles.btnShareBig}>
            <View style={styles.btnShareContainer}>
              <View style={styles.btnShare}>
                <TouchableOpacity style={styles.iconShare}>
                  <Image style={styles.iconCoppy} source={require('../../../media/icon/coppylink_icon.png')} />
                  <Text style={styles.textFB}>CoppyLink</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnShare}>
                <TouchableOpacity style={styles.iconShare}>
                  <Image style={styles.iconFB} source={require('../../../media/icon/whatsapp_icon.png')} />
                  <Text style={styles.textFB}>WhatsApp</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnShare}>
                <TouchableOpacity style={styles.iconShare}>
                  <Image style={styles.iconFB} source={require('../../../media/icon/messenger_icon.png')} />
                  <Text style={styles.textFB}>Messenger</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnShare}>
                <TouchableOpacity style={styles.iconShare}>
                  <Image style={styles.iconFB} source={require('../../../media/icon/twitter_icon.png')} />
                  <Text style={styles.textFB}>Twitter</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.btnShareContainer}>
              <View style={styles.btnShare}>
                <TouchableOpacity style={styles.iconShare}>
                  <Image style={styles.iconFB} source={require('../../../media/icon/instagram_icon.png')} />
                  <Text style={styles.textFB}>Instagram</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnShare}>
                <TouchableOpacity style={styles.iconShare}>
                  <Image style={styles.iconFB} source={require('../../../media/icon/skype_icon.png')} />
                  <Text style={styles.textFB}>Skype</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnShare}>
                <TouchableOpacity style={styles.iconShare}>
                  <Image style={styles.iconFB} source={require('../../../media/icon/massage_icon.png')} />
                  <Text style={styles.textFB}>Massage</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnShare}>
                <TouchableOpacity style={styles.iconShare}>
                  <Image style={styles.iconFB} source={require('../../../media/icon/facebook_icon.png')} />
                  <Text style={styles.textFB}>Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>
            
           

            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={handleCloseModalPress} style={styles.btnCancel}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  </View>

  )


}



export default NotificationScreen

const styles = StyleSheet.create({
  iconCoppy:{
    width: 50,
    height: 50,
    flexShrink: 0
  },
  btnShareBig:{
    
    marginBottom: 34
  },
  btnShareContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    
    
    
  },
  btnShare: {
    marginTop: 23,
    
    
    
  },
  textFB: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 15

  },
  iconFB: {
    width: 50,
    height: 50,
    flexShrink: 0,

  },
  iconShare: {
    alignItems: 'center',
    marginStart: 15,
    marginRight: 15
    
  },
  btnContainer: {
    alignItems: 'center'
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#484646'
  },
  btnCancel: {
    width: 271,
    height: 58,
    flexShrink: 0,
    backgroundColor: '#EEEEEF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',

  },
  TextShare: {
    fontSize: 24,
    fontWeight: '500',
    color: '#120D26',
    marginStart: 24
  },
  bottomSheetModal: {


  },
  bottomView: {
    
  },
  container: {
    padding: 10,
    width: '100%',
    height: '100%'

  },
  imageUser: {
    width: 60,
    height: 60,
  },
  containerUser: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',



  },
  containerText: {
    flexDirection: 'row',
    width: 268,
    height: 46,
    textAlign: 'center'

  },
  NameUser: {
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
    lineHeight: 18.23,


  },
  Status: {
    fontSize: 14,
    color: '#3C3E56',
    lineHeight: 23,
    width: 200


  },
  textTime: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18.23,
    color: '#3C3E56',
    marginStart: 10

  },
  ConStatus: {
    flexDirection: 'column',
    marginStart: 10,




  }
});