import { FlatList, View, StyleSheet, ActivityIndicator, Dimensions, Text, Image } from 'react-native';
import React, { memo,useCallback, useEffect, useRef, useState } from 'react';
import ItemPost from './ItemPost';
import Loading from '../Modal/Loading';
import { useMyContext } from '../navigation/UserContext';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';
import { UseFetchPostByUser } from './UseFetchPostByUser';

interface ListPortsByUserProps{
  userId: any,
  onRefresh: boolean
}

const ListPortsByUser:React.FC<ListPortsByUserProps> = React.memo(({ userId, onRefresh }) => {
  const { post, fetchPosts, loading } = UseFetchPostByUser();
  const [displayData, setDisplayData] = useState<any>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [isFetching, setIsFetching] = useState(true); // Thêm biến trạng thái để kiểm soát hiển thị



  const PAGE_SIZE = 10;
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      await fetchPosts(userId);
      setIsFetching(false);
    };
    fetchData();
  }, [fetchPosts, userId, onRefresh]);

  // useEffect(() => {
  //   fetchPosts(userId);
  // }, [fetchPosts, userId, onRefresh]);

  useEffect(() => {
    setDisplayData(post.slice(0, PAGE_SIZE));
  }, [post]);

  // const logCount = useRef(0);  // Biến đếm số lần log
  // useEffect(() => {
  //   logCount.current += 1;
  //   console.log(`ListPortsByUser lần thứ ${logCount.current}: `, post);
  // }, [post]);
  // const getPostUser = useCallback(async () => {
  //   try {
  //       setLoading(true);
  //     const response:any = await getPostByUser(userId);
  //     if (response) {
  //       setAllData([...response]);
  //       setDisplayData([...response.slice(0, PAGE_SIZE)]);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
   
  // }, [setAllData, setDisplayData]);

  // useEffect(() => {
  //   getPostUser();
  // }, [getPostUser, onRefresh]);

  const loadMoreData = () => {
    if (loadingMore || displayData.length >= post.length) return;
    setLoadingMore(true);
    const newPage = currentPage + 1;
    const startIndex = (newPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const newData = post.slice(startIndex, endIndex);
    
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
    if (userId === loggedInUserId) {
        navigation.navigate(ProfileRootStackEnum.ProfileScreen);
    } else {
        navigation.navigate(ProfileRootStackEnum.FriendProfile, { userId});
    } 
  };
  return (
    <View style={{ backgroundColor: 'rgba(155,155,155,0.2)' }}>
      {isFetching ? (
        <Loading isLoading={true} />
      ) : (
        post.length > 0 ? (
          <FlatList
            data={displayData}
            renderItem={({ item, index }) => {
              return <ItemPost onrefresh={onRefresh} index={index} data={item} userId={userId} onPressProfile={handleToProfile} />;
            }}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <>
            <View style={{ borderWidth: 0.7, borderColor: '#ddd', marginHorizontal: 18,}}></View>
            <View style={styles.messageContainer}>
              <Image source={require('../../media/quyet_icon/netforge1.jpg')} style={styles.noImage} />
              <Text style={styles.messageText}>Tạo và chia sẻ những câu chuyện đặc biệt của bạn!</Text>
            </View>
          </>
        )
      )}
    </View>
  );
});

export default ListPortsByUser;

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
    height: Dimensions.get('screen').height / 2.5,
    paddingHorizontal: 30
},
  messageText: {
      fontSize: 20,
      color: '#000',
      fontWeight: 'bold',
      marginTop:15
  },
  noImage: {
    width:80,
    height:80
  },
});
