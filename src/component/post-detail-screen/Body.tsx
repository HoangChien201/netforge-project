import { Image, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
const renderContent = () => (
  <View style={styles.bottomSheetContent}>
    <Text>Like, Comment, Share</Text>
    {/* Thêm nội dung phần like, comment, share ở đây */}
  </View>
);
type Bob = {

}
const Body: React.FC<Bob> = () => {
  const sheetRef = useRef(null);
  return (
    <View>
      <View></View>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.postDetailContainer}>
          <Image
            style={styles.image}
            source={{ uri: 'https://via.placeholder.com/150' }} // Thay thế bằng URL ảnh thật
          />
          <Text style={styles.text}>Post Detail Content</Text>
        </View>
        <BottomSheet
          ref={sheetRef}
          snapPoints={[450, 300, 100]} // Thay đổi snapPoints theo nhu cầu
          borderRadius={10}
          renderContent={renderContent}
        />
      </GestureHandlerRootView>

    </View>
  )
}

export default Body

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postDetailContainer: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 16,
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    height: 450, // Chiều cao của bottom sheet khi mở
  },

})