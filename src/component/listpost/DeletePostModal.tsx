import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react';
import { deletePost } from '../../http/QuyetHTTP';
type Mo = {
  showDelete: boolean;
  setShowDelete: (value: any) => void;
  postId: any;
  setLoadAfterUpdate: (value: any) => void;
  setSelectedId: (value: boolean) => void;
  setMoveToHome: (value: boolean) => void;
}

const DeletePost: React.FC<Mo> = ({ showDelete, setShowDelete, postId, setLoadAfterUpdate, setMoveToHome, setSelectedId }) => {
  const deleP = async (postId) => {
    try {
      const result = await deletePost(postId);
      if (result) {
        setShowDelete(false);
        setLoadAfterUpdate(pre => !pre);
        setMoveToHome(true)
        setSelectedId(null);
        Alert.alert(
          'Bài viết đã xóa!',
        )
      }
    } catch (error) {
      console.log('xóa bài viết thất bại', error);
      throw error;
    }
  }
  const closeDelete = () => {
    setSelectedId(null)
    setShowDelete(false)
  }
  return (
    <Modal
      visible={showDelete}
      transparent={true}
      animationType="slide"
      onRequestClose={() => closeDelete()}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Xác nhận</Text>
          <Text style={styles.message}>Bạn có chắc chắn muốn xóa bài viết?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => closeDelete()}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => deleP(postId)}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default DeletePost

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})