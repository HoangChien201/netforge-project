import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../../constant/color'
import { NetworkRootStackEnum } from '../stack/NetworkRootStackParams';

interface ItemImgProps {
    item: {
        node: {
            image: {
                uri: string;
            };
        };
    };
    index: number;
    navigation:any
}

const ItemImg: React.FC<ItemImgProps> = ({ item, index,navigation }) => {
    const [ticks, setTicks] = useState<boolean>(false);
    
    const checkSelect = () => {
        const uri = item.node.image.uri;
        navigation.navigate(NetworkRootStackEnum.StoryDetail, { uri })
    };

    return (
        <TouchableOpacity onPress={checkSelect} style={styles.photoContainer}>
            <Image source={{ uri: item.node.image.uri }} style={styles.photo} />
        </TouchableOpacity>
    );
}

export default ItemImg;

const styles = StyleSheet.create({
    photo: {
        width: '100%',
        aspectRatio: 0.45, 
    },
    photoContainer: {
        flex: 1,
        marginHorizontal: 1,
        marginBottom: 10,
        alignItems: 'center',
    },
    tickOuter: {
        borderWidth: 2,
        borderColor: COLOR.PrimaryColor,
        width: 15,
        height: 15,
        position: 'absolute',
        right: 8,
        top: 8,
        borderRadius: 50,
        padding: 1
    },
    tickInner: {
        flex: 1,
        backgroundColor: 'transparent'
    }
});
