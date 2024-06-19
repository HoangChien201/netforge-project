import React, { useRef, useState } from 'react';
import { StyleSheet, View, Animated, ActivityIndicator } from 'react-native';
import ListStory from '../component/storys/ListStory';
import ListPorts from '../component/listpost/ListPorts';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {
    const initialData = [{ key: 'stories' }, { key: 'posts' }];
    const [data, setData] = useState(initialData);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [refreshing, setRefreshing] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const handleScroll = ({ nativeEvent }) => {
        const offsetY = nativeEvent.contentOffset.y;
        if (offsetY > prevScrollY) {
            navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
        } else if (offsetY < prevScrollY) {
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

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const renderItem = ({ item }) => {
        if (item.key === 'stories' || item.key.startsWith('new_post')) {
            return <ListStory />;
        } else if (item.key === 'posts' || item.key.startsWith('new_post')) {
            return <ListPorts onrefresh={refreshing}/>;
        }
        return null;
    };

    // const renderHeader = () => {
    //     if (!refreshing) return null;
    //     return (
    //         <View style={styles.loading}>
    //             <ActivityIndicator size="large" color="#0000ff" />
    //         </View>
    //     );
    // };

    return (
        <View style={styles.container}>
            <Animated.FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false, listener: handleScroll }
                )}
                onEndReachedThreshold={0.5}
                refreshing={refreshing}
                onRefresh={onRefresh}
                // ListHeaderComponent={renderHeader}
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
    loading: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
