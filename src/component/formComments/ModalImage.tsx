import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Video from 'react-native-video'

const ModalImage = ({isVisible, media, onClose }) => {
    if (!media || typeof media !== 'string') {
        return null; // Không hiển thị gì nếu media không hợp lệ
    }

    const isVideo = media.endsWith('.mp4');
  return (
    <Modal
    visible={isVisible}
    transparent={true}
    onRequestClose={onClose}
>
    <View style={styles.modalBackground}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image source={require('../../media/icon_tuong/exit.png')}/>
        </TouchableOpacity>
        {isVideo ? (
            <Video
                source={{ uri: media }}
                style={styles.modalVideo}
                resizeMode="contain"
                controls={true}
            />
        ) : (
            <Image
                source={{ uri: media }}
                style={styles.modalImage}
            />
        )}
    </View>
</Modal>
  )
}

export default ModalImage

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalImage: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
    },
    modalVideo: {
        width: '100%',
        height: '90%',
        resizeMode: 'cover',
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 0,
        padding: 10,
    
    },
   
})