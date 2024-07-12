import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';
import Loading from '../Modal/Loading';
import { UseFetchPostByUser } from '../listpost/UseFetchPostByUser';

interface MediaOfUserProps {
  userId: any;
  onRefresh: boolean;
}

interface MediaItem {
  resource_type: string;
  url: string;
}

interface Post {
  id: number;
  create_at: string;
  media: MediaItem[];
}
const { width, height } = Dimensions.get('window');

const renderPagination = (index: any, total: any) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={styles.paginationText}>{index + 1}/{total}</Text>
    </View>
  );
}

const MediaOfUser: React.FC<MediaOfUserProps> =  React.memo(({ userId, onRefresh }) => {
  const { medias, fetchPosts, loading } = UseFetchPostByUser();
  const [isFetching, setIsFetching] = useState(true); // Thêm biến trạng thái để kiểm soát hiển thị

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      await fetchPosts(userId);
      setIsFetching(false);
    };
    fetchData();
  }, [fetchPosts, userId, onRefresh]);

  // const logCount = useRef(0);  // Biến đếm số lần log
  // useEffect(() => {
  //   logCount.current += 1;
  //   console.log(`MediaOfUser lần thứ ${logCount.current}: `, medias);
  // }, [medias]);

  const renderMediaItem = (mediaItem: MediaItem) => {
    if (mediaItem.resource_type === 'image') {
      return <Image source={{ uri: mediaItem.url }} style={styles.image} resizeMode="cover" />;
    } else if (mediaItem.resource_type === 'video') {
      return <Video source={{ uri: mediaItem.url }} style={styles.image} resizeMode="cover" controls={true} />;
    } else {
      return null;
    }
  };

  const renderItem = ({ item }: { item: Post }) => {
    if (item.media && item.media.length > 0) {
      return (
        <View style={styles.imageContainer}>
          <Swiper  renderPagination={renderPagination} loop={false}>
            {item.media.map((mediaItem, index) => (
              <View key={`${item.id}_${index}`} style={styles.imageContainer}>
                {renderMediaItem(mediaItem)}
                <Text style={styles.postTime}>{new Date(item.create_at).toLocaleString()}</Text>
              </View>
            ))}
          </Swiper>
        </View>
      );
    } else {
      return null;
    }
  };


  return (
    <SafeAreaView style={styles.container}>
    {isFetching ? (
        <Loading isLoading={true} />
      ) : (
      medias.length > 0 ? (
        <FlatList
          data={medias}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.noPhotosContainer}>
          <Image source={require('../../media/icon/no_image.png')} style={styles.noImage} />
          <Text style={styles.noPhotos}>Hãy lưu lại những khoảnh khắc đẹp nào!</Text>
        </View>
      )
    )}
  </SafeAreaView>
  );
});

export default MediaOfUser;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
  },
  imageContainer: {
    height: height * 0.4,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden', 
    marginBottom: 20,
    //marginTop:20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  paginationStyle: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  paginationText: {
    color: '#fff',
    fontSize: 16,
  },
  postTime: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14,
  },
  noPhotosContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  noImage: {
    width:80,
    height:80
  },
  noPhotos: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
    fontWeight:'700'
  },
  overlay: {
    height: 70,
    width: 119,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  }
});