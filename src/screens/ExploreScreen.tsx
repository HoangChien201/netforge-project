import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useId, useRef, useMemo } from 'react'
import { COLOR } from '../constant/color'
import { useNavigation } from '@react-navigation/native'
import { searchUser } from '../http/TuongHttp';
import ModalDeleteRecent from '../component/Explore/ModalDeleteRecent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemRencent from '../component/Explore/ItemRencent';
import ItemSearch from '../component/Explore/ItemSearch';
import { useMyContext } from '../component/navigation/UserContext';
import { ProfileRootStackEnum } from '../component/stack/ProfileRootStackParams';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Entypo'

const ExploreScreen = () => {
  const navigation = useNavigation()
  const { user } = useMyContext();
  const timerRef = useRef(null);
  // modal comments
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [users, setUser] = useState([]);
  const [modalVisible, setModalVisibal] = useState(false);
  const [recentUsers, setRecentUsers] = useState([]);
  const [noResult, setNoResult] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    loadRecentUsers();
  }, []);
  const onSearch = async text => {
    if (text.trim() === '') {
      console.log('uk');
      clearTimeout(timerRef.current)
      setKeyword(text)
      setUser([]);
      setIsSearching(true)
      setNoResult(false)
      setIsLoading(false)
      return
    }
    setKeyword(text);
    setNoResult(false);
    setIsLoading(true);

    try {
      const result: any = await searchUser(text)
      setUser(result);
      setIsSearching(false)

      if (result.length === 0 ) {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setIsLoading(false)
          setNoResult(true);
          console.log('hehe2');
          
          
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }

  }
  const loadRecentUsers = async () => {
    try {
      const recentUsersJSON = await AsyncStorage.getItem(`recentUsers_${user.id}`);
      if (recentUsersJSON) {
        setRecentUsers(JSON.parse(recentUsersJSON));
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách gần đây:', error);
    }
  };
  const saveRecentUsers = async (users: any) => {
    try {
      await AsyncStorage.setItem(`recentUsers_${user.id}`, JSON.stringify(users));
    } catch (error) {
      console.error('Lỗi khi lưu danh sách gần đây:', error);
    }
  };
  const handleItemClick = (item: any) => {
    console.log(item.id);
    setKeyword('')
    setUser([])
    setIsSearching(true)
    const userId = item.id
    if (userId === user.id) {
      //setIsModalVisible(false);
      navigation.navigate(ProfileRootStackEnum.ProfileScreen);
    } else {
      //setIsModalVisible(true);
      navigation.navigate(ProfileRootStackEnum.FriendProfile, { userId });
    }
    setRecentUsers((prevRecentUsers) => {
      const isItemExists = prevRecentUsers.some((recentItem) => recentItem.id === item.id);
      const updatedRecentUsers = isItemExists ? prevRecentUsers : [item, ...prevRecentUsers];
      saveRecentUsers(updatedRecentUsers);

      return updatedRecentUsers;
    });
  };
  const handleDleteAll = async () => {
    setRecentUsers([]);
    try {
      await AsyncStorage.removeItem(`recentUsers_${user.id}`);
    } catch (error) {
      console.error('Lỗi khi xóa tất cả danh sách gần đây:', error);
    }
  };
  const removeRecentUser = async (userId) => {
    try {
      const updatedRecentUsers = recentUsers.filter(item => item.id !== userId);
      setRecentUsers(updatedRecentUsers);
      saveRecentUsers(updatedRecentUsers); // Lưu vào AsyncStorage sau khi xóa
    } catch (error) {
      console.log('Lỗi khi xóa user:', error);
    }
  };

  // xóa keywork
  const handleDeleteKeywork = () => {
    setKeyword('')
    setIsSearching(true)
    setNoResult(false)
    clearTimeout(timerRef.current);
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ right: 10 }}>
          <Image source={require('../media/icon_tuong/backblack.png')} style={styles.IconBack} />
        </TouchableOpacity>
        <View style={styles.SearchContai}>
          <TextInput style={styles.SearchInputn} placeholder='Tìm kiếm trên NetForge' 
          onChangeText={(text) => 
            onSearch(text)
          } value={keyword} onFocus={() => setIsSearching(false)}>
          </TextInput>
          {
            keyword && (
              <TouchableOpacity style = {{right: 8}} onPress={handleDeleteKeywork}>
          <Icon name='circle-with-cross' size={20} color={'#686D76'}/>
          </TouchableOpacity>
            )
          }
        </View>
      </View>
      {users.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {users.map(item => (
            <View key={item.id}>
              <ItemSearch item={item} handleItemClick={handleItemClick} users = {users} />
            </View>
          ))}
        </ScrollView>
      ):(
        keyword && isLoading && (
        
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color={COLOR.PrimaryColor}/>
          </View>

          
        )
      )}

     
      {noResult && users.length === 0 && (
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 70}}>
          <Text style={{fontSize: 17, fontWeight: '700'}}>Tìm kiếm không có kết quả!</Text>
        </View>
      )
      }
      {isSearching && users.length === 0 && (
        <View>
          <View style={styles.RecentContai}>
            <Text style={styles.Recent}>Gần đây</Text>
            {
              recentUsers.length > 0 ? (
                <TouchableOpacity onPress={() => setModalVisibal(true)}>
                  <Text style={styles.ClearAll}>Xóa tất cả</Text>
                </TouchableOpacity>
              ) : (
                <Text style={{ fontSize: 16 }}>Xóa tất cả</Text>
              )
            }

          </View>

          {
            recentUsers.length === 0 ? (
              <View style={{ justifyContent: 'center', alignItems: 'center', height: 450 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <FastImage style={{ width: 120, height: 120 }} source={require('../media/icon_tuong/chim.gif')} />
                  <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 20 }}>Tìm kiếm gần đây trống!</Text>
                </View>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {
                  recentUsers.map(item => (

                    <View key={item.id}>
                      <ItemRencent item={item} onPressDelete={removeRecentUser} />
                    </View>

                  ))
                }
              </ScrollView>
            )
          }


        </View>
      )}
      <ModalDeleteRecent
        handleDleteAll={handleDleteAll}
        isVisible={modalVisible}
        onCancel={() => setModalVisibal(false)} />
    </View>


  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  IconBack: {
    width: 25,
    height: 25
  },
  spinnerContainer: {
   marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  
  },

  container: {
    width: '100%',
    padding: 20,

  },
  SearchContai: {
    right: 5,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
    width: 330,
    height: 38,
    backgroundColor: '#E3E1E6',
    borderRadius: 15,
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