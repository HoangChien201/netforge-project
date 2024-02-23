import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { create } from 'react-test-renderer'
import ButtonText from '../../events/component/ui/ButtonText'
import { COLOR } from '../../../constant/color'
import { GetTimeComment } from '../../../format/FormatDate'
import { user as userRoot, userType } from '../../events/screens/ProfileScreen'
import { AcceptanceBrowsePostsHTTP, RejectBrowsePostsHTTP } from '../../../http/admin/BrowseHTTP'
import { useMyContext } from '../../navigation/UserContext'
export type PostsItemType = {
    id: number;
    content: string;
    image: string;
    event_id: number;
    user: number;
    like: number | null
    create_time: Date
}



const BrowsePostsItem = ({item,getBrowsePosts}:{item:PostsItemType,getBrowsePosts:any}) => {
    const {user} = useMyContext();
    async function OnRejectPosts() {
        await RejectBrowsePostsHTTP(item.id)
        getBrowsePosts()
    }

    async function OnAcceptancePosts() {
        await AcceptanceBrowsePostsHTTP(item.id)
        getBrowsePosts()
    }

    return (
        <View>

            <View style={styles.container}>
                <View style={[styles.flexRow, { marginVertical: 10 }]}>
                    <View style={[styles.flexRow, { marginEnd: 10 }]}>
                        {
                            user.avatar && <Image source={{ uri: user.avatar }} style={styles.imagePage} />
                        }

                        <Text style={[styles.namePage, styles.text, { color: '#000' }]}>{user.fullname}</Text>
                    </View>
                    <View style={styles.flexRow}>
                        {
                            <Image source={require('../../../media/icon/icon-hour-light.png')} />
                        }
                        <Text style={[styles.time, styles.text, { color: '#000' }]}>{GetTimeComment(item.create_time)}</Text>
                    </View>
                </View>
                {
                    item.image != null && <Image style={styles.imageFull} source={{ uri: item.image }} />
                }

                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.content} numberOfLines={2}>{item.content}</Text>
                    </View>
                </View>

                <View style={styles.controlBrowseContainer}>

                    <ButtonText
                        style={[styles.buttonReject, { backgroundColor: 'red' }]}
                        text='Từ chối'
                        textColor={'#fff'}
                        onPress={OnRejectPosts}
                    />
                    <ButtonText
                        style={[styles.buttonAcceptance, { backgroundColor: COLOR.primaryColor }]}
                        text='Chấp thuận'
                        textColor={'#fff'}
                        onPress={OnAcceptancePosts}
                    />

                </View>
            </View>
        </View>
    )
}

export default BrowsePostsItem

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        maxHeight: 450,
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden'
    },
    imageFull: {
        width: '100%',
        height: '60%',
        borderRadius: 12,

    },
    category: {
        color: '#4e4b66',
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 19.5,
        marginVertical: 5,
    },
    text: {
        fontFamily: 'poppins',
        lineHeight: 24,
        letterSpacing: 0.12,
    },
    content: {
        color: '#000',
        fontWeight: '400',
        fontSize: 16,
        padding: 10
    },
    namePage: {
        color: '#4e4b66',
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 19.5,
        marginStart: 5
    },
    imagePage: {
        width: 30,
        height: 30,
        borderRadius: 10
    },
    time: {
        color: '#4e4b66',
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 19.5,
        marginStart: 5
    },
    //
    controlBrowseContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        height: 44,
        marginVertical: 20
    },
    buttonReject: {
        width: '45%',
        height: 44,
        backgroundColor: 'red',
        borderRadius: 5
    },

    buttonAcceptance: {
        width: '45%',
        height: 44,
        backgroundColor: 'red',
        borderRadius: 5
    },

})