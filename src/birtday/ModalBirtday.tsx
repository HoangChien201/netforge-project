import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Feather'
import { COLOR } from '../constant/color'

const ModalBirtday = ({ IsVisible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={IsVisible}
      >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', }}>
     
        <FastImage style={{ width: 180, height: 180 }} source={require('../media/icon_tuong/fireworks.gif')} />
        <FastImage style={{ width: 120, height: 120 }} source={require('../media/icon_tuong/happybirthday.gif')} />
        <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <Text style = {{fontSize: 18, fontWeight: '500', color: '#fff', marginBottom: 3}}>Hôm nay là sinh nhật của bạn</Text>
        <Text style = {{fontSize: 15, fontWeight: '500', color: '#fff'}}>Hãy để lại những khoảnh khắc tuyệt vời.</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={{top: 70}}>
          <Icon name='x-circle' size={28} color={COLOR.PrimaryColor} />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default ModalBirtday

const styles = StyleSheet.create({})