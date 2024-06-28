import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import React, { memo,useCallback, useEffect, useState } from 'react';
import ItemPost from './ItemPost';
import { getAll } from '../../http/userHttp/getpost';

import { useMyContext } from '../navigation/UserContext';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';
import { COLOR } from '../../constant/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Modal/Loading';

const ListPorts = memo(({ onrefresh }:{onrefresh:boolean}) => {
  const [allData, setAllData] = useState<any>([]);
  const [displayData, setDisplayData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [selectedUserId, setSelectedUserId] = useState(null);
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const PAGE_SIZE = 10;
 
  const getAllPost = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    setLoading(true);
    try {

      const response:any = await getAll(token);
      //console.log("res",response);
      
      if (response) {
        setAllData([...response]);
        setDisplayData([...response.slice(0, PAGE_SIZE)]);
        //setSelectedUserId(response.id);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [setAllData, setDisplayData]);

  useEffect(() => {
    getAllPost();
  }, [getAllPost, onrefresh]);

  const loadMoreData = () => {
    if (loadingMore || displayData.length >= allData.length) return;
    setLoadingMore(true);
    const newPage = currentPage + 1;
    const startIndex = (newPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const newData = allData.slice(startIndex, endIndex);
    
    setTimeout(() => {
      setDisplayData(prevData => [...prevData, ...newData]);
      setCurrentPage(newPage);
      setLoadingMore(false);
    }, 1000); 
  };

  const renderFooter = () => {
    return loadingMore ? (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ADB2B2" />
      </View>
    ) : null;
  };
  
//   const closeModal = () => {
//     setIsModalVisible(false);
//     setSelectedUserId(null); 
// };
  const { user } = useMyContext();
  const loggedInUserId = user.id;

const handleToProfile = (userId: React.SetStateAction<null>) => {
  //setSelectedUserId(userId);
  console.log("userID: ",userId);
  if (userId === loggedInUserId) {
      //setIsModalVisible(false);
      navigation.navigate(ProfileRootStackEnum.ProfileScreen);
  } else {
      //setIsModalVisible(true);
      navigation.navigate(ProfileRootStackEnum.FriendProfile, { userId});
  } 
};
  return (
    <View style={{ backgroundColor: 'rgba(155,155,155,0.2)' }}>
      <Loading isLoading={loading}/>
      <FlatList
        data={displayData}
        renderItem={({ item, index }) => {
          return <ItemPost onrefresh={onrefresh} index={index} data={item} onPressProfile={handleToProfile}/>;
        }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
      {/* {isModalVisible && ( */}
        
      {/* )} */}
    </View>
  );
});

export default ListPorts;

const styles = StyleSheet.create({
  loading: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
