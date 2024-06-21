import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { EmojiData } from '../../constant/emoji'

const ReactionButton = ({isVisible, onClose }) => {
   
    const [selectedReaction, setSelectedReaction] = useState(null);


    const handleReaction = (reaction) => {
        switch (reaction) {
            case 1:
                return console.log('like');
            case 2:
                return console.log('dislike');
            case 3:
                return console.log('wow');
            case 4:
                return console.log('haha');
            case 4:
                return console.log('Phẫn mộ');
            default:
                return console.log('Phẫn mộ');

        }
    }
    return (
        
       
                <Modal
                transparent={true}
                visible={isVisible}
                animationType="fade"
                onRequestClose={onClose}
            >
                <TouchableOpacity style={styles.modalBackground} onPress={toggleModal}>
                    <View style={styles.reactionContainer}>
                        <TouchableOpacity onPress={() => handleReaction('like')}>
                            <Text>hiih</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReaction('love')}>
                            
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReaction('smile')}>
                            
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReaction('surprise')}>
                            
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReaction('sad')}>
                           
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReaction('angry')}>
                            
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
            
        
    )
}

export default ReactionButton

const styles = StyleSheet.create({})