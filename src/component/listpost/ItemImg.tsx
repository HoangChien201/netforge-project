import React, { useState } from 'react';
import { FlatList, View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

interface Medias {
  url: string,
  resource_type: string
}

const images: Medias[] = [
  { url: "https://th.bing.com/th/id/OIP.dNct3PwrSiNPbWW_VynaIgHaFj?w=500&h=375&rs=1&pid=ImgDetMain", resource_type: "image" },
  { url: "https://res.cloudinary.com/dyjxyz2jc/video/upload/v1717001460/demo1/ejpinaoiwxunfk8t5mfk.mp4", resource_type: "video" },
];

const ItemImg = ({ image }: { image: Medias[] }) => {
  const [img, setImg] = useState<Medias[]>([...image]);
  

  return (
    <View style={{ flexDirection: "row", height: 225, justifyContent: 'center', padding: 8 }}>
      {
        img.length === 1 ? (
          <View style={{ flex: 1, height: '100%' }}>
            {
              img[0]?.url.endsWith('.mp4') ? // Kiểm tra nếu phần tử đầu tiên là video
                <Video
                  source={{ uri: img[0]?.url }} // Sử dụng uri của video
                  style={{ flex: 1 }}
                  resizeMode="cover"
                  controls={true}
                />
                :
                <Image source={{ uri: img[0]?.url }} style={{ flex: 1 }} />
            }
          </View>
        ) : (
          <>
            {
              (img.length === 3 || img.length === 2) ? (
                <View style={{ flex: 1, height: 203, backgroundColor: 'red', margin: 4 }}>
                  {
                    img[0]?.url.endsWith('.mp4') ? // Kiểm tra nếu phần tử đầu tiên là video
                      <Video
                        source={{ uri: img[0]?.url }} // Sử dụng uri của video
                        style={{ flex: 1 }}
                        resizeMode="contain"
                        controls={false}
                      />
                      :
                      <Image source={{ uri: img[0]?.url }} style={{ flex: 1 }} />
                  }
                </View>
              ) : (
                <View style={{ flex: 1, height: 210 }}>
                  {
                    img[0]?.url.endsWith('.mp4') ? // Kiểm tra nếu phần tử đầu tiên là video
                      <Video
                        source={{ uri: img[0]?.url }} // Sử dụng uri của video
                        style={{ flex: 1 }}
                        resizeMode="cover"
                        controls={true}
                      />
                      :
                      <Image source={{ uri: img[0]?.url }} style={{ flex: 1 }} />
                  }
                </View>
              )
            }
            {
              img.length < 4 && (
                <View style={{ flex: 1, height: 210 }}>
                  <View style={{ flex: 1, height: 210, margin: 4 }}>
                    {
                      img[1]?.url.endsWith('.mp4') ? // Kiểm tra nếu phần tử đầu tiên là video
                        <Video
                          source={{ uri: img[1]?.url }} // Sử dụng uri của video
                          style={{ flex: 1 }}
                          resizeMode="cover"
                          controls={true}
                        />
                        :
                        <Image source={{ uri: img[1]?.url }} style={{ flex: 1 }} />
                    }
                  </View>
                  {
                    img[2] ? (
                      <View style={{ flex: 1, height: 210, margin: 4 }}>
                        {
                          img[2]?.url.endsWith('.mp4') ? // Kiểm tra nếu phần tử đầu tiên là video
                            <Video
                              source={{ uri: img[2]?.url }} // Sử dụng uri của video
                              style={{ flex: 1 }}
                              resizeMode="cover"
                              controls={true}
                            />
                            :
                            <Image source={{ uri: img[2]?.url }} style={{ flex: 1 }} />
                        }
                      </View>
                    ) : null
                  }
                </View>
              )
            }
            {
              img.length > 3 ?
                <View style={{ flex: 0.5, height: 210,overflow:'hidden' }}>
                  <FlatList
                    data={img.slice(1)}
                    renderItem={({ item, index }) => (
                      <View style={{ width: 119, height: 70 }}>
                        {
                          item.url.endsWith('.mp4') ? // Kiểm tra nếu là video
                            <Video
                              source={{ uri: item.url }} // Sử dụng uri của video
                              style={{ width: '100%', height: '100%' }}
                              resizeMode="cover"
                              controls={true}
                            />
                            :
                            <Image source={{ uri: item.url }} style={{ width: '100%', height: '100%', margin: 1 }} />
                        }
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
                :
                null
            }
            {
              img.length > 4 && (
                <View>
                  <TouchableOpacity style={styles.overlay}>
                    <Text style={styles.overlayText}>+{img.length - 4}</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    height: 70,
    width: 119,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    bottom: 0,
    right: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: 'black',
    fontWeight: 'bold'
  }
});

export default ItemImg;
