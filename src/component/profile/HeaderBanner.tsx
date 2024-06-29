import React, { useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import UpLoadAvatar from './UploadAvatar';
import { COLOR } from '../../constant/color';

interface HeaderBannerProps {
  value: any;
  //avatarPath: string;
  userId:any;
}

const HeaderBanner: React.FC<HeaderBannerProps> = ({value, userId}) => {
    const [avatarPath, setAvatarPath] = useState<string>('');
    const handleImageSelect = (imagePath: string) => {
    setAvatarPath(imagePath);
  };
  //console.log("HeaderBanner: ", userId)

  return (
    <Animated.View
      style={[
        styles.header,
        {
            height:160,
          backgroundColor: COLOR.PrimaryColor,
        },
      ]}
    >
      <Animated.View style={[styles.avatar]}>
        <UpLoadAvatar initialImage={avatarPath} onImageSelect={handleImageSelect} userId={userId}/>
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
    paddingTop: 25,
    zIndex: 1,
  },
  avatar: {
    position: 'absolute',
    left: 20,
    top: 80,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
});

export default HeaderBanner;
