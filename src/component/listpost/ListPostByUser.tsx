import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Dimensions, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import ItemPost from './ItemPost';
import Loading from '../Modal/Loading';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';
import { RootState } from '../store/store';
import BODYMODAL from '../../component/edit-post-modal/Body'
import DELETEPOST from './DeletePostModal'

interface ListPortsByUserProps {
  data: any[];
  onRefresh: boolean;
}

const ListPortsByUser: React.FC<ListPortsByUserProps> = ({ data, onRefresh }) => {

  const user = useSelector((state : RootState)=>state.user.value)
  const loggedInUserId = user?.id;

  const [displayData, setDisplayData] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [isFetching, setIsFetching] = useState(true);
  const [loadAfterUpdate, setLoadAfterUpdate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const PAGE_SIZE = 10;

  useEffect(() => {
    setDisplayData(data.slice(0, PAGE_SIZE));
    setIsFetching(false);
  }, [data, onRefresh, loadAfterUpdate]);

  const loadMoreData = useCallback(() => {
    if (loadingMore || displayData.length >= data.length) return;
    setLoadingMore(true);
    const newPage = currentPage + 1;
    const startIndex = (newPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const newData = data.slice(startIndex, endIndex);

    setTimeout(() => {
      setDisplayData((prevData) => [...prevData, ...newData]);
      setCurrentPage(newPage);
      setLoadingMore(false);
    }, 1000);
  }, [loadingMore, displayData, data, currentPage]);

  const renderFooter = () => {
    return loadingMore ? (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ADB2B2" />
      </View>
    ) : null;
  };

  const handleToProfile = (userId: any, userName: string) => {
    if (userId === loggedInUserId) {
      navigation.navigate(ProfileRootStackEnum.ProfileScreen);
    } else {
      navigation.navigate(ProfileRootStackEnum.FriendProfile, { userId });
    }
  };

  return (
    <View style={{ backgroundColor: 'rgba(155,155,155,0.2)' }}>
      <BODYMODAL
          showModalEdit={showModalEdit}
          setShowModalEdit={setShowModalEdit}
          selectedId={selectedId}
          setLoadAfterUpdate={setLoadAfterUpdate}
          setSelectedId={setSelectedId}
        />
        <DELETEPOST
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          postId={selectedId}
          setLoadAfterUpdate={setLoadAfterUpdate}
          setSelectedId={setSelectedId}
        />
      {isFetching ? (
        <Loading isLoading={true} />
      ) : (
        data.length > 0 ? (
          <FlatList
            data={displayData}
            renderItem={({ item, index }) => {
              return <ItemPost onrefresh={onRefresh} index={index} data={item} 
                  setShowModalEdit={setShowModalEdit} setSelectedId={setSelectedId}
                  showDelete={showDelete} setShowDelete={setShowDelete}/>;
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
              <FastImage
                source={require('../../media/Dicons/gitne.jpg')} 
                style={styles.noImage} 
              />
              <Text style={styles.messageText}>
                {'Không có bài viết nào để hiển thị'}
              </Text>
            </View>
          </>
        )
      )}
    </View>
  );
};

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
    height: Dimensions.get('screen').height / 2,
  },
  messageText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 15
  },
  noImage: {
    width: '49%',
    height: '40%'
  },
});
