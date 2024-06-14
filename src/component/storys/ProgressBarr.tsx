import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, Text, ImageBackground } from 'react-native';
import Sound from 'react-native-sound';
import ProgressBar from './ProgressBar';

const IMAGE_DATA = [
    { id: 1, uri: 'https://via.placeholder.com/600/92c952', sound: 'https://console.cloudinary.com/console/c-faa0452b49d63d3ef1919bbb462e13/media_library/homepage/asset/57e7dc9d4350112ccd24aa26577bb665/manage?context=manage' },
    { id: 2, uri: 'https://via.placeholder.com/600/771796', sound: 'https://console.cloudinary.com/console/c-faa0452b49d63d3ef1919bbb462e13/media_library/search/asset/cf8373476a3eba79848d4c6ff3199c79/manage?sortDirection=desc&sortField=uploaded_at&q=%7B%22uploadedTimeOption%22%3A%22today%22%2C%22createdTimeOption%22%3A%22today%22%2C%22createdByUsers%22%3A%5B%22014986dafeb76d342e32819aca0fce%22%5D%7D&view_mode=mosaic&context=manage' },
];

const ProgressBarr = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const soundRef = useRef(null);
    const [data, setData] = useState(IMAGE_DATA);
    const [paused, setPaused] = useState(false);
    return (

        <View style={styles.container}>
            <Image source={{ uri: data[activeIndex].uri }} style={styles.fullscreenImage} resizeMode='cover'></Image>
           
            <View style={{ flexDirection: 'row', position: 'absolute', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0)', width: '100%' }}>
                <TouchableOpacity
                    style={styles.button}>
                </TouchableOpacity>
                <TouchableOpacity 
                     style={styles.button}>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    fullscreenImage: {
        flex: 1,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10

        // Add a margin of 50 from the bottom
    },
    button: {
        flex: 1
    },
    progressBarContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        flexDirection: 'row',
        height: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
    },
    //     buttonText: {
    //         color: 'white',
    //     },
});

export default ProgressBarr;
