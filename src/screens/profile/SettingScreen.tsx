import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';

const SettingScreen = () => {
  const navigation = useNavigation()
  const isFocus = useIsFocused()
  useEffect(() => {

    if (isFocus) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        }
      });
    }
  }, [isFocus]);

  function SettingItem({ title, description, onPress }: { title: string, description: string, onPress?:any}) {
    return (
      <TouchableOpacity style={styles.settingItem} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
    )
  }

  function navigationScreen(screen:string){
    navigation.navigate(`${screen}`)
}

  const handleToChangePass = () => {

  }

  return (
    <View style={styles.container}>

      <SettingItem title='Thêm địa điểm' description='Trong trường hợp chúng ta thiếu thứ gì đó' />
      <SettingItem title='Những địa điểm đã tạo' description='Xem những địa điểm bạn đã tạo' />
      <SettingItem title='Chỉnh sửa thông tin cá nhân' description='Thay đổi tên của bạn, mô tả và ảnh đại diện' />
      <SettingItem title='Cài đặt thông báo' description='Xác định thông báo mà bạn muốn hiện thị' />
      <SettingItem title='Tài khoản' description='Thay đổi hoặc xóa email tài khoản của bạn' />
      <SettingItem title='Mã QR' description='Mã QR của bạn' onPress={navigationScreen.bind(this,'QRcodeScreen')}/> 
      <SettingItem title='Mật khẩu' description='Thay đổi mật khẩu của bạn' onPress={navigationScreen.bind(this,'ChangePassword')}/> 
    

    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 10
  },
  settingItem: {
    marginTop: -1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F4F5F7',
    padding: 16
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500'
  },
  description: {
    fontSize: 16,
    color: '#000',
    fontWeight: '300'
  },
})