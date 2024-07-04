import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, Text, ImageBackground } from 'react-native';
import { COLOR } from '../../constant/color';
import { DateOfTimePost } from '../../format/DateOfTimePost';



const ProgressBarr = ({listpostStory}) => {
    const [data, setData] = useState(listpostStory);
    return (

        <View style={styles.container}>
            {
                data[0]?.media[0]?.url ?
                  <>
                   <Image source={{ uri: data[0]?.media[0]?.url  }} style={styles.fullscreenImage} />
                    <Text style={{ fontSize: 30, color: '#fff', position: 'absolute', top: '50%', left: '25%' }}>{data[0]?.content}</Text>
                    <Text style={{ color: 'white', position: 'absolute', top: '5%', left: '20%' }}>{DateOfTimePost(data[0].create_at)}</Text>
                  </>: <View style={styles.fullscreenImage1}>
                        <Text style={{ fontSize: 30, color: "#000", position: 'absolute', top: '40%', left: '25%' }}>{data[0]?.content} </Text>
                        <Text style={{ color: 'white', position: 'absolute', top: '5%', left: '20%' }}>{DateOfTimePost(data[0].create_at)}</Text>
                    </View>
            }
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
    fullscreenImage1: {
        flex: 1,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: COLOR.PrimaryColor,
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
