import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import MessageText from './MessageText';
import Video, { VideoRef } from 'react-native-video';
import MessageCall from './MessageCall';
import { Message } from './class/MessageProvider';
import ModalImage from '../formComments/ModalImage';

const MessageItemContent = ({ message, sender }: { message: Message, sender: boolean }) => {
    const [isVideoFullScreen, setIsVideoFullScreen] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState(null); // Đường dẫn hình ảnh được chọn
    const [isModalVisible, setIsModalVisible] = useState(false);

    const videoRef = useRef<VideoRef>(null);
    function onBuffer(event) {
        console.log(event);

    }

    function onVideoError(event) {
        console.log(event);

    }
    function onFullscreenPlayerWillDismiss() {
        console.log('dismisss');

        setIsVideoFullScreen(false)

    }

    switch (message.type) {
        case "video":
            return (
                <TouchableOpacity style={[styles.messageImage, { backgroundColor: "" }]} onPress={
                    () => {
                        setSelectedMedia(message.message)
                        setIsModalVisible(true)
                    }
                }>

                    <Video
                        // Can be a URL or a local file.
                        source={{ uri: typeof message.message === 'object' ? message.message.uri : message.message }}
                        // Callback when video cannot be loaded              
                        onError={onVideoError}
                        style={styles.messageImage}
                        paused={!isVideoFullScreen}
                        fullscreen={isVideoFullScreen}
                        onFullscreenPlayerWillDismiss={onFullscreenPlayerWillDismiss}
                        repeat={false}
                        muted={false}
                        resizeMode='cover'
                        controls={true}
                    />
                    <Image style={styles.imagePlay} source={require('../../media/icon/video_play.png')}/>
                    <ModalImage
                        isVisible={isModalVisible}
                        media={selectedMedia}
                        onClose={() => setIsModalVisible(false)} />
                </TouchableOpacity>

            )

        case "image": {

            return (
                <TouchableOpacity style={styles.messageImage} onPress={
                    () => {
                        setSelectedMedia(message.message)
                        setIsModalVisible(true)
                    }
                }>
                    {
                        message.message &&
                        <Image style={{ width: '100%', height: '100%', borderRadius: 20 }} source={{ uri: typeof message.message === 'object' ? message.message.uri : message.message }} />
                    }
                    <ModalImage
                        isVisible={isModalVisible}
                        media={selectedMedia}
                        onClose={() => setIsModalVisible(false)} />
                </TouchableOpacity>
            )
        }

        case "audiocall": {
            return <MessageCall type='audio' sender={sender} />
        }

        case "videocall": {
            return <MessageCall type='video' sender={sender} />
        }
        default:

            return <MessageText text={message.message} sender={sender} />
    }
}

export default MessageItemContent

const styles = StyleSheet.create({
    messageImage: {
        height: 300,
        width: 200,
        justifyContent:'center',
        alignItems:'center',
    },
    imagePlay:{
        position:'absolute',
    }
})