import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

const ScreenNull = () => {
    const [view, setView] = useState(null);

    // Hàm delayScreen để thiết lập trạng thái sau 2 giây
    const delayScreen = () => {
        const timeoutId = setTimeout(() => {
            return setView(
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>Hiện chưa có bài viết nào</Text>
                </View>
            );
        }, 2000);

        // Dọn dẹp timeout nếu thành phần bị unmount
        return () => clearTimeout(timeoutId);
    };

    useEffect(() => {
        // Gọi hàm delayScreen khi thành phần được mount
        const cleanup = delayScreen();

        // Trả về hàm cleanup để dọn dẹp timeout
        return cleanup;
    }, []);

    return (
        <View style={styles.container}>
            {view ? view : (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Đang tải...</Text>
                </View>
            )}
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
    messageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('screen').height / 1.7,
    },
    messageText: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#999',
    },
});

export default ScreenNull;
