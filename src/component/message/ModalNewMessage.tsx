import { Button, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React, { useEffect, useState } from 'react'
import { COLOR } from '../../constant/color'
import NewMessageComponent from './NewMessageComponent'
import NewGroupComponent from './NewGroupComponent'
import { getFriends } from '../../http/QuyetHTTP'
import { createGroupsHTTP, getMessageByGroupAPI } from '../../http/ChienHTTP'
import { MessageScreenNavigationProp } from '../../screens/message/MessageScreen'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'
export type FriendType = {
    id: number,
    status: number,
    user: {
        avatar: string,
        fullname: string,
        id: number,
        dateOfBirth:string
    },
    create_at: string
}
export const STATUS_FRIEND = 2
const ModalNewMessage = ({ visible, setVisible }: { visible: boolean, setVisible: any }) => {
    const [type, setType] = useState('message')
    const [suggests, setSuggest] = useState<Array<FriendType>>([])
    const [members, setMembers] = useState<Array<number>>([])
    const [nameGroup, setNameGroup] = useState('')

    const navigation: MessageScreenNavigationProp = useNavigation()
    const user = useSelector((state : RootState)=>state.user.value)

    function CancleHandle() {
        if (type === 'message') {
            setVisible(false)
            return
        }
        setType('message')

    }

    async function CreateGroupHandle() {
        const createGroup = {
            members:[...members,user?.id],
            name:nameGroup,
            type: 'group'
        }
        const group = await createGroupsHTTP(createGroup)
        if(group){
            setVisible(false);
            setMembers([]);
            setNameGroup('');
            setType('message');
            (async function getMessages() {
                const messsages = await getMessageByGroupAPI(group.id)
                navigation.navigate('MessageScreen', {
                    group_id: group.id,
                    fullname: group?.name ? group?.name : 'Group '+ group?.id ,
                    avatar: group?.image ,
                    messages: messsages,
                    members:group.members
                })
            })()
           
        }
        

    }

    async function getSuggest() {
        const friends: any = await getFriends(STATUS_FRIEND)
        if (!friends) return

        setSuggest(friends)
    }

    useEffect(() => {
        getSuggest()
    }, [])

    function EventPressOverModal(){
        setVisible(false)
        setType('message')
    }

    return (
        <Modal
            animationType='slide'
            visible={visible}
            transparent={true}
        >
            <Pressable
                onPress={(event) => event.target == event.currentTarget && EventPressOverModal()}
                style={[styles.modal]}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={CancleHandle}>
                            <Text style={styles.cancle}>Hủy</Text>
                        </TouchableOpacity>
                        {
                            type === 'group' &&
                            <TouchableOpacity onPress={CreateGroupHandle}>
                                <Text style={styles.create}>Tạo</Text>
                            </TouchableOpacity>

                        }
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>{
                                type === 'message' ?
                                    "Tin nhắn mới"
                                    :
                                    "Nhóm mới"
                            }</Text>
                        </View>

                    </View>
                    {
                        type === 'message' ?
                            <NewMessageComponent
                                setType={setType}
                                suggests={suggests}
                                setVisible={setVisible} />
                            :
                            <NewGroupComponent
                                suggests={suggests}
                                setMembers={setMembers}
                                setNameGroup={setNameGroup}
                                nameGroup={nameGroup}
                                members={members} />
                    }
                </View>
            </Pressable>

        </Modal >

    )
}

export default ModalNewMessage

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 30,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden'
    },
    modal: {
        flex: 1,

    },
    cancle: {
        color: COLOR.PrimaryColor,
        fontSize: 18,
        fontWeight: '600',
        position: "absolute",
        left: 20,
        zIndex: 99
    },
    titleWrapper: {
        alignItems: 'center',
        justifyContent: "center",
        width: '100%'
    },
    title: {
        color: '#000',
        fontSize: 20,
        fontWeight: '600',
    },
    header: {
        height: 60,
        backgroundColor: "fff",
        justifyContent: 'center',
    },
    create: {
        color: COLOR.PrimaryColor,
        fontSize: 18,
        fontWeight: '600',
        right: 20,
        zIndex: 99,
        position: "absolute",

    }
})