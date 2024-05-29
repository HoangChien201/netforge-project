import { StyleSheet, Text, View,ActivityIndicator, Modal } from 'react-native'
import React,{useState} from 'react'

const Loading = ({isLoading}:{isLoading:boolean}) => {

    return (
        <Modal
            transparent={true}
            visible={isLoading}
        >
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        </Modal>
    )
}

export default Loading

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7
    }
})