import React, { useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import UpLoadAvatar from './UploadAvatar';
import { COLOR } from '../../constant/color';
import UploadBanner from './UploadBanner';

interface HeaderBannerProps {
  value: any;
  userId:any;
  setLoadingPost?: (val?: boolean) => void;
}

const HeaderBanner: React.FC<HeaderBannerProps> = ({ value, userId,setLoadingPost}) => {
    const [avatarPath, setAvatarPath] = useState<string>('');
    const [backgroundPath, setBackgroundPath] = useState<string>('');
    const handleImageSelect = (imagePath: string) => {
    setAvatarPath(imagePath);
    setBackgroundPath(imagePath);
    };

    const handleImageSelectBck = (imagePath: string) => {
      setBackgroundPath(imagePath);
      };

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height:200,
          width:'100%',
          backgroundColor: COLOR.PrimaryColor,
        },
      ]}
    >

      <Animated.View style={styles.backgroundContainer}>
        <UploadBanner initialImage={avatarPath} onImageSelect={handleImageSelectBck} userId={userId} />
      </Animated.View>
      <Animated.View style={[styles.avatar]}>
        <UpLoadAvatar setLoadingPost={setLoadingPost} initialImage={avatarPath} onImageSelect={handleImageSelect} userId={userId}/>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  avatar: {
    position: 'absolute',
    left: 20,
    top: 120,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  backgroundContainer: {
    width:'100%',
    height:200
  }
});

export default HeaderBanner;
