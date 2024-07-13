import { FlatList, View, StyleSheet, ActivityIndicator, Text, Dimensions } from 'react-native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import ItemPost from './ItemPost';
import { getAll } from '../../http/userHttp/getpost';
import { useMyContext } from '../navigation/UserContext';
import { NavigationProp, ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Modal/Loading';
import { date } from 'yup';
import BODYMODAL from '../../component/edit-post-modal/Body'
import DELETEPOST from './DeletePostModal'
const ListPorts = memo(({ onrefresh }: { onrefresh: boolean }) => {
  const [allData, setAllData] = useState<any>([]);
  const [displayData, setDisplayData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDelete,setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null); 

  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const PAGE_SIZE = 10;
  const getAllPost = useCallback(async () => {
    const token = await AsyncStorage.getItem('userToken');

   if(allData.length < 0){
    setLoading(true);
   }
   
    try {
      const response: any = await getAll(token, user.id);

      if (response.length > 0) {
        const getByTypeOne = response.filter(post => post.type === 1)

        setAllData([...getByTypeOne]);
        setDisplayData([...getByTypeOne.slice(0, PAGE_SIZE)]);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [setAllData, setDisplayData, onrefresh]);

  useEffect(() => {

    getAllPost();
  }, [getAllPost, onrefresh]);
  
  // useFocusEffect(
  //   useCallback(() => {
  //     getAllPost();
  //   }, [getAllPost])
  //   }, [])


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


  const { user } = useMyContext();
  const loggedInUserId = user.id;

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
