import React, { FC, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, FlatList, Text, Image, ToastAndroid } from 'react-native';
import { MentionInput, MentionSuggestionsProps, Suggestion, replaceMentionValues } from 'react-native-controlled-mentions';
import { getFriends } from '../../http/QuyetHTTP';
import { COLOR } from '../../constant/color';

type Props = {
    content: any,
    setContent: () => void,
    friends: any,
    setFriends: (value: any) => void
}
type Friend = {
    id: number;
    status: number;
    create_at: string;
    user: {
        id: number;
        fullname: string;
        avatar: string | null;
    };
};
const TextArea: React.FC<Props> = ({ content, setContent, friends, setFriends }) => {
    const [value, setValue] = useState<any[]>([]);
    const mentions: { name: any; id: any; }[] = useMemo(() => [], [content]);

    const getFriendList = async () => {
        try {
            const status = 2;
            const result = await getFriends(status);
            setValue(result);
            console.log('lũ bạn:' + JSON.stringify(result));
        } catch (error) {
            console.log('getFriends error:' + error);
            throw error;
        }
    }
    useEffect(() => {
        getFriendList();
    }, []);
    useEffect(() => {
        replaceMentionValues(
            content,
            mention => {
                const { name, id } = mention;
                if (!mentions.some(m => m.id === id)) {
                    mentions.push({ name, id });
                }
                return `@[${name}](${id})`;
            }
        );
        if (mentions.length > 0) {
            const ids = mentions.map(mention => mention.id);
            setFriends(ids);
            console.log('id lũ bạn: ' + ids);
            console.log('mentions : ' + JSON.stringify(mentions));
            setValue(prevValue => prevValue.filter(item => !ids.includes(item.user.id)));
        } else {
            setFriends([]);
        }
    }, [content]);

    const renderSuggestions: FC<MentionSuggestionsProps> = ({ keyword, onSuggestionPress }) => {
        if (!keyword) {
            return null;
        }
        const idsToExclude = mentions.map(mention => Number(mention.id)); // Chuyển đổi id trong mentions thành số

        const suggestions = value.filter(user => {
            const userId = Number(user.user.id); // Chuyển đổi id của user thành số
            return (
                user.user.fullname.toLowerCase().includes(keyword.toLowerCase()) &&
                !idsToExclude.includes(userId)
            );
        });
        return (
            <FlatList
                style={styles.flatList}
                data={suggestions}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.suggestionItem}>
                        {item.user.avatar? <Image source={{ uri: item.user.avatar }} style={styles.avatar} />  :  
                        <View style={[styles.avatar,{borderWidth:1, borderColor:'#EEEEEE', borderRadius:100, backgroundColor:'#DDDDDD'}]}></View>}
                        
                        <Text onPress={() => handleSuggestionPress(item.user, onSuggestionPress)}>
                            {item.user.fullname}
                        </Text>
                    </View>
                )}
            />
        );
    };

    const handleSuggestionPress = (user: { id: any; fullname: string; }, onSuggestionPress: (suggestion: Suggestion) => void) => {
        let isAlreadyMentioned = false;
        const userId = Number(user.id);
        for (let i = 0; i < mentions.length; i++) {
            const mentionId = Number(mentions[i].id);
            if (mentionId === userId) {
                isAlreadyMentioned = true;
                break;
            }
            console.log('1 = ' + mentions[i].id);
            console.log('2 = ' + user.id);


        }
        console.log('isAlreadyMentioned:', isAlreadyMentioned);
        if (isAlreadyMentioned) {
            ToastAndroid.show('Người dùng đã được nhắc đến!', ToastAndroid.SHORT);
        } else {
            onSuggestionPress({ id: user.id, name: user.fullname });
            mentions.push({ id: user.id, name: user.fullname });
        }
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
                        textStyle: { fontWeight: 'bold', color: COLOR.PrimaryColor },
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
        margin: 2,
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
        height: 300,
    }
});

export default TextArea;
