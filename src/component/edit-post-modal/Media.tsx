import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Permission } from 'react-native';
import Video from 'react-native-video';
import USER from './User';
import TEXTAREA from './TextArea';
import OPTIONS from './Options';
import { COLOR } from '../../constant/color';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Icon from 'react-native-vector-icons/Feather';
import { imageType } from './Body';

interface renderMedia {
    images: any;
    media: any;
    setMedia: (Permission: any) => void;
    setShowModal: (Permission: boolean) => void;
    hiddenView:any
};

const renderMedia: React.FC<renderMedia> = ({ images, media, setMedia, setShowModal,hiddenView }) => {
    const [playingVideo, setPlayingVideo] = useState(null);
    const [viewMore, setViewMore] = useState(false);
    const mediaLength = images.length;
    const togglePlayVideo = (uri) => {
        setPlayingVideo(playingVideo === uri ? null : uri);
    };
    if (!images || images.length == 0) {
        return (
            null
        );
    }
    if (hiddenView == true) {
        return (
            <View style={{ width: '100%', justifyContent: 'center', paddingBottom: 10 }}>
                <Text style={{ color: COLOR.PrimaryColor, fontSize: 16, fontWeight: "400", marginStart:20 }}>Đã ẩn hình ảnh</Text>
            </View>
        )
    }
    const numMedia = images.length;
    if (numMedia === 1) {
        return (
            <View style={styles.oneMediaContainer}>

                {images.map((item: imageType, index) => (
                    item.url.endsWith('.mp4') ? (
                        <View key={index.toString()} style={styles.mediaContainer}>
                            <Video
                                source={{ uri: item.url }}
                                style={styles.oneMedia}
                                resizeMode="cover"
                                paused={playingVideo !== item.url}
                                repeat={true}
                            />
                            <TouchableOpacity
                                style={styles.playButton}
                                onPress={() => togglePlayVideo(item.url)}
                            >
                                <Text style={styles.playButtonText}>
                                    {playingVideo === item.url ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.oneMedia} key={index.toString()} >
                            <Image source={{ uri: item.url }} style={styles.oneMedia} resizeMode="cover" />
                        </View>

                    )
                ))}
            </View>
        );
    } else if (numMedia === 2) {
        return (

            <View style={styles.twoMediaContainer}>
                {images.map((item: imageType, index) => (
                    item.url.endsWith('.mp4') ? (
                        <View key={index.toString()} style={styles.mediaContainer}>
                            <Video
                                source={{ uri: item.url }}
                                style={styles.twoMedia}
                                resizeMode="cover"
                                paused={playingVideo !== item}
                                repeat={true}
                            />
                            <TouchableOpacity
                                style={styles.playButton}
                                onPress={() => togglePlayVideo(item.url)}
                            >
                                <Text style={styles.playButtonText}>
                                    {playingVideo === item ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.mediaContainer} key={index.toString()}>
                            <Image source={{ uri: item.url }} style={styles.oneMedia} resizeMode="cover" />
                        </View>
                    )
                ))}
            </View>
        );
    } else if (numMedia === 3) {
        return (
            <TouchableOpacity style={styles.threeMediaContainer} onPress={() => setViewMore(true)}>
                <View style={styles.media1ContainerOf3}>
                    {images[0].url.endsWith('.mp4') ? (
                        <View style={styles.media1of3}>
                            <Video
                                source={{ uri: images[0].url }}
                                style={styles.mediaFill}
                                resizeMode="cover"
                                paused={playingVideo !== images[0].url}
                                repeat={true}
                            />
                            <TouchableOpacity
                                style={styles.playButton}
                                onPress={() => togglePlayVideo(images[0].url)}
                            >
                                <Text style={styles.playButtonText}>
                                    {playingVideo === images[0].url ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Image source={{ uri: images[0].url }} style={styles.mediaFill} resizeMode="cover" />
                    )}
                </View>
                <View style={styles.threeMedia23Container}>
                    <View style={styles.media23Container}>
                        {images[1].url.endsWith('.mp4') ? (
                            <View style={styles.media1of3}>
                                <Video
                                    source={{ uri: images[1].url }}
                                    style={styles.mediaFill}
                                    resizeMode="cover"
                                    paused={playingVideo !== images[1].url}
                                    repeat={true}
                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(images[1].url)}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === images[1].url ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Image source={{ uri: images[1].url }} style={styles.mediaFill} resizeMode="cover" />
                        )}
                    </View>
                    <View style={styles.media23Container}>
                        {images[2].url.endsWith('.mp4') ? (
                            <View style={styles.media1of3}>
                                <Video
                                    source={{ uri: images[2].url }}
                                    style={styles.mediaFill}
                                    resizeMode="cover"
                                    repeat={true}
                                    paused={playingVideo !== images[2].url}

                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(images[2].url)}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === images[2].url ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Image source={{ uri: images[2].url }} style={styles.mediaFill} resizeMode="cover" />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <View style={styles.multipleMediaContainer}>
                <View style={styles.media1ContainerOf3}>
                    {images[0].url.endsWith('.mp4') ? (
                        <View style={styles.media1of3}>
                            <Video
                                source={{ uri: images[0].url }}
                                style={styles.mediaFill}
                                resizeMode="cover"
                                paused={playingVideo !== images[0].url}
                                repeat={true}
                            />
                            <TouchableOpacity
                                style={styles.playButton}
                                onPress={() => togglePlayVideo(images[0].url)}
                            >
                                <Text style={styles.playButtonText}>
                                    {playingVideo === images[0].url ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Image source={{ uri: images[0].url }} style={styles.mediaFill} resizeMode="cover" />
                    )}
                </View>
                <View style={styles.multipleMedia23Container}>
                    <View style={styles.multiplemediaContainer}>
                        {images[1].url.endsWith('.mp4') ? (
                            <View style={styles.media1of3}>
                                <Video
                                    source={{ uri: images[1].url }}
                                    style={styles.mediaFill}
                                    resizeMode="cover"
                                    paused={playingVideo !== images[1].url}
                                    repeat={true}
                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(images[1].url)}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === images[1].url ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Image source={{ uri: images[1].url }} style={styles.mediaFill} resizeMode="cover" />
                        )}
                    </View>
                    <View style={styles.multiplemediaContainer}>
                        {images[2].url.endsWith('.mp4') ? (
                            <View style={styles.media1of3}>
                                <Video
                                    source={{ uri: images[2].url }}
                                    style={styles.mediaFill}
                                    resizeMode="cover"
                                    repeat={true}
                                    paused={playingVideo !== images[2].url}

                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(images[2].url)}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === images[2].url ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Image source={{ uri: images[2].url }} style={styles.mediaFill} resizeMode="cover" />
                        )}
                    </View>
                    {numMedia > 3 && (
                        <TouchableOpacity style={styles.multiplemediaContainer} onPress={() => setShowModal(true)}>
                            <Text style={styles.viewMoreText}>View More</Text>
                            <Image source={{ uri: images[3].url }} style={styles.viewMore} resizeMode="cover" />
                        </TouchableOpacity>
                    )}
                </View>


            </View>
        );
    }
};
export default renderMedia;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        height: '90%',
        width: '100%',
        borderTopStartRadius: 36,
        borderTopEndRadius: 36,
    },
    buttonCloseSwitch: {
        backgroundColor: COLOR.PrimaryColor, height: 28, width: 28, position: 'absolute', top: 10, end: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 5
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
        borderRadius: 10,
        position: 'absolute',
        end: 5,
        bottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
    },
    imageContainer: {
        width: 388,
        height: 300,
        marginTop: 20,
    },
    containerMedia: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    itemContainer: {
        width: '100%',
        marginBottom: 10,
    },
    oneMediaContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,

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
        marginBottom: 5,
        height: 300,
        width: '100%',

    },
    twoMedia: {
        width: '100%',
        height: '100%'
    },
    threeMediaContainer: {
        flexDirection: 'row',
        height: 300,
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
        marginBottom: 5,
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
        fontSize: 16,
        fontWeight: 'bold',
        position: 'absolute',
        zIndex: 99,
        color: 'white',
        backgroundColor: 'black',
        padding: 2,
        borderRadius: 5
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
    }
});
