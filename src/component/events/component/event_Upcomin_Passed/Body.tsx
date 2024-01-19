import { View, ScrollView, Animated, StyleSheet, Image, Text, ImageProps, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import EmptyEventPassed from './EmptyEventPassed'
import ListEventsPassed from './ListEventsPassed'
import ListEventsUpcomming from './ListEventsUpcomming'
import EmptyEventUpcomming from './EmptyEventUpcomming'
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
const EVENTS: Array<CategoryEntity> = [
  {
    id: 1,
    image: require('../../../../media/quyet_icon/schedule.png'),
    name: 'Tên sự kiện',
    status: 'Thời gian',
    minute: 'Địa điểm',
  },
  {
    id: 2,
    image: require('../../../../media/quyet_icon/schedule.png'),
    name: 'Tên sự kiên 1',
    status: 'Thời gian 1',
    minute: 'Địa điểm 1',
  },
  {
    id: 3,
    image: require('../../../../media/quyet_icon/schedule.png'),
    name: 'Thời gian 2',
    status: 'Tên sự kiên 2',
    minute: 'Địa điểm 2',
  }
];
type CategoryEntity = {
  id: number,
  image: ImageProps,
  name: string,
  status: string,
  minute: string
}
const UPCOMMING: React.FC = () => {
  const [data, setData] = useState(null);
  return (
    <View>
      {EVENTS ? <ListEventsUpcomming EVENTS={EVENTS} />: <EmptyEventUpcomming />}
    </View>
  );

}
const PASSED: React.FC = () => {
  const [data, setData] = useState(null);
  return (
    <View>
    {data ? <ListEventsPassed /> : <EmptyEventPassed />}
  </View>
  )
};

const SettingsScreen: React.FC = () => {
  const [page, setPage] = useState('ViewA');
  const showViewA = () => {
    setPage('ViewA');
  };
  const showViewB = () => {
    setPage('ViewB');
  };
  return (
    <View style={styles.container}>
      {/* Header - Back - Title - three dot */}
      <View style={styles.headerViewStyle}>
        <Image style={styles.backIcon} source={require('../../../../media/quyet_icon/arrow-left.png')} />
        <Text style={styles.titleHeader}>EVENT</Text>
        <View style={styles.bookmark}>
          <Image style={styles.bookmarkIcon} source={require('../../../../media/quyet_icon/Path_33968.png')} />
        </View>

      </View>
      {/*Button Sự kiện sắp tới - Sự kiện đã qua */}
      <View style={[styles.fixedView,]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style ={page === 'ViewA'? styles.upcommingBtn : styles.upcommingBtn1 } onPress={showViewA}>
            <Text style ={styles.upcommingText}>UPCOMMING</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={page === 'ViewB'? styles.upcommingBtn : styles.upcommingBtn1 } onPress={showViewB}>
            <Text style={styles.upcommingText}>PASTEVENT</Text>
          </TouchableOpacity>
        </View>
      </View>
      {page === 'ViewA' && <UPCOMMING />}
      {page === 'ViewB' && <PASSED />}
      <View style={styles.overlay}></View>
      <TouchableOpacity style={styles.buyticketBtn}>
        <Text style={styles.buyTicketText}>EXPLORE EVENTS</Text>
      </TouchableOpacity>

    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex:1
  },
  iconEmpty: {
    height: 168,
    width: 168,
    zIndex: 1,
    marginTop: 30,
    marginStart: 15,
    resizeMode: 'cover',
  },
  imgaeEmpty: {
    width: 202,
    height: 202,
    backgroundColor: '#DADADA',
    borderRadius: 202,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  emptyEvent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  emptyEventText: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
  emptyEventText1: {
    color: '#120D26',
    fontFamily: 'Airbnb Cereal App',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 45
  },
  emptyEventText2: {
    color: '#120D26',
    fontFamily: 'Airbnb Cereal App',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25
  },
  upcommingText: {
    color: '#5669FF',
    fontFamily: 'Airbnb Cereal App',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25
  },
  upcommingBtn: {
    height: 35,
    width: 145,
    borderRadius: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  upcommingBtn1: {
    height: 35,
    width: 145,
    borderRadius: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    opacity:0.5
  },
  headerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
    paddingHorizontal: 16,
  },
  buyTicketText: {
    fontFamily: 'Airbnb Cereal App',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#FFFFFF',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Điều chỉnh mức độ mờ tùy ý
    height: '8%',
    bottom: 0,
    position: 'absolute',
    top: '92%',
  },
  buyticketBtn: {
    width: '80%',
    height: 58,
    backgroundColor: '#5669FF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
    marginStart: '10%',
    marginLeft: '10%'
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
    color: 'black',
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

  scrollViewContent: {
    paddingTop: 200,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingBottom: 80,
    width: '100%'

  },
  fixedView: {
    height: 45,
    width: '80%',
    backgroundColor: '#00000007',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

})