import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, Image, Pressable } from 'react-native';
import { MentionInput, MentionSuggestionsProps, Suggestion, replaceMentionValues } from 'react-native-controlled-mentions'
import { getFriends } from '../../http/QuyetHTTP'
import { COLOR } from '../../constant/color';


const TextArea = ({ text, setText, friends, setFriends }) => {
    const [value, setValue] = useState([]);
    const mentions = [];
    const getFriendList = async () => {
        try {
            const result = await getFriends();
            setValue(result);
        } catch (error) {
            console.log(error);
            throw error;

        }
    }
    useEffect(() => {
        getFriendList();
    }, [])
    const replacedText = replaceMentionValues(
        text,
        mention => {
            const { name, id } = mention;
            mentions.push({ name, id });
            return `@[${name}](${id})`;
        }
    );
    useEffect(()=>{
        console.log(text);
        console.log(mentions);
        const ids = mentions.map(mention => mention.id);
        setFriends(ids);
    },[text])
    const renderSuggestions: FC<MentionSuggestionsProps> = ({ keyword, onSuggestionPress }) => {
        if (!keyword) {
            return null;
        };
        const suggestions = value.filter(user =>
            user.name.toLowerCase().includes(keyword.toLowerCase())
        );
        return (
            <FlatList
                style={styles.flatList}
                data={suggestions}
                keyExtractor={item => item.idReq}
                renderItem={({ item }) => (
                    <View style={styles.suggestionItem}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <Text onPress={() => onSuggestionPress({ id: item.idReq, name: item.name })}>
                            {item.name}
                        </Text>
                    </View>
                )}
            />
        );
    };
    return (
        <View style={styles.container}>
            <MentionInput
                value={text}
                onChange={setText}
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
