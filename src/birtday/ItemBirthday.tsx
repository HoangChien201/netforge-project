import { Image, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

const ItemBirthday = ({item}) => {
  const [checkMessaBirthday, setCheckMessaBirthday] = useState(false)
    // Hàm tính toán tuổi
    const calculateAge = (birthDate) => {
      const today = new Date();
      const birthDateObj = new Date(birthDate);
      let age = today.getFullYear() - birthDateObj.getFullYear();
      // const monthDiff = today.getMonth() - birthDateObj.getMonth();
      // if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      //   age;
      // }
      return age + 1;
    };
    const age = calculateAge(item.user.dateOfBirth);
    const handleSendBirthdayMessage = () => {
      setCheckMessaBirthday(true)
      console.log(item.user.fullName + 'heheh');
      

    }
    
  return (
    <View style={styles.itemContainer}>
    <View style={styles.item}>
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      
      <View style={styles.textContainer}>
        <Text style={styles.fullName}>{item.user.fullname}</Text>
        <Text style={styles.content}>Hôm nay tròn {age} tuổi</Text>
        {/* <TouchableOpacity style={styles.BtnSms}>
        <Text style = {{fontSize: 16, fontWeight: '500'}}>Nhắn tin</Text>
      </TouchableOpacity> */}
     
      <View>
        
      </View>
      </View>
      
      <TouchableOpacity style={styles.optionsIcon}>
        <Icon name='message1' size={20} color={'#2F3645'} />
      </TouchableOpacity>
    </View>
    {
      !checkMessaBirthday ? (
        <View style = {styles.SendHappy}>
        <View style = {{padding: 10}}>
          <View style = {{justifyContent: 'center', alignItems:'center', marginBottom: 8}}>
          <Text style = {{fontSize: 18, fontWeight: '700', color:"#000"}}>Gửi lời chúc ️🎉</Text>
          </View>
        <View>
     
       <View style = {styles.SendHappy1}>
       <Pressable style = {styles.BtnHappy} onPress={handleSendBirthdayMessage}>
        <Text style = {styles.SmsHappy}>Chúc mừng sinh nhật ️🎂🎁🎉</Text>
        </Pressable>

        <Pressable style = {styles.BtnHappy} onPress={handleSendBirthdayMessage}>
        <Text style = {styles.SmsHappy}>Tuổi mới con cu thêm nới nới ️🎉</Text>
        </Pressable>

        <Pressable style = {styles.BtnHappy} onPress={handleSendBirthdayMessage}>
        <Text style = {styles.SmsHappy}>Sinh nhật vui vẻ ️🎉</Text>
        </Pressable>
       </View>
        </View>
        </View>
      </View>
      ) : (
        <View style = {[styles.SendHappy, {justifyContent: 'center', alignItems: 'center'}]}>
        <View style = {{padding: 10}}>
          <View style = {{justifyContent: 'center', alignItems:'center', marginBottom: 8}}>
          <Text style = {{fontSize: 18, fontWeight: '700', color:"#000"}}>Gửi lời chúc ️🎉</Text>
          </View>
        <View>
        <View style = {{backgroundColor: '#ECFFE6', borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: 250}}>
        <Text style = {[styles.SmsHappy, {color: 'green'}]}>✔ Bạn đã gửi lời chúc</Text>
        </View>
       
        </View>
        </View>
      </View>
      )
    }
  </View>
  )
}

export default ItemBirthday

const styles = StyleSheet.create({
  SmsHappy: {
    padding: 10,
    fontSize: 15,
    fontWeight: '600'

  },
  BtnHappy: {
    borderWidth: 2,
    marginTop: 8,
    borderRadius: 20,
    borderColor: '#B4B4B8',
    backgroundColor: '#fff',
    width: 'auto'
  
  },
  SendHappy:{
    backgroundColor: '#F6F5F5',
    marginTop: 15,
    width: 300,
    borderRadius: 15
  },
  BtnSms:{
    marginTop: 10,
    width: 200,
    height: 40,
    backgroundColor: '#D6EFD8',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  content:{
    fontSize: 14,
    fontWeight:'500'
  },
  itemContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

    
  
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    borderRadius: 50,
    width: 55,
    height: 55,
  
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F3645',
  },
  youTag: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500'
  },
  optionsIcon: {
    backgroundColor: '#F6F5F5',
    padding: 10,
    marginLeft: 10,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
   
  },
})