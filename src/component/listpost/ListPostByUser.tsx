import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import React, { memo,useCallback, useEffect, useState } from 'react';
import ItemPost from './ItemPost';
import { getPostByUser } from '../../http/PhuHTTP';
import Loading from '../Modal/Loading';
import { useMyContext } from '../navigation/UserContext';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';

interface ListPortsByUserProps{
  userId: any,
  onRefresh: boolean
}

const ListPortsByUser:React.FC<ListPortsByUserProps> = memo(({ userId, onRefresh }) => {
  const [allData, setAllData] = useState<any>([]);
  const [displayData, setDisplayData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
console.log("ListPortsByUser");


  const PAGE_SIZE = 10;

  const getPostUser = useCallback(async () => {
    try {
        setLoading(true);
      const response:any = await getPostByUser(userId);
      if (response) {
        setAllData([...response]);
        setDisplayData([...response.slice(0, PAGE_SIZE)]);
        setLoading(false);
        // response.forEach((post: any, index: number) => {
        //   if (post.media && Array.isArray(post.media)) {
        //     console.log(`Media nè: ${index}:`, post.media);
        //   } else {
        //     console.log(`No media found for post ${index}`);
        //   }
        // });
      }
    } catch (error) {
      console.error(error);
    }
   
  }, [setAllData, setDisplayData]);

  useEffect(() => {
    getPostUser();
  }, [getPostUser, onRefresh]);

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
        <Loading isLoading={loading} />
      <FlatList
        data={displayData}
        renderItem={({ item, index }) => {
          return <ItemPost onrefresh={onRefresh} index={index} data={item} userId={userId} onPressProfile={handleToProfile}/>;
        }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
});

export default ListPortsByUser;

const styles = StyleSheet.create({
  loading: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
