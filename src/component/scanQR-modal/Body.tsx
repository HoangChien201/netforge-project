import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import ICON from 'react-native-vector-icons/AntDesign';
import USER from './User';
import Loading from '../Modal/Loading'
type SCAN = {
  show: boolean,
  setShow: (value: boolean) => void,
  user: any,
  setData: any,
}
const Body: React.FC<SCAN> = ({ show, setShow, user,setData }) => {
  const [load, setLoad] = useState(false);
  const handleModalClose = () => {
    setShow(false);
    setData('');
  };
  setTimeout(() => {
    setLoad(true)
  }, 1000);
  return (
    <Modal visible={show}
      animationType="slide"
      onRequestClose={handleModalClose}
      transparent={true}
    >
      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleModalClose} style={styles.closeButton}>
            <ICON name='close' size={24} color={'black'} />
          </TouchableOpacity>
          {user.avatar?
            <USER user={user}></USER>
            :
            <Loading isLoading={load} />
          }


        </View>
      </View>
    </Modal>
  )
}

export default Body

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '70%',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20
  },
  closeButton: {
    position: 'absolute',
    end: 10,
    top: 5
  },
  closeButtonText: {

  }

})