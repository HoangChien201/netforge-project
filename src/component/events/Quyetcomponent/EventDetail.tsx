import { View, ScrollView, Animated, StyleSheet, Image, Text, ImageProps, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'

interface EventItemProps {
  image: ImageProps,
  name: string,
  participants: Array<ImageProps>,
  address: string
}
const SettingsScreen: React.FC<EventItemProps> = (props) => {
  const { image, name, participants, address } = props
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollY(offsetY);
  };
  // Chuyển màu nền header
  const headerViewStyle = {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
    paddingHorizontal: 16,
    backgroundColor: scrollY > 0 ? 'darkgrey' : 'transparent',
    opacity: scrollY > 0 ? 0.5 : 1,
  };
  // làm mờ Invite members
  const inviteViewStyle ={
    height: 60,
    width: '80%',
    backgroundColor: '#FEFEFF',
    borderRadius: 30,
    elevation: 5, // Độ nâng cao, sử dụng để tạo shadow
    shadowColor: '#5A5A5A',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: -20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
    opacity: scrollY > 0 ? 0.5 : 1,
  }
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >

        <View style={[styles.headerImg, { height: 200 - scrollY }]}>
          <Image source={image} style={{ width: '100%', height: '100%' }} />

        </View>
        {/* Những người tham gia */}
        <View style={[styles.fixedView,{opacity: 1 - scrollY*0.01 }]}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={require('./img/Calendar.png')} style={styles.avatarMember1} />
              <Image source={require('./img/Calendar.png')} style={styles.avatarMember2} />
              <Image source={require('./img/Calendar.png')} style={styles.avatarMember3} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.numberInviteText}>
              +20
            </Text>
            <Text style={styles.numberInviteText}>
              Going
            </Text>
          </View>

          <TouchableOpacity style={styles.inviteBtn}>
            <Text style={styles.inviteText}>Invite</Text>
          </TouchableOpacity>
        </View>
        {/* Thông tin sự kiện */}
        <View style={styles.aboutEvent}>
          <Text style={styles.titleEvent}>International Band Music Concert</Text>
          {/* Thời gian sự kiện */}
          <View style={styles.timeEvent}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.iconAboutEvent} />
              <Image source={require('./img/Calendar.png')} style={styles.icon} />
            </View>
            <View style={styles.time}>
              <Text style={styles.text1}>14 December, 2021 </Text>
              <Text style={styles.text2}>Tuesday, 04:00 PM - 09:00 PM</Text>
            </View>
          </View>
          {/* Địa điểm sự kiện */}
          <View style={styles.timeEvent}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.iconAboutEvent} />
              <Image source={require('./img/Location.png')} style={styles.icon} />
            </View>
            <View style={styles.time}>
              <Text style={styles.text1}>Gala Convention Center</Text>
              <Text style={styles.text2}>36 Guild Street London, UK </Text>
            </View>
          </View>
          {/* Tác giả bài viết */}
          <View style={styles.userEvent}>
            <View style={styles.userInfor} >
              <View style={styles.avatarAboutUser}>
                <Image source={require('./img/Location.png')} />
              </View>
              <View style={styles.time}>
                <Text style={styles.text1}>Ashfak Sayem</Text>
                <Text style={styles.text2}>Organizer</Text>
              </View>
            </View>

            <View style={styles.btnFollow} >
              <View style={styles.btnFollowBG} />
              <Text style={styles.followText}>follow</Text>
            </View>


          </View>

          {/* Nội dung bài viết */}
          <View style={styles.Text} >
            <Text style={styles.text1}>About Event</Text>
            <Text style={styles.mainText}>
              Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Read More...
            </Text>
          </View>
          {/* Nội dung bài viết */}
          <View style={styles.Text} >
            <Text style={styles.text1}>About Event</Text>
            <Text style={styles.mainText}>
              Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Read More...
            </Text>
          </View>
          {/* Nội dung bài viết */}
          <View style={styles.Text} >
            <Text style={styles.text1}>About Event</Text>
            <Text style={styles.mainText}>
              Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Read More...
            </Text>
          </View>
        </View>

      </ScrollView>
      <View style={styles.overlay}></View>
      <View style={styles.buyticketBtn}>
        <Text style={styles.buyTicketText}>BUY TICKET</Text>
      </View>

      {/* Header - Back - Title - bookmark */}
      <View style={headerViewStyle}>
        <Image style={styles.backIcon} source={require('./img/arrow-left.png')} />
        <Text style={styles.titleHeader}>EVENT DETAIL</Text>
        <View style={styles.bookmark}>
          <Image style={styles.bookmarkIcon} source={require('./img/Path_33968.png')} />
        </View>

      </View>

    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
  },
  buyTicketText:{
    fontFamily: 'Airbnb Cereal App',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#FFFFFF',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Điều chỉnh mức độ mờ tùy ý
    height:'8%',
    bottom:0,
    position:'absolute',
    top:'92%',
  },
  buyticketBtn:{
    width: '80%',
    height:58,
    backgroundColor:'#5669FF',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:5,
    marginStart:'10%',
    marginLeft:'10%'
  },
  avatarMember1:{
    height:35,
    width:35,
    borderRadius:35,
    backgroundColor:'green',
    zIndex:3
  },
  avatarMember2:{
    height:35,
    width:35,
    borderRadius:35,
    backgroundColor:'gray',
    zIndex:2,
    margin:-10,
  },
  avatarMember3:{
    margin:-5,
    height:35,
    width:35,
    borderRadius:35,
    backgroundColor:'red',
    zIndex:1
  },
  numberInviteText: {
    fontFamily: 'Airbnb Cereal App',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#3F38DD',
    marginStart: 2
  },
  inviteText: {
    fontFamily: 'Airbnb Cereal App',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#FFFFFF'
  },
  inviteBtn: {
    backgroundColor: '#5669FF',
    height: 34,
    width: 67,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bookmark: {
    justifyContent: 'center',
    height: 36,
    width: 36,
    backgroundColor: '#FFFFFF4D',
    borderRadius: 10,
    alignItems: 'center'
  },
  backIcon: {
    height: 26,
    width: 26,
  },
  bookmarkIcon: {
    height: 22,
    width: 22,
  },
  titleHeader: {
    color: '#FFFFFF',
    fontFamily: 'Airbnb Cereal App',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 28
  },
  header: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: 16,
  },
  Text: {
    paddingTop: 20
  },
  mainText: {
    color: '#120D26',
    fontFamily: 'Airbnb Cereal App',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 28
  },
  userInfor: {
    flexDirection: 'row'
  },
  followText: {
    color: '#5669FF',
    position: 'absolute',
    fontFamily: 'Airbnb Cereal App',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',

  },
  btnFollow: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  headerImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    backgroundColor: 'blue',

  },
  scrollViewContent: {
    paddingTop: 200,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingBottom:80

  },
  fixedView: {
    height: 60,
    width: '80%',
    backgroundColor: '#FEFEFF',
    borderRadius: 30,
    elevation: 5, // Độ nâng cao, sử dụng để tạo shadow
    shadowColor: '#5A5A5A',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: -20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center'
  },
  timeEvent: {
    flexDirection: 'row',
    paddingTop: 20
  },
  userEvent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20
  },
  aboutEvent: {

  },
  time: {
    justifyContent: 'space-between',
    marginStart: 10
  },
  titleEvent: {
    fontFamily: 'Airbnb Cereal App',
    fontSize: 35,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#120D26'

  },
  iconAboutEvent: {
    height: 48,
    width: 48,
    padding: 9,
    backgroundColor: '#5669FF',
    opacity: 0.12,
    borderRadius: 12,
  },
  avatarAboutUser: {
    height: 48,
    width: 48,
    padding: 9,
    backgroundColor: '#5669FF',
    borderRadius: 12,
  },
  text1: {
    fontFamily: 'Airbnb Cereal App',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 34,
    color: '#120D26'
  },
  text2: {
    fontFamily: 'Airbnb Cereal App',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#747688'
  },
  icon: {
    height: 30,
    width: 30,
    opacity: 1,
    position: 'absolute',

  },
  btnFollowBG: {
    width: 60,
    height: 28,
    borderRadius: 7,
    opacity: 0.12,
    backgroundColor: '#5669FF'
  }
})