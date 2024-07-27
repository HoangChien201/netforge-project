import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Animated, Keyboard, Easing, KeyboardAvoidingView, TextInput } from 'react-native';
import Video from 'react-native-video';
import USER from './User';
import TEXTAREA from './TextArea';
import OPTIONS, { fileType } from './Options';
import { COLOR } from '../../constant/color';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';

type Bpob = {
    content: any,
    setContent: (value: any) => void,
    media: any,
    setMedia: (value: any) => void,
    permission: any,
    setPermission: (value: any) => void,
    setStatus: any,
    setShowPopup: (value: any) => void,
    friends: any,
    setFriends: (value: any) => void,
    setShowAI: (value: any) => void,
    imageUrl: any,
    hiddenView: any,
    setEmotions: (value: any) => void,
    emotions: any
}
const Body: React.FC<Bpob> = ({ hiddenView, content, setContent, media, setMedia, permission, setPermission, setStatus, setShowPopup, friends, setFriends, setShowAI, imageUrl, emotions, setEmotions }) => {
    //const [media, setMedia] = useState([]);

    const [playingVideo, setPlayingVideo] = useState(null);
    const [viewMore, setViewMore] = useState(false);
    const [uries, setUries] = useState<any>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swiperKey, setSwiperKey] = useState(0);
    const [mediaLength, setMediaLength] = useState(0);
    //const [image, setImage] = useState('https://oaidalleapiprodscus.blob.core.windows.net/private/org-xPqRqNjg7rhJctL5M8HgZuVW/user-7aLXFzohKCutW9RLwKG25OxW/img-RFhiItBxeWWhJB6zSWW1fTyj.png?st=2024-07-12T10%3A13%3A46Z&se=2024-07-12T12%3A13%3A46Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-11T23%3A21%3A08Z&ske=2024-07-12T23%3A21%3A08Z&sks=b&skv=2023-11-03&sig=B9SF8LnWfmVdzVpLZWRMcxdoSdMcL0xIDszFD6hkK7c%3D')
    const handleEmojiSelect = (emoji: any) => {
        setContent(content + emoji);
    };
    useFocusEffect(
        useCallback(() => {
            pushAImage()
            return () => {
                // Cleanup nếu cần khi màn hình mất focus
                console.log('Screen unfocused');
            };
        }, [])
    );
    useEffect(() => {
        console.log('emo', emotions);
    }, [emotions])
    useEffect(()=>{
        if(viewMore){
            setCurrentIndex(0)
        }
    },[viewMore])

    useEffect(() => {
        //console.log('media:', JSON.stringify(media, null, 2));
        // const uris = media.map((file: fileType) => file.uri)
        // setUries(uris);
        // if (image) {
        //     media.push({
        //         uri: image,
        //         resource_type: 'image/jpg'
        //     });
        //     console.log('Added imageUrl to media paths:', media);
        // }
        console.log('total:', media);
        pushAImage();
        setMediaLength(media.length);
    }, [imageUrl || media]);
    const pushAImage = () => {
        if (imageUrl) {
            media.push({
                uri: imageUrl,
                resource_type: 'image/jpg'
            });
            console.log('Added imageUrl to media paths:', media);
        }
        renderMedia;
    }
    const handleMediaSelect = (newImages) => {
        setMedia((prevMedia) => [...prevMedia, ...newImages]);
        console.log('Updated media:', media);
    }
    const deleteImage = (uri: any) => {
        const updatedImages = media.filter((media: { uri: any; }) => media.uri !== uri);
        setMedia(updatedImages);
        console.log(updatedImages);
        console.log(media);
        setSwiperKey((prevKey) => prevKey + 1);

    };
    const togglePlayVideo = (uri: any) => {
        setPlayingVideo(playingVideo === uri ? null : uri);
    };
    // View danh sách media
    const renderMedia = (item: any) => {
        if (!item || item.length === 0) {
            return null;
        }
        if (hiddenView == true) {
            return (
                <View style={{ width: '100%', justifyContent: 'center', marginStart: 20 }}>
                    <Text style={{ color: COLOR.PrimaryColor, fontSize: 16, fontWeight: "400" }}>Đã ẩn hình ảnh</Text>
                </View>
            )
        }
        const numMedia = item.length;
        if (numMedia === 1) {
            return (
                <View style={styles.oneMediaContainer}>
                    {item.map((uri: { uri: string | null | any; }, index: { toString: () => React.Key | any | undefined; }) => (
                        uri.uri.endsWith('.mp4') ? (
                            <View key={index.toString()} style={styles.mediaContainer}>
                                <Video
                                    source={{ uri: uri.uri }}
                                    style={styles.oneMedia}
                                    resizeMode="cover"
                                    paused={playingVideo !== uri.uri}
                                    repeat={true}
                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(uri.uri)}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === uri.uri ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => deleteImage(uri.uri)}>
                                    <Icon name='x' size={28} color={COLOR.primary500} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.oneMedia} key={index.toString()}>
                                <Image key={index.toString()} source={{ uri: uri.uri }} style={styles.oneMedia} resizeMode="cover" />
                                <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => deleteImage(uri.uri)}>
                                    <Icon name='x' size={28} color={COLOR.primary500} />
                                </TouchableOpacity>
                            </View>

                        )
                    ))}
                </View>
            );
        } else if (numMedia === 2) {
            return (
                <View style={styles.twoMediaContainer}>
                    {item.map((uri, index) => (
                        uri.uri.endsWith('.mp4') ? (
                            <View key={index.toString()} style={styles.mediaContainer}>
                                <Video
                                    source={{ uri: uri.uri }}
                                    style={styles.twoMedia}
                                    resizeMode="cover"
                                    paused={playingVideo !== uri.uri}
                                    repeat={true}
                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(uri.uri)}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === uri.uri ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => deleteImage(uri.uri)}>
                                    <Icon name='x' size={28} color={COLOR.primary500} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.mediaContainer} key={index.toString()}>
                                <Image key={index.toString()} source={{ uri: uri.uri }} style={styles.oneMedia} resizeMode="cover" />
                                <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => deleteImage(uri.uri)}>
                                    <Icon name='x' size={28} color={COLOR.primary500} />
                                </TouchableOpacity>
                            </View>
                        )
                    ))}
                </View>
            );
        } else if (numMedia === 3) {
            return (
                <TouchableOpacity style={styles.threeMediaContainer} onPress={() => setViewMore(true)}>
                    <View style={styles.media1ContainerOf3} >
                        {item[0].uri.endsWith('.mp4') ? (
                            <View style={styles.media1of3} >
                                <Video
                                    source={{ uri: item[0].uri }}
                                    style={styles.mediaFill}
                                    resizeMode="cover"
                                    paused={playingVideo !== item[0].uri}
                                    repeat={true}
                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(item[0].uri)}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === item[0].uri ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Image source={{ uri: item[0].uri }} style={styles.mediaFill} resizeMode="cover" />
                        )}
                    </View>
                    <View style={styles.threeMedia23Container}>
                        <View style={styles.media23Container}>
                            {item[1].uri.endsWith('.mp4') ? (
                                <View style={styles.media1of3}>
                                    <Video
                                        source={{ uri: item[1].uri }}
                                        style={styles.mediaFill}
                                        resizeMode="cover"
                                        paused={playingVideo !== item[1].uri}
                                        repeat={true}
                                    />
                                    <TouchableOpacity
                                        style={styles.playButton}
                                        onPress={() => togglePlayVideo(item[1].uri)}
                                    >
                                        <Text style={styles.playButtonText}>
                                            {playingVideo === item[1].uri ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Image source={{ uri: item[1].uri }} style={styles.mediaFill} resizeMode="cover" />
                            )}
                        </View>
                        <View style={styles.media23Container}>
                            {item[2].uri.endsWith('.mp4') ? (
                                <View style={styles.media1of3}>
                                    <Video
                                        source={{ uri: item[2].uri }}
                                        style={styles.mediaFill}
                                        resizeMode="cover"
                                        repeat={true}
                                        paused={playingVideo !== item[2].uri}

                                    />
                                    <TouchableOpacity
                                        style={styles.playButton}
                                        onPress={() => togglePlayVideo(item[2].uri)}
                                    >
                                        <Text style={styles.playButtonText}>
                                            {playingVideo === item[2].uri ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Image source={{ uri: item[2].uri }} style={styles.mediaFill} resizeMode="cover" />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <View style={styles.multipleMediaContainer}>
                    <View style={styles.media1ContainerOf3}>
                        {item[0].uri.endsWith('.mp4') ? (
                            <View style={styles.media1of3}>
                                <Video
                                    source={{ uri: item[0] }}
                                    style={styles.mediaFill}
                                    resizeMode="cover"
                                    paused={playingVideo !== item[0]}
                                    repeat={true}
                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(item[0])}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === item[0] ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Image source={{ uri: item[0].uri }} style={styles.mediaFill} resizeMode="cover" />
                        )}
                    </View>
                    <View style={styles.multipleMedia23Container}>
                        <View style={styles.multiplemediaContainer}>
                            {item[1].uri.endsWith('.mp4') ? (
                                <View style={styles.media1of3}>
                                    <Video
                                        source={{ uri: item[1].uri }}
                                        style={styles.mediaFill}
                                        resizeMode="cover"
                                        paused={playingVideo !== item[1].uri}
                                        repeat={true}
                                    />
                                    <TouchableOpacity
                                        style={styles.playButton}
                                        onPress={() => togglePlayVideo(item[1].uri)}
                                    >
                                        <Text style={styles.playButtonText}>
                                            {playingVideo === item[1].uri ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Image source={{ uri: item[1].uri }} style={styles.mediaFill} resizeMode="cover" />
                            )}
                        </View>
                        <View style={styles.multiplemediaContainer}>
                            {item[2].uri.endsWith('.mp4') ? (
                                <View style={styles.media1of3}>
                                    <Video
                                        source={{ uri: item[2].uri }}
                                        style={styles.mediaFill}
                                        resizeMode="cover"
                                        repeat={true}
                                        paused={playingVideo !== item[2].uri}

                                    />
                                    <TouchableOpacity
                                        style={styles.playButton}
                                        onPress={() => togglePlayVideo(item[2].uri)}
                                    >
                                        <Text style={styles.playButtonText}>
                                            {playingVideo === item[2].uri ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Image source={{ uri: item[2].uri }} style={styles.mediaFill} resizeMode="cover" />
                            )}
                        </View>
                        {numMedia > 3 && (
                            <TouchableOpacity style={styles.multiplemediaContainer} onPress={() => setViewMore(true)}>
                                <Text style={styles.viewMoreText}>Xem thêm</Text>
                                <Image source={{ uri: item[3].uri }} style={styles.viewMore} resizeMode="cover" />
                            </TouchableOpacity>
                        )}
                    </View>


                </View>
            );
        }
    };
    // Media edit
    const switchMedia = (item: string | any[] | any) => {
        if (!item || item.length === 0) {
            return null;
        }
        if (hiddenView == true) {
            return (
                <View style={{ width: '100%', justifyContent: 'center', marginStart: 20 }}>
                    <Text style={{ color: COLOR.PrimaryColor, fontSize: 16, fontWeight: "400" }}>Đã ẩn hình ảnh</Text>
                </View>
            )
        }
        if (item) {
            return (
                <SwiperFlatList
                    key={swiperKey}
                    data={item}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer} key={item.toString()}>
                            {item.uri.endsWith('.mp4') ? (
                                <View>
                                    <Video
                                        source={{ uri: item.uri }}
                                        style={styles.image}
                                        resizeMode="contain"
                                        controls={true}
                                        paused={true}
                                    />
                                    <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => deleteImage(item.uri)}>
                                        <Icon name='x' size={28} color={COLOR.PrimaryColor} />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View key={item.toString}>
                                    <Image source={{ uri: item.uri }} style={styles.image} resizeMode="contain" />
                                    <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => deleteImage(item.uri)}>
                                        <Icon name='x' size={28} color={COLOR.PrimaryColor} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    onChangeIndex={({ index }) => setCurrentIndex(index)}


                />
            )
        }

    };
    const renderDots = () => {
        return (
            <View style={styles.dotsContainer}>
                {media.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: index === currentIndex ? COLOR.PrimaryColor : '#ccc' },
                        ]}
                    />
                ))}
            </View>
        );
    };
    return (
        <View style={[styles.container]} >
            <View style={[styles.header, hiddenView == true && styles.hiddent]}>
                <USER setPermission={setPermission} />
                {/*----------------------- danh sách media chia theo khung ----------------*/}
                {/* ---------------------danh sách hiển thị theo list -------------------------*/}
                {!emotions ?
                    null
                    :
                    <View style={styles.emotions}>
                        <Text>{emotions.Emoji}</Text>
                        <Text style={{ color: 'black' }}> {emotions.title}</Text>
                        <TouchableOpacity onPress={() => { setEmotions(null) }}
                            style={{ marginStart: 5 }}
                        >
                            <Icon name='delete' size={20} color={COLOR.PrimaryColor} />
                        </TouchableOpacity>
                    </View>
                }

                <TEXTAREA content={content} setContent={setContent} setFriends={setFriends} friends={friends} />
                {viewMore ?
                    <View >
                        {switchMedia(media)}

                        {!viewMore || media.length == 0 || hiddenView ?
                            null
                            :
                            <><TouchableOpacity style={styles.buttonCloseSwitch} onPress={() => { setViewMore(false) }}>
                                {/* <Icon name='x' color={'#fff'} size={24} /> */}
                                <Text style={{ color: COLOR.primary300, fontWeight: '400' }}>Đóng</Text>
                            </TouchableOpacity>
                            {renderDots()}
                            </>

                        }
                    </View>
                    :
                    <View >
                        {renderMedia(media)}
                    </View>
                }
                <OPTIONS onSelectEmoji={handleEmojiSelect} onSelectMedia={handleMediaSelect} setShowAI={setShowAI} imageUrl={imageUrl} emotions={emotions} setEmotions={setEmotions} />
            </View>
        </View>
    );
};

export default Body;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    emotions: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: 20
    },
    hiddent: {
        height: '60%',
    },
    buttonCloseSwitch: {
        backgroundColor: COLOR.PrimaryColor,
        height: 28, width: 58,
        position: 'absolute',
        bottom: 10, end: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    header: {
        width: '100%',
    },
    image: {
        width: 380,
        height: '90%',
        margin: 5,
    },
    textDeleteImage: {
        color: 'white',
    },
    buttonDeleteImage: {
        height: 38,
        width: 38,
        position: 'absolute',
        end: 5,
        top: 5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    imageContainer: {
        width: 388,
        height: 300,
        marginTop: 20,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
    },
    containerMedia: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    itemContainer: {
        width: '100%',
    },
    oneMediaContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        marginTop: 20
    },
    media1ContainerOf3: {
        height: '100%',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2, // Độ dày của khung
        borderColor: '#ddd', // Màu của khung
        overflow: 'hidden',
        borderRadius: 10,
    },
    oneMedia: {
        width: '100%',
        backgroundColor: 'white',
        height: '100%'
    },
    twoMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 300,
        width: '100%',
        marginTop: 20

    },
    twoMedia: {
        width: '100%',
        height: '100%'
    },
    threeMediaContainer: {
        flexDirection: 'row',
        height: 300,
        marginTop: 20
    },
    threeMedia23Container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    media23Container: {
        height: '49%',
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1, // Độ dày của khung
        borderColor: '#ddd', // Màu của khung
    },
    multiplemediaContainer: {
        height: '32%',
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1, // Độ dày của khung
        borderColor: '#ddd', // Màu của khung

    },
    viewMore: {
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        opacity: 0.6
    },
    mediaFill: {
        height: '100%',
        width: '100%',
    },
    multipleMediaContainer: {
        marginTop: 20,
        flexDirection: 'row',
        height: 300,
        justifyContent: 'space-between'
    },

    multipleMedia23Container: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    viewMoreButton: {
        aspectRatio: 2,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewMoreText: {
        fontSize: 14,
        fontWeight: '400',
        position: 'absolute',
        zIndex: 99,
        color: 'white',
        backgroundColor: '#32DEEE',
        padding: 2,
        borderRadius: 5,
        paddingHorizontal: 5
    },
    mediaContainer: {
        height: '100%',
        width: '49%',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1, // Độ dày của khung
        borderColor: '#ddd', // Màu của khung

    },
    playButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.PrimaryColor,
        padding: 5,
        borderRadius: 5,
        opacity: 0.6
    },
    playButtonText: {
        color: 'white',

    },
    media1of3: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 5,
        margin: 5,
    },
});
