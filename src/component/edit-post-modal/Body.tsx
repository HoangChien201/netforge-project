import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../../constant/color'
import USER from './User'
import OPTIONS from './Options'
import EMOJILIST from './EmojiList'
import TEXTAREA from './TextArea'
const Body = ({ showModalEdit, setShowModalEdit }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const handleEmojiSelect = (emoji: any) => {
        setText(text + emoji);
    };
    const handleImageSelect = (uri) => {
        setImage(uri);
    };
    return (
        <Modal visible={showModalEdit} animationType="slide" style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setShowModalEdit(false)} style={styles.closeButton} >
                    <Image style={styles.closeImage} source={require('../../media/quyet_icon/x_w.png')} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Edit Post</Text>
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>
            <USER/>
            {image? <Image source={{uri: image}} style={styles.imagee}/>: null}
            <TEXTAREA text={text} setText={setText} />
            <OPTIONS onSelectEmoji={handleEmojiSelect} onSelectImage={handleImageSelect} />
        </Modal>
    )
}

export default Body

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',

    },
    closeButton: {
        marginStart:10
    },
    closeImage: {
        height: 40,
        width: 40
    },
    header: {
        backgroundColor: COLOR.PrimaryColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50
    },
    saveButton:{
        marginEnd:16
    },
    saveText:{
        color: 'white',
        fontWeight: '300',
        fontSize: 24
    },
    imagee:{
        width: 300,
        height: 300,
        marginTop: 20,
        alignSelf: 'center',
    },
    headerText:{
        color: 'white',
        fontWeight: '600',
        fontSize: 24,
    }

})