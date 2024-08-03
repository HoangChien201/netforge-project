import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { FriendType } from './ModalNewMessage'
import { removeDiacritics } from './format/Diacritics'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLOR } from '../../constant/color'
import MemberCreateGroup from './MemberCreateGroup'

const NewGroupComponent = ({ suggests,setMembers,setNameGroup,nameGroup,members }: { suggests: Array<FriendType>,setMembers:any,setNameGroup:any,nameGroup:string,members:any }) => {
    const [keywordTo, setKeywordTo] = useState('')

    function RemoveMemberCreate(id:number){
        setMembers(prev=> {
            const membersFilter= prev.filter(id_m=>id_m != id)
            return membersFilter;
        })
    }

    function OptionHorizontal({ id,image, text, onPress }: {id:number, image: any, text: string, onPress?: any }) {
        const actived=members.find(id_m=>id_m === id)
        function IconOnPress(){
            if(actived){
                RemoveMemberCreate(id)
                return
            }

            setMembers(prev=>[...prev,id])
        }
        return (
            <TouchableOpacity activeOpacity={0.6} style={styles.optionHorizontal} onPress={IconOnPress}>
                <Image source={typeof image === 'string' ? { uri: image } : image} style={{ width: 40, height: 40, borderRadius: 40 }} />
                <Text style={{ color: "#000", fontSize: 16, fontWeight: '600', marginStart: 10 }}>{text}</Text>
                <View style={styles.icon}>
                    <Ionicons name={actived ? 'checkmark-circle' : 'checkmark-circle-outline'} size={24} color={ actived ? COLOR.PrimaryColor : '#ccc'}/>
                </View>
            </TouchableOpacity>
        )
    }


    function SuggestItemOnPress(id: string) {
        const id_user = parseInt(id)

    }

    function OnChangeTextSearch(text: string) {
        setKeywordTo(text)
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchWrapper}>
                <TextInput
                    value={nameGroup}
                    onChangeText={(text) => setNameGroup(text)}
                    style={styles.input}
                    placeholder='Tên nhóm'
                />
            </View>
            <View style={styles.searchWrapper}>
                <TextInput
                    value={keywordTo}
                    onChangeText={OnChangeTextSearch}
                    style={[styles.input, { backgroundColor: 'rgba(215,215,215,.5)' }]}
                    placeholder='Tìm kiếm'
                />
            </View>
            <MemberCreateGroup members={members} friends={suggests} remove={RemoveMemberCreate}/>

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
                                id={id}
                                onPress={SuggestItemOnPress.bind(this, id.toString())}
                            />
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </View>
        </View>
    )
}

export default NewGroupComponent

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,

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
        marginVertical: 5,
        alignItems: 'center'
    },
    input: {
        width: '100%',
        borderRadius: 10,
        padding: 10,
    },
    icon:{
        position:"absolute",
        right:20
    }
})