import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { formattedDate } from '../../format/FormatDate';

const ProfileDetailData = ({ userData }: { userData: any }) => {
  const allDataNull = !userData.address && !userData.phone && !userData.gender && !userData.dateOfBirth;
  return (
    <View style={styles.profileUser}>
    <View style={{ flex: 1 }}>
      <Text style={styles.txtChiTiet}>Chi tiết</Text>
      {!allDataNull && (
        <>
          {userData.address && (
            <View style={[styles.row, { marginTop: 10 }]}>
              <Icon name="location-outline" size={18} color="#000" style={styles.icon} />
              <Text style={[styles.detail, { flex: 1 }]} numberOfLines={2}>{userData.address}</Text>
            </View>
          )}
          {userData.phone && (
            <View style={styles.row}>
              <Icon name="phone-portrait-outline" size={18} color="#000" style={styles.icon} />
              <Text style={styles.detail}>{userData.phone}</Text>
            </View>
          )}
          {userData.gender && (
            <View style={styles.row}>
              <Icon name="male-female-outline" size={18} color="#000" style={styles.icon} />
              <Text style={styles.detail}>{userData.gender}</Text>
            </View>
          )}
          {userData.dateOfBirth && (
            <View style={[styles.row]}>
              <Icon name="calendar-outline" size={18} color="#000" style={styles.icon} />
              <Text style={styles.detail}>Ngày sinh {formattedDate(userData.dateOfBirth)}</Text>
            </View>
          )}
        </>
      )}
      {allDataNull && (
        <>
          <Text style={styles.noDataText}>Hãy cập nhật thông tin để mọi người có thể hiểu thêm về bạn!</Text>
          {/* <View style={{ borderWidth: 0.7, borderColor: '#ddd'}}></View> */}
        </>
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
    paddingTop:5,
    marginBottom:10
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
    color: '#000',
    marginBottom:5
    
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
  },
  noDataText: {
    fontStyle: 'italic',
    color: '#888',
    marginTop: 10,
    fontSize:16,
    marginVertical:15
  }
});
