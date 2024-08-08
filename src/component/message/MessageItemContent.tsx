import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import { messageType } from './MessageItem';
import MessageText from './MessageText';
import Video, { VideoRef } from 'react-native-video';
import { EmojiReaction } from '../../constant/emoji';
import MessageCall from './MessageCall';
import { Message } from './class/MessageProvider';

const MessageItemContent = ({ message, sender }: { message: Message, sender: boolean }) => {
    const videoRef = useRef<VideoRef>(null);
    function onBuffer(event) {
        console.log(event);

    }

    function onVideoError(event) {
        console.log(event);

    }

    switch (message.type) {
        case "video":
            return (
                <Video
                    // Can be a URL or a local file.
                    source={{ uri: typeof message.message === 'object' ? message.message.uri : message.message }}
                    // Store reference  
                    ref={videoRef}
                    // Callback when remote video is buffering                                      
                    onBuffer={onBuffer}
                    // Callback when video cannot be loaded              
                    onError={onVideoError}
                    style={styles.messageImage}
                    pointerEvents='none'
                />
            )

        case "image": {

            return (
                <View style={styles.messageImage}>
                    {
                        message.message &&
                        <Image style={{ width: '100%', height: '100%', borderRadius: 20 }} source={{ uri: typeof message.message === 'object' ? message.message.uri : message.message }} />
                    }
                </View>
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
    },
})