import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import USER from './User'
import TEXTAREA from './TextArea'
import OPTIONS from './Options'
import { TouchableOpacity } from 'react-native'
import { COLOR } from '../../constant/color'
const Body = ({ text, setText, image, setImage, type, setType }) => {
    const [imagePath, setImagePath] = useState('');

    // Emoji
    const handleEmojiSelect = (emoji: any) => {
        setText(text + emoji);
    };
    // chọn ảnh
    const handleImageSelect = (uri) => {
        setImage(uri);
        //console.log(uri);

    };
    // xóa ảnh
    const deleteImage = () =>{
        setImage(null);
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <USER setType={setType}></USER>
                    <View>
                        {image ? <Image source={{ uri: image }} style={styles.image} resizeMode="contain" /> : null}
                        {image ? <TouchableOpacity style={styles.buttonDeleteImage} onPress={deleteImage}>
                            <Text style={styles.textDeleteImage}>Delete</Text>
                        </TouchableOpacity> : null}

                    </View>

                    <TEXTAREA text={text} setText={setText} />
                </View>
                <View>
                    <OPTIONS onSelectEmoji={handleEmojiSelect} onSelectImage={handleImageSelect} />
                </View>
            </View>
        </View>
    )
}

export default Body

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '90%',
        borderTopStartRadius: 36,
        borderTopEndRadius: 36,
    },
    header: {

    },
    buttonType: {
        backgroundColor: COLOR.PrimaryColor
    },
    options: {

    },
    image: {
        width: '100%',
        height: 250,
        alignSelf:'center',



    },
    textDeleteImage: {
        color: 'white'
    },
    buttonDeleteImage: {
        backgroundColor: COLOR.PrimaryColor,
        padding: 2,
        height: 30,
        width: 60,
        borderRadius: 10,
        position: 'absolute',
        end: 16,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        marginTop: 20,
        alignSelf: 'center',
        shadowColor: '#000', // Màu của bóng
        shadowOffset: { width: 0, height: 2 }, // Độ lệch của bóng theo chiều ngang và dọc
        shadowOpacity: 0.8, // Độ mờ của bóng
        shadowRadius: 5, // Bán kính của bóng (cho iOS)
        elevation: 5, // Độ cao của bóng (cho Android)
    },

})