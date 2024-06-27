import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { formattedDate } from '../../format/FormatDate';

interface User {
  email: string;
  fullname: string;
  dateOfBirth: string | null;
  phone: number | null;
  address: string | null;
  avatar: string | null;
  gender: string | null;
}

const ProfileDetailData = ({ userData }: { userData: any }) => {
  return (
      <View style={styles.profileUser}>
        {/* {userData && userData.avatar && (
          <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        )} */}
        <View style={{ flex: 1 }}>
          <Text style={styles.txtChiTiet}>Chi tiết</Text>
          {userData && userData.address && (
            <View style={[styles.row, {marginTop:5}]}>
                <Icon name="location-outline" size={18} color="#000" style={styles.icon} />
              <Text style={[styles.detail, { flex: 1 }]} numberOfLines={2}>{userData.address}</Text>
            </View>
          )}
          {/* {userData && userData.email && (
            <View style={styles.row}>
                <Icon name="mail-outline" size={18} color="#000" style={styles.icon} />
              <Text style={styles.detail}>{userData.email}</Text>
            </View>
          )} */}
          {userData && userData.phone && (
            <View style={styles.row}>
                <Icon name="phone-portrait-outline" size={18} color="#000" style={styles.icon} />
              <Text style={styles.detail}>{userData.phone}</Text>
            </View>
          )}
          {userData && userData.gender && (
            <View style={styles.row}>
                <Icon name="male-female-outline" size={18} color="#000" style={styles.icon} />
              <Text style={styles.detail}>{userData.gender}</Text>
            </View>
          )}
          {userData && userData.dateOfBirth && (
            <View style={styles.row}>
                <Icon name="calendar-outline" size={18} color="#000" style={styles.icon} />
              <Text style={styles.detail}>Ngày sinh {formattedDate(userData.dateOfBirth)}</Text>
            </View>
          )}
        </View>
      </View>
  );
}

export default ProfileDetailData;

const styles = StyleSheet.create({
  profileUser: {
    height: 'auto',
    backgroundColor: '#fff',
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop:50
  },
  avatar: {
    height: 93,
    width: 93,
    marginRight: 16,
    borderRadius: 10
  },
  txtChiTiet: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000'
  },
  detail: {
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
    width: '100%',
    marginBottom:5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  icon: {
    marginRight: 8,
  }
});
