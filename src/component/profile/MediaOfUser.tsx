import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';
import Loading from '../Modal/Loading';

interface MediaItem {
  resource_type: string;
  url: string;
}

interface Post {
  id: number;
  create_at: string;
  media: MediaItem[];
}

interface MediaOfUserProps {
  data: Post[];
  onRefresh: boolean;
}

const { width, height } = Dimensions.get('window');

const renderPagination = (index: any, total: any) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={styles.paginationText}>{index + 1}/{total}</Text>
    </View>
  );
}

const MediaOfUser: React.FC<MediaOfUserProps> = React.memo(({ data, onRefresh }) => {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(false);
  }, [data, onRefresh]);

  const renderMediaItem = (mediaItem: MediaItem) => {
    if (mediaItem.resource_type === 'image') {
      return <Image source={{ uri: mediaItem.url }} style={styles.image} resizeMode="cover" />;
    } else if (mediaItem.resource_type === 'video') {
      return <Video source={{ uri: mediaItem.url }} style={styles.image} resizeMode="cover" controls={true} paused= {true}/>;
    } else {
      return null;
    }
  };

  const renderItem = ({ item }: { item: Post }) => {
    if (item.media && item.media.length > 0) {
      return (
        <View style={styles.imageContainer}>
          <Swiper renderPagination={renderPagination} loop={false}>
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
        data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View style={styles.noPhotosContainer}>
            <Image source={require('../../media/icon/no_image.png')} style={styles.noImage} />
            <Text style={styles.noPhotos}>
              {'Không có hình ảnh nào để hiển thị'}
            </Text>
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
  noPhotosContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  noImage: {
    width: 80,
    height: 80
  },
  noPhotos: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700'
  },
});
