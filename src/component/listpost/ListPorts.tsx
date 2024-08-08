import { FlatList, View, StyleSheet, ActivityIndicator, Text, Dimensions, Image } from 'react-native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, ParamListBase, useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import ItemPost from './ItemPost';
import { getAll } from '../../http/userHttp/getpost';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';
import Loading from '../Modal/Loading';
import BODYMODAL from '../../component/edit-post-modal/Body'
import DELETEPOST from './DeletePostModal'
import { RootState } from '../store/store';
import { updateIsLoading } from '../store/loadDataSlice';

const ListPorts = memo(({ onrefresh }: { onrefresh: boolean }) => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoadingg);
  const dispatch = useDispatch();
  
  const user = useSelector((state : RootState)=>state.user.value)
  const loggedInUserId = user?.id;

  const [allData, setAllData] = useState<any>([]);
  const [displayData, setDisplayData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDelete,setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null); 
  const focus = useIsFocused();

  useEffect(()=>{
    if(focus){
      getAllPost();
    }
  },[focus])

  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const PAGE_SIZE = 10;
  const getAllPost = useCallback(async () => {
    const token = await AsyncStorage.getItem('userToken');

   if(allData.length < 0){
    setLoading(true);
   }
   
    try {
      const response: any = await getAll(token, user.id);
      console.log("đã lấy ds tại ListPort");
      if (response.length > 0) {
        const getByTypeOne = response.filter(post => post.type === 1)
        setAllData([...getByTypeOne]);
        setDisplayData([...getByTypeOne.slice(0, PAGE_SIZE)]);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    dispatch(updateIsLoading())
  }, [setAllData, setDisplayData, onrefresh,showDelete,showModalEdit]);

  useEffect(() => {

    getAllPost();
  }, [getAllPost, onrefresh,showDelete,showModalEdit]);
  
  useFocusEffect(
    useCallback(() => {
      getAllPost();
    }, [getAllPost,isLoading])
    )


  const loadMoreData = () => {

    if (loadingMore || displayData.length >= allData.length) return;
    setLoadingMore(true);
    const newPage = currentPage + 1;
    const startIndex = (newPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const newData = allData.slice(startIndex, endIndex);


    setTimeout(() => {
      setDisplayData((prevData: any) => [...prevData, ...newData]);
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


  

  const handleToProfile = (userId: React.SetStateAction<null>) => {
    //console.log("userID: ",userId);
    if (userId === loggedInUserId) {
      navigation.navigate(ProfileRootStackEnum.ProfileScreen);
    } else {
      navigation.navigate(ProfileRootStackEnum.FriendProfile, { userId });
    }
  };
  return (
    <>
    <View style={{ flex:1,backgroundColor: 'rgba(155,155,155,0.2)',zIndex:999999 }}>
      
      <BODYMODAL
        showModalEdit={showModalEdit}
        setShowModalEdit={setShowModalEdit}
        selectedId={selectedId} 
      />
      <DELETEPOST
      showDelete={showDelete}
      setShowDelete={setShowDelete}
      postId={selectedId} 

      /> 
      {

        allData.length > 0 ?
          (<><FlatList
            data={displayData}
            renderItem={({ item, index }) => {
              return <ItemPost onrefresh={onrefresh} index={index} data={item} 
              setShowModalEdit={setShowModalEdit} setSelectedId={setSelectedId} 
              showDelete={showDelete} setShowDelete={setShowDelete} />;
            }}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter} /></>) :
          (
            !loading && (
              <View style={styles.messageContainer}>
               <FastImage
      source={require('../../media/Dicons/gitne.jpg')}
      style={{width: '59%', height: '40%',backgroundColor:'#fff'}}
    />
                <Text style={styles.messageText}>Hiện chưa có bài viết nào</Text>
              </View>
            )
          )

      }


    </View>
    <Loading isLoading={loading} /> 
    </>
  );
});

export default ListPorts;

const styles = StyleSheet.create({
  loading: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
    height: Dimensions.get('screen').height / 1.7,
  },
  messageText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
});
