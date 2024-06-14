import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const ProgressBar = ({ paused, active, index, setActi, length, setcurrentIndex, currentIndex, dataLength }) => {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setShouldAnimate(index === active);
       
        progress.setValue(0);
    }, [index, active]);
   
    
    useEffect(() => {
        let animation;

        if (shouldAnimate) {
           if(!paused){
            animation = Animated.timing(progress, {
                toValue: 1,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(({ finished }) => {
                if (finished) {
                    if (active === length) {
                        if (currentIndex === dataLength) {
                            return;
                        } else {
                            setcurrentIndex(currentIndex + 1);
                        }
                    } else {
                        setActi(active + 1);
                    }
                }
            });
          
           }
           else{
            Animated.timing(progress).stop();
           }
        }

        
    }, [progress, shouldAnimate, paused]);

    const getProgressBar = () => {
        if (active > index) {
            return '100%';
        }
        if (active === index) {
            return progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
            });
        }
        console.log("w");
        progress.setValue(0);
        return '0%';
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, { width: getProgressBar() }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
    },
    progressBarContainer: {
        width: '100%',
        height: 2,
        backgroundColor: '#e0e0df',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#76c7c0',
    },
});

export default ProgressBar;
