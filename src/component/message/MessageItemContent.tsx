import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import MessageText from './MessageText';
import Video, { VideoRef } from 'react-native-video';
import MessageCall from './MessageCall';
import { Message } from './class/MessageProvider';
import ModalImage from '../formComments/ModalImage';

const MessageItemContent = ({ message, sender }: { message: Message, sender: boolean }) => {
    const [isVideoFullScreen, setIsVideoFullScreen] = useState(false)
    // const [selectedMedia, setSelectedMedia] = useState(null); // Đường dẫn hình ảnh được chọn
    // const [isModalVisible, setIsModalVisible] = useState(false);

    const videoRef = useRef<VideoRef>(null);
    function onBuffer(event) {
        console.log(event);

    }

    function onVideoError(event) {
        console.log(event);

    }
    function onFullscreenPlayerWillDismiss() {

        setIsVideoFullScreen(false)

    }

    switch (message.type) {
        case "video":
            return (
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
            )

        case "image": {

            return (
                <Image style={styles.messageImage} source={{ uri: typeof message.message === 'object' ? message.message.uri : message.message }} />
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:20
    },
    imagePlay: {
        position: 'absolute',
    }
})