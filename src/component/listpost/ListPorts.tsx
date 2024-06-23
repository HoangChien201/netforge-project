import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import React, { memo,useCallback, useEffect, useState } from 'react';
import ItemPost from './ItemPost';
import { getAll } from '../../http/userHttp/getpost';
import { COLOR } from '../../constant/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Modal/Loading';

const ListPorts = memo(({ onrefresh }:{onrefresh:boolean}) => {
  const [allData, setAllData] = useState<any>([]);
  const [displayData, setDisplayData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
console.log("data");

  const PAGE_SIZE = 10;
 
  const getAllPost = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    setLoading(true);
    try {

      const response:any = await getAll(token);
      console.log("res",response);
      
      if (response) {
        setAllData([...response]);
        setDisplayData([...response.slice(0, PAGE_SIZE)]);
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
  return (
    <View style={{ backgroundColor: 'rgba(155,155,155,0.2)' }}>
      <Loading isLoading={loading}/>
      <FlatList
        data={displayData}
        renderItem={({ item, index }) => {
          return <ItemPost onrefresh={onrefresh} index={index} data={item} />;
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

export default ListPorts;

const styles = StyleSheet.create({
  loading: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
