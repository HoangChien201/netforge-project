import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const TextArea = ({ text, setText }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textArea}
                multiline={true}
                numberOfLines={4}
                onChangeText={setText}
                value={text}
                placeholder="What's on your mind..."
                placeholderTextColor="#AAAAAA"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    textArea: {
        height: 150,
        padding: 5,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: '#CCC',
        borderWidth: 1,
        textAlignVertical: 'top',
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2.84,
        elevation: 3,
    },
});

export default TextArea;
