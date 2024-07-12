import { StyleSheet, Text, View,ActivityIndicator, Modal } from 'react-native'
import React,{useState} from 'react'
import { COLOR } from '../../constant/color'
import { BallIndicator, UIActivityIndicator, } from 'react-native-indicators'; 

const Loading = ({isLoading}:{isLoading:boolean}) => {

    return (
        <Modal
            transparent={true}
            visible={isLoading}
        >
            <View style={styles.loading}>
                {/* <ActivityIndicator size="large" color={COLOR.PrimaryColor} /> */}
                <UIActivityIndicator color={'#FF6347'} size={50} />
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