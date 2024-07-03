import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';
import { getPostByUser } from '../../http/PhuHTTP';
import Loading from '../Modal/Loading';

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

const MediaOfUser: React.FC<MediaOfUserProps> = ({ userId, onRefresh }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const getPostUser = useCallback(async () => {
    try {
      setLoading(true);
      const response: any = await getPostByUser(userId);

      if (response && Array.isArray(response)) {
        const filteredPosts = response.filter((post: Post) => post.media && post.media.length > 0);
        const sortedPosts = filteredPosts.sort((a: Post, b: Post) => new Date(b.create_at).getTime() - new Date(a.create_at).getTime());

        setPosts([...sortedPosts]);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    getPostUser();
  }, [getPostUser, onRefresh]);

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
          {/* {item.media.length > 4 && (
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>+{item.media.length - 4}</Text>
            </View>
          )} */}
        </View>
      );
    } else {
      return null;
    }
  };

  if (loading) {
    return <Loading isLoading={true} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          //ListEmptyComponent={<Text style={styles.noPhotos}>No posts found</Text>}
        />
      ) : (
        <Text style={styles.noPhotos}>Không có ảnh nào để hiển thị</Text>
      )}
    </SafeAreaView>
  );
};

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
  noPhotos: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
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