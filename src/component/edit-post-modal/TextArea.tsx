import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, Image } from 'react-native';
import { MentionInput, MentionSuggestionsProps, replaceMentionValues } from 'react-native-controlled-mentions';
import { COLOR } from '../../constant/color';
import { getFriends } from '../../http/QuyetHTTP'
interface User {
    id: string;
    fullname: string;
    avatar: string;
}
const TextArea = ({ content, setContent, setTags }) => {
    // const displayText = replaceMentionValues(content, ({ name }) => `@${name}`);
    const [value, setValue] = useState([]);
    const mentions: { name: string; id: string; }[] = [];
    const status = 2;
    const getFriendList = async () => {
        try {
            const result = await getFriends(status);
            setValue(result.user);
        } catch (error) {
            console.log('lỗi khi lấy ds bạn bè: ' + error);
            throw error;
        }
    }
    useEffect(() => {
        // getFriendList();
        // if (mentions.length > 0) {
        //     const ids = mentions.map(mention => mention.id);
        //     setTags(ids);
        // }
    }, [content])
    // const replacedText = replaceMentionValues(
    //     content,
    //     mention => {
    //         const { name, id } = mention;
    //         mentions.push({ name, id });
    //         return `@[${name}](${id})`;
    //     }
    // );
    const renderSuggestions: FC<MentionSuggestionsProps> = ({ keyword, onSuggestionPress }) => {
        if (!keyword) {
            return null;
        };
        const suggestions = value.filter(user =>
            user.fullname.toLowerCase().includes(keyword.toLowerCase())
        );
        return (
            <FlatList
                style={styles.flatList}
                data={suggestions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.suggestionItem}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <Text onPress={() => onSuggestionPress({ id: item.id, name: item.fullname })}>
                            {item.fullname}
                        </Text>
                    </View>
                )}
            />
        );
    };
    return (
        <View style={styles.container}>
            <MentionInput
                value={content}
                onChange={setContent}
                partTypes={[
                    {
                        trigger: '@',
                        renderSuggestions: renderSuggestions,
                        textStyle: { fontWeight: 'bold', color: COLOR.PrimaryColor, },
                    },
                ]}
                style={styles.input}
                placeholder="Viết gì đó..."
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
    suggestionItem: {
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        margin: 2
    },
    input: {
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    flatList: {
        position: 'absolute',
        zIndex: 999,
        marginTop: 45,
        height: 300
    }
});

export default TextArea;
