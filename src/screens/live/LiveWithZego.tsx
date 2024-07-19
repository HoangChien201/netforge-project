import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMyContext } from '../../component/navigation/UserContext';
import { createNewPost } from '../../http/QuyetHTTP';

const LiveWithZego: React.FC = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
  }, []);
  
  const { user } = useMyContext();
  const name = user.fullname;
  const onJoinPress =  (isHost: boolean) => {
    //await createLivePost(liveID)
    navigation.navigate(isHost ? 'HostScreen' : 'AudienceScreen', {
      userID,
      userName: name,
      liveID,
    });
  };

  const [userID, setUserID] = useState('');
  const [liveID, setLiveID] = useState('');
  useEffect(() => {
    setUserID(String(Math.floor(Math.random() * 100000)));
    setLiveID(String(Math.floor(Math.random() * 10000)));
  }, []);

  const insets = useSafeAreaInsets();

  const createLivePost = async () => {
    try {
        const type = 2;
        const content = liveID
        const permission = 1;
        const newPost = await createNewPost({ type,  permission, content });
        console.log("live post", newPost);
        onJoinPress(true)


    } catch (error) {
        console.error('Error live post: ', error);
    }
};

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Text style={[styles.liveID, styles.leftPadding]}>Live ID:</Text>
      <TextInput
        placeholder="Nhập ID Live"
        style={[styles.input]}
        onChangeText={text => setLiveID(text.replace(/[^0-9A-Za-z_]/g, ''))}
        maxLength={4}
        value={liveID}
      />
      <View style={[styles.buttonLine, styles.leftPadding]}>
        <Button
          disabled={liveID.length === 0}
          title="Phát trực tiếp"
          onPress={() => onJoinPress(true)}
        />
        <View style={styles.buttonSpacing} />
        <Button
          disabled={liveID.length === 0}
          title="Xem trực tiếp"
          onPress={() => onJoinPress(false)}
        />
      </View>
      <View style={[styles.imageContainer, styles.leftPadding]}>
        <TouchableOpacity onPress={() => onJoinPress(false)}>
          <Image
            source={{ uri: user.avatar}}
            style={styles.thumbnail}
          />
          <Text style={styles.thumbnailText}>Bấm để xem trực tiếp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
  },
  buttonSpacing: {
    width: 13,
  },
  input: {
    height: 42,
    width: 305,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: '#333333',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 35,
    marginBottom: 20,
  },
  userID: {
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 27,
    paddingBottom: 12,
    paddingTop: 12,
    paddingLeft: 20,
  },
  liveID: {
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 10,
    marginTop: 30,
  },
  leftPadding: {
    paddingLeft: 35,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  thumbnail: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  thumbnailText: {
    fontSize: 16,
    color: '#000',
  },
});

export default LiveWithZego;
