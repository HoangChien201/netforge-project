import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Animated, Keyboard, Easing, KeyboardAvoidingView } from 'react-native';
import Video from 'react-native-video';
import USER from './User';
import TEXTAREA from './TextArea';
import OPTIONS from './Options';
import { COLOR } from '../../constant/color';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Icon from 'react-native-vector-icons/Feather';

const Body = ({ content, setContent, media, setMedia, permission, setPermission, setStatus, setShowPopup, friends, setFriends }) => {
    //const [media, setMedia] = useState([]);
    const [playingVideo, setPlayingVideo] = useState(null);
    const [viewMore, setViewMore] = useState(false);
    const handleEmojiSelect = (emoji) => {
        setContent(content + emoji);
    };

    const handleMediaSelect = (uris) => {
        setMedia(uris);
        console.log(uris);
    };
    const deleteImage = (uri) => {
        const updatedImages = media.filter(media => media !== uri);
        setMedia(updatedImages);
        console.log(updatedImages);

    };
    const togglePlayVideo = (uri) => {
        setPlayingVideo(playingVideo === uri ? null : uri);
    };
    // View danh sách media
    const renderMedia = (item) => {
        if (!item || item.length === 0) {
            return null;
        }
        const numMedia = item.length;
        if (numMedia === 1) {
            return (
                <View style={styles.oneMediaContainer}>
                    {item.map((uri, index) => (
                        uri.endsWith('.mp4') ? (
                            <View key={index.toString()} style={styles.mediaContainer}>
                                <Video
                                    source={{ uri }}
                                    style={styles.oneMedia}
                                    resizeMode="cover"
                                    paused={playingVideo !== uri}
                                    repeat={true}
                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(uri)}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === uri ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => deleteImage(uri)}>
                                    <Icon name='trash-2' size={28} color={COLOR.PrimaryColor} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.oneMedia} key={index.toString()}>
                                <Image key={index} source={{ uri }} style={styles.oneMedia} resizeMode="cover" />
                                <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => deleteImage(uri)}>
                                    <Icon name='trash-2' size={28} color={COLOR.PrimaryColor} />
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
                        uri.endsWith('.mp4') ? (
                            <View key={index.toString()} style={styles.mediaContainer}>
                                <Video
                                    source={{ uri }}
                                    style={styles.twoMedia}
                                    resizeMode="cover"
                                    paused={playingVideo !== uri}
                                    repeat={true}
                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(uri)}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === uri ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => deleteImage(uri)}>
                                    <Icon name='trash-2' size={28} color={COLOR.PrimaryColor} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.mediaContainer} key={index.toString()}>
                                <Image key={index} source={{ uri }} style={styles.oneMedia} resizeMode="cover" />
                                <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => deleteImage(uri)}>
                                    <Icon name='trash-2' size={28} color={COLOR.PrimaryColor} />
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
                        {item[0].endsWith('.mp4') ? (
                            <View style={styles.media1of3} >
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
                            <Image source={{ uri: item[0] }} style={styles.mediaFill} resizeMode="cover" />
                        )}
                    </View>
                    <View style={styles.threeMedia23Container}>
                        <View style={styles.media23Container}>
                            {item[1].endsWith('.mp4') ? (
                                <View style={styles.media1of3}>
                                    <Video
                                        source={{ uri: item[1] }}
                                        style={styles.mediaFill}
                                        resizeMode="cover"
                                        paused={playingVideo !== item[1]}
                                        repeat={true}
                                    />
                                    <TouchableOpacity
                                        style={styles.playButton}
                                        onPress={() => togglePlayVideo(item[1])}
                                    >
                                        <Text style={styles.playButtonText}>
                                            {playingVideo === item[1] ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Image source={{ uri: item[1] }} style={styles.mediaFill} resizeMode="cover" />
                            )}
                        </View>
                        <View style={styles.media23Container}>
                            {item[2].endsWith('.mp4') ? (
                                <View style={styles.media1of3}>
                                    <Video
                                        source={{ uri: item[2] }}
                                        style={styles.mediaFill}
                                        resizeMode="cover"
                                        repeat={true}
                                        paused={playingVideo !== item[2]}

                                    />
                                    <TouchableOpacity
                                        style={styles.playButton}
                                        onPress={() => togglePlayVideo(item[2])}
                                    >
                                        <Text style={styles.playButtonText}>
                                            {playingVideo === item[2] ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Image source={{ uri: item[2] }} style={styles.mediaFill} resizeMode="cover" />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <View style={styles.multipleMediaContainer}>
                    <View style={styles.media1ContainerOf3}>
                        {item[0].endsWith('.mp4') ? (
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
                            <Image source={{ uri: item[0] }} style={styles.mediaFill} resizeMode="cover" />
                        )}
                    </View>
                    <View style={styles.multipleMedia23Container}>
                        <View style={styles.multiplemediaContainer}>
                            {item[1].endsWith('.mp4') ? (
                                <View style={styles.media1of3}>
                                    <Video
                                        source={{ uri: item[1] }}
                                        style={styles.mediaFill}
                                        resizeMode="cover"
                                        paused={playingVideo !== item[1]}
                                        repeat={true}
                                    />
                                    <TouchableOpacity
                                        style={styles.playButton}
                                        onPress={() => togglePlayVideo(item[1])}
                                    >
                                        <Text style={styles.playButtonText}>
                                            {playingVideo === item[1] ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Image source={{ uri: item[1] }} style={styles.mediaFill} resizeMode="cover" />
                            )}
                        </View>
                        <View style={styles.multiplemediaContainer}>
                            {item[2].endsWith('.mp4') ? (
                                <View style={styles.media1of3}>
                                    <Video
                                        source={{ uri: item[2] }}
                                        style={styles.mediaFill}
                                        resizeMode="cover"
                                        repeat={true}
                                        paused={playingVideo !== item[2]}

                                    />
                                    <TouchableOpacity
                                        style={styles.playButton}
                                        onPress={() => togglePlayVideo(item[2])}
                                    >
                                        <Text style={styles.playButtonText}>
                                            {playingVideo === item[2] ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Image source={{ uri: item[2] }} style={styles.mediaFill} resizeMode="cover" />
                            )}
                        </View>
                        {numMedia > 3 && (
                            <TouchableOpacity style={styles.multiplemediaContainer} onPress={() => setViewMore(true)}>
                                <Text style={styles.viewMoreText}>View More</Text>
                                <Image source={{ uri: item[3] }} style={styles.viewMore} resizeMode="cover" />
                            </TouchableOpacity>
                        )}
                    </View>


                </View>
            );
        }
    };
    // Media edit
    const switchMedia = (item) => {
        if (!item || item.length === 0) {
            return null;
        }
        if (item) {
            return (
                <SwiperFlatList
                    data={item}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer} key={item.toString()}>
                            {item.endsWith('.mp4') ? (
                                <View>
                                    <Video
                                        source={{ uri: item }}
                                        style={styles.image}
                                        resizeMode="contain"
                                        controls={true}
                                        paused={true}
                                    />
                                    <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => deleteImage(item)}>
                                        <Icon name='trash-2' size={28} color={COLOR.PrimaryColor} />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View key={item.toString}>
                                    <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
                                    <TouchableOpacity style={styles.buttonDeleteImage} onPress={() => deleteImage(item)}>
                                        <Icon name='trash-2' size={28} color={COLOR.PrimaryColor} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                />
            )
        }

    };
    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <USER setPermission={setPermission} />
                {/*----------------------- danh sách media chia theo khung ----------------*/}
                {/* ---------------------danh sách hiển thị theo list -------------------------*/}

                {viewMore ?
                    <View>
                        {switchMedia(media)}
                        {viewMore ?
                            <TouchableOpacity style={styles.buttonCloseSwitch} onPress={() => { setViewMore(false) }}>
                                <Icon name='x' color={'#fff'} size={24} />
                            </TouchableOpacity>
                            :
                            null
                        }
                    </View>
                    :
                    <View style={styles.itemContainer}>
                        {renderMedia(media)}
                    </View>
                }

                <TEXTAREA content={content} setContent={setContent} setFriends={setFriends} friends={friends} />
                <OPTIONS onSelectEmoji={handleEmojiSelect} onSelectMedia={handleMediaSelect} />
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
        marginBottom: 10,
    },
    oneMediaContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300
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
