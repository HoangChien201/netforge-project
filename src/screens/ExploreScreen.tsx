import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ImageProps, FlatList, ScrollView, WebView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useId, useRef, useMemo } from 'react'
import { COLOR } from '../constant/color'
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetView, } from '@gorhom/bottom-sheet';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { searchUser } from '../http/TuongHttp';
import ModalDeleteRecent from '../component/Explore/ModalDeleteRecent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemRencent from '../component/Explore/ItemRencent';
import ItemSearch from '../component/Explore/ItemSearch';
import { useMyContext } from '../component/navigation/UserContext';

const ExploreScreen = () => {
  const navigation = useNavigation()
  const { user } = useMyContext();
  // modal comments
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [users, setUser] = useState([]);
  const [modalVisible, setModalVisibal] = useState(false);
  const [recentUsers, setRecentUsers] = useState([]);
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    loadRecentUsers();
  }, []);
  const onSearch = async text => {
    try {
      const result: any = await searchUser(text)
      setUser(result);
      setIsSearching(false)

      if (text.trim() === '' && text.length === 0) {
        setUser([]);
        setIsSearching(true)
        return;
      }
      return
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
  const saveRecentUsers = async (users) => {
    try {
      await AsyncStorage.setItem(`recentUsers_${user.id}`, JSON.stringify(users));
    } catch (error) {
      console.error('Lỗi khi lưu danh sách gần đây:', error);
    }
  };
  const handleItemClick = (item) => {
    console.log(item.id);
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
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ right: 10 }}>
          <Image source={require('../media/icon_tuong/backblack.png')} style={styles.IconBack} />
        </TouchableOpacity>
        <View style={styles.SearchContai}>
          <TextInput style={styles.SearchInputn} placeholder='Tìm kiếm trên NetForge' onChangeText={text => {
            setKeyword(text)
            onSearch(text)
          }} value={keyword} onFocus={() => setIsSearching(false)}>
          </TextInput>

        </View>
      </View>
      {users.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {users.map(item => (
            <View key={item.id}>
              <ItemSearch item={item} handleItemClick={handleItemClick} />
            </View>
          ))}
        </ScrollView>
      ) : (
        keyword.trim() !== '' && (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color={COLOR.PrimaryColor} />
          </View>
        )
      )}
      {isSearching && users.length === 0 && (
        <View>
          <View style={styles.RecentContai}>
            <Text style={styles.Recent}>Gần đây</Text>
            <TouchableOpacity onPress={() => setModalVisibal(true)}>
              <Text style={styles.ClearAll}>Xóa tất cả</Text>
            </TouchableOpacity>
          </View>

          {
            recentUsers.length === 0 ? (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
               
                <Image  source={require('../media/icon_tuong/PepeGif.gif')}/>
                <Text style={{ fontSize: 16, fontWeight: '700' }}>Chưa có cc gì?</Text>
              </View>
            ) : (
              recentUsers.map(item => (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View key={item.id}>
                    <ItemRencent item={item} onPressDelete={removeRecentUser} />
                  </View>
                </ScrollView>
              ))
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
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
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