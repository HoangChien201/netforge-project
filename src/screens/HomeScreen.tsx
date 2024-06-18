import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Image } from 'react-native';
import ListStory from '../component/storys/ListStory';
import ListPorts from '../component/listpost/ListPorts';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {
    const combinedData = [{ key: 'stories' }, { key: 'posts' }];
    const scrollY = useRef(new Animated.Value(0)).current;
    const [tabBarVisible, setTabBarVisible] = useState(true);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const navigation = useNavigation();
    const isFocused = useIsFocused();



    const handleScroll = ({ nativeEvent }) => {
        const offsetY = nativeEvent.contentOffset.y;
        if (offsetY > prevScrollY ) {
            // Cuộn xuống
            navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
        } else if (offsetY < prevScrollY) {
            // Cuộn lên
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#1F1F2F',
                    margin: 20,
                    borderRadius: 15,
                    display: 'flex',
                }
            });
        }
        setPrevScrollY(offsetY);
    };

    const renderItem = ({ item }) => {
        if (item.key === 'stories') {
            return <ListStory />;
        } else if (item.key === 'posts') {
            return <ListPorts />;
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <Animated.FlatList
                data={combinedData}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false, listener: handleScroll }
                )}
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
