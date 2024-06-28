import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../media/quyet_icon/netforge1.jpg')}/>
            <Text style={styles.text}>Chào mừng đến NetForge!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    image:{
        height: 80,
        width:80,
        marginBottom: 5,
        borderRadius:100
    }
});

export default SplashScreen;
