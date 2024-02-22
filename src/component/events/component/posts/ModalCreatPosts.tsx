import React, { useState } from 'react'
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { user as userRoot, userType } from '../../screens/ProfileScreen'
import ButtonText from '../ui/ButtonText'
import { COLOR } from '../../../../constant/color'
import { CreatePostsHTTP } from '../../../../http/chien_posts/PostHTTP'

interface ModalCreatPostsProps {
    visible: boolean,
    closeModal: any,
    getPosts:any
}

export type PostsRequest = {
    content: string;
    user: number;
}

const ModalCreatPosts: React.FC<ModalCreatPostsProps> = ({ visible, closeModal,getPosts }) => {
    const user: userType = userRoot

    //useState
    const [isValid, setIsValid] = useState(false)
    const [valuePosts, setValuePosts] = useState<PostsRequest>({
        content: '',
        user: user.id
    })

    function OnChangeTextValuePosts(value: string) {
        setValuePosts((prevValue) => {
            return { ...prevValue, content: value }
        })
    }

    async function onSubmit() {
        try {
            const respone = await CreatePostsHTTP(valuePosts)
            valuePosts.content=''
            closeModal()
            getPosts()
        } catch (error) {

        }


    }
    return (
        <Modal
            animationType='slide'
            visible={visible}>
            <View style={styles.container}>
                {/* toolbar-start */}
                <View style={styles.toolbar}>
                    <TouchableOpacity onPress={closeModal}>
                        <Icon name='cross' size={30} color='#000' />
                    </TouchableOpacity>
                    <Text style={styles.title}>Tạo bài viết</Text>
                    <ButtonText
                        style={[styles.buttonSubmit, { backgroundColor: valuePosts ? COLOR.primaryColor : '#7a7b7d' }]}
                        text='Đăng'
                        textColor={valuePosts ? '#fff' : '#545455'}
                        opacity={valuePosts ? 0.5 : 1}
                        onPress={onSubmit}
                    />
                </View>
                {/* toolbar-start */}

                {/* profile-start */}

                <View style={styles.userContainer}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    <Text style={styles.nameUser}>{user.fullname}</Text>
                </View>

                {/* profile-end */}


                {/* form-start */}

                <TextInput
                    autoCapitalize='words'
                    multiline={true}
                    numberOfLines={4}
                    placeholder='Bạn đang nghĩ gì ?'
                    style={styles.input}
                    value={valuePosts.content}
                    onChangeText={OnChangeTextValuePosts}
                />
                {/* form-end */}

            </View>
        </Modal>
    )
}

export default ModalCreatPosts

const styles = StyleSheet.create({
    container: {

    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 30,
        marginEnd: 10
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    nameUser: {
        color: '#000',
        fontSize: 18,
        fontWeight: "600"
    },
    toolbar: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    title: {
        fontSize: 20,
        color: "#000",
        fontWeight: '500'
    },
    buttonSubmit: {
        width: 70,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 5
    },
    input: {
        paddingHorizontal: 10,
        fontSize: 15
    }
})