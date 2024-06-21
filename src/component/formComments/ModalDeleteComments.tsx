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
                    <Text style={styles.modalText}>Bạn có chắc chắn muốn xóa bình luận này?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onCancel}>
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onConfirm}>
                            <Text style={styles.buttonText}>Xóa</Text>
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
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})