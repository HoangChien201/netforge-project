import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../media/quyet_icon/netforge.png')}/>
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
        height: 100,
        width:100,
        marginBottom: 5
    }
});

export default SplashScreen;
