import React, { useEffect, useState } from 'react';
import { FlatList, PermissionsAndroid, Platform, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemImg from '../component/storys/ItemImg';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { COLOR } from '../constant/color';
import { NetworkRootStackEnum } from '../component/stack/NetworkRootStackParams';

const CreateStoris = () => {
    const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
    const navigation:NavigationProp<ParamListBase> = useNavigation();
  
    useEffect(() => {
        const initialize = async () => {
            const granted = await hasAndroidPermission();
            if (granted) {
                getAllPhotos();
            }
        };

        initialize();
    }, []);
     
    const checkSelect = () => {
        navigation.navigate(NetworkRootStackEnum.CameraStory)
    };


    const getAllPhotos = async () => {
        try {
            const result = await CameraRoll.getPhotos({
                first: 20,
                assetType: 'Photos'
            });
            setPhotos(result.edges);
        } catch (err) {
            console.error('Error fetching photos:', err);
        }
    };

    const hasAndroidPermission = async (): Promise<boolean> => {
        const permission = Platform.Version as number >= 33 
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        return status === PermissionsAndroid.RESULTS.GRANTED;
    };

    return (
        <View style={styles.container}>
              <View style={{width:Dimensions.get('window').width,alignItems:'center',borderTopLeftRadius:40,borderTopRightRadius:40}}>
               
                <View style = {{flexDirection:'row',marginBottom:40}}>
                    <TouchableOpacity onPress={checkSelect} style={styles.button}>
                        <Ionicons name='camera-outline' color='#000' size={39}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate(NetworkRootStackEnum.StoryText)} style={styles.button}>
                        <Ionicons name='document-text-outline' color='#000' size={39}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.heading}>Thư viện </Text>
            <FlatList
                data={photos}
                renderItem={({ item,index }) => (
                <ItemImg navigation={navigation} item={item} index={index}/>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                ListEmptyComponent={<Text style={styles.emptyText}>Không có ảnh</Text>}
            />
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    heading: {
        color:'#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    photoContainer: {
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    photo: {
        width: '100%',
        aspectRatio: 1, // Đảm bảo ảnh có tỷ lệ vuông
    },
    emptyText: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 20,
    },
    button:{
        width:100,
        height:60,
        borderWidth:2,
        backgroundColor:"#fff",
        borderColor:'#000',
        marginHorizontal:15,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15
    }
});

export default CreateStoris;
