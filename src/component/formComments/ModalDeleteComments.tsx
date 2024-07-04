import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ModalDeleteComments = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <Modal
            visible={isVisible}
            transparent={true}
            onRequestClose={onCancel}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style = {{fontSize: 20, fontWeight: '700', color: '#000', marginBottom: 5}}>Xóa bình luận</Text>
                    <Text style={styles.modalText}>Bạn có chắc chắn muốn xóa vĩnh viễn  bình luận này không?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onCancel}>
                            <Text style={[styles.buttonText, {color: '#000'}]}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonDelete} onPress={onConfirm}>
                            <Text style={[styles.buttonText, {color: 'white'}]}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default ModalDeleteComments

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#dcdcdc',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000'
        
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderColor: 'gray',
        padding: 10,
        borderWidth:1,
        backgroundColor: 'white',
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonDelete:{
        padding: 10,
        backgroundColor: '#E01E00',
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
})