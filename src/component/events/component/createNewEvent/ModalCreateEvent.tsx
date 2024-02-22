import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CreateNewEventScreen from '../../screens/CreateNewEventScreen'
interface ModalCreateEventProps {
    visible: boolean,
    closeModal: any
}
const ModalCreateEvent:React.FC<ModalCreateEventProps> = ({ visible, closeModal }) => {
  return (
    <Modal
            animationType='slide'
            visible={visible}>
            <View style={styles.container}>
                <CreateNewEventScreen closeModal={closeModal}/>
            </View>
        </Modal>
  )
}

export default ModalCreateEvent

const styles = StyleSheet.create({})