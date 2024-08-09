import { FlatList, Image,StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FriendType } from './ModalNewMessage'
import { removeDiacritics } from './format/Diacritics'
import { useNavigation } from '@react-navigation/native'
import { MessageScreenNavigationProp } from '../../screens/message/MessageScreen'

const NewMessageComponent = ({ setType, suggests,setVisible }: { setType: any, suggests: Array<FriendType>,setVisible:any }) => {
    const [keywordTo, setKeywordTo] = useState('')
    const navigation: MessageScreenNavigationProp = useNavigation()
    function OptionHorizontal({ image, text, onPress }: { image: any, text: string, onPress: any }) {
        return (
            <TouchableOpacity style={styles.optionHorizontal} onPress={onPress}>
                <Image source={typeof image === 'string' ? { uri: image } : image} style={{ width: 40, height: 40, borderRadius: 40 }} />
                <Text style={{ color: "#000", fontSize: 16, fontWeight: '600', marginStart: 10 }}>{text}</Text>
            </TouchableOpacity>
        )
    }

    function SuggestItemOnPress(user: {
        avatar: string,
        fullname: string,
        id: number
    }) {
        setVisible(false)
        const { avatar, fullname } = user

        navigation.navigate('MessageScreen', {
            members: [{ user }],
            fullname,
            avatar
        })

    }

    function OnChangeText(text: string) {
        setKeywordTo(text)
    }
    return (

        <View style={styles.container}>
            <View style={styles.searchWrapper}>
                <Text style={{ color: "#000", fontWeight: '500' }}>Tới:</Text>
                <TextInput
                    value={keywordTo}
                    onChangeText={OnChangeText}
                    style={styles.input}
                />
            </View>
            <View style={styles.wrapper}>
                <OptionHorizontal image={require('../../media/icon/group.png')} text='Tạo nhóm' onPress={() => setType('group')} />
                <Text style={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: '600',
                    marginVertical: 10
                }}>Gợi ý</Text>

                <View style={styles.suggestWrapper}>
                    <FlatList
                        data={
                            suggests.filter((item) => {
                                const fullname = item.user.fullname.toLowerCase();
                                const keyword = keywordTo.toLowerCase();

                                if (removeDiacritics(fullname).includes(removeDiacritics(keyword))) {
                                    return item
                                }

                            })
                        }
                        renderItem={({ item }) => {
                            const { avatar, fullname, id } = item.user
                            return (
                                <OptionHorizontal
                                    image={avatar}
                                    text={fullname}
                                    onPress={SuggestItemOnPress.bind(this, item.user)}
                                />
                            )
                        }}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                </View>
            </View>

        </View>

    )
}

export default NewMessageComponent

const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    wrapper:{
        paddingHorizontal: 20,
        flex: 1

    },
    optionHorizontal: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    optionHorizontalItem: {
        height: '100%',
        width: 75,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchWrapper: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: "rgba(201,204,209,0.3)",
        paddingHorizontal: 20
    },
    input: {
        width: '100%'
    }
})