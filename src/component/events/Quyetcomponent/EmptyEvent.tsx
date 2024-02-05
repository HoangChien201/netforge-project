import { View, ScrollView, Animated, StyleSheet, Image, Text, ImageProps, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'

interface EventItemProps {
  image: ImageProps,
  name: string,
  participants: Array<ImageProps>,
  address: string
}
const View1: React.FC = () => (
  <View style={styles.emptyEvent}>
    <View style={styles.imgaeEmpty}>
      <Image style={styles.iconEmpty} source={require('../Quyetcomponent/img/schedule.png')} />
    </View>
    <View style={styles.emptyEventText}>
      <Text style={styles.emptyEventText1}>No Upcoming Event</Text>
      <Text style={styles.emptyEventText2}>Lorem ipsum dolor sit amet, consectetur </Text>
    </View>
  </View>
);
const View2: React.FC<EventItemProps> = ({ image, name, participants, address }) => (
  <View style={styles.emptyEvent}>
    <View style={styles.imgaeEmpty}>
      <Image style={styles.iconEmpty} source={require('../Quyetcomponent/img/schedule.png')} />
    </View>
    <View style={styles.emptyEventText}>
      <Text style={styles.emptyEventText1}>No Upcoming Event</Text>
      <Text style={styles.emptyEventText2}>Lorem ipsum dolor sit amet, consectetur </Text>
    </View>
  </View>
);
const EVENTS: React.FC = () => {
  const [data, setData] = useState();
  useEffect(() => {
    // Replace this with your actual data fetching logic
    // For demonstration, setting a sample value after a delay
    const fetchData = async () => {
      // Simulating an API call
      const response = await new Promise<EventItemProps>((resolve) =>
        setTimeout(() => resolve({
          image: { source: { uri: 'https://example.com/image.jpg' } },
          name: 'Event Name',
          participants: [],
          address: 'Event Address',
        }), 2000)
      );

  setData(response);
};

fetchData();
  }, []);
return (
  <View>
    {data ?  <View2 {...data} />: <View1 />}
  </View>
);

}
const PASSED_EVENTS: React.FC = () => {
  return <View style={styles.emptyEvent}>
    <View style={styles.imgaeEmpty}>
      <Image style={styles.iconEmpty} source={require('../Quyetcomponent/img/schedule.png')} />
    </View>
    <View style={styles.emptyEventText}>
      <Text style={styles.emptyEventText1}>No Upcoming Event</Text>
      <Text style={styles.emptyEventText2}>Lorem ipsum dolor sit amet, consectetur </Text>
    </View>
  </View>
};

const [page, setPage] = useState('ViewA');
const SettingsScreen: React.FC = () => {
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
        <Image style={styles.backIcon} source={require('./img/arrow-left.png')} />
        <Text style={styles.titleHeader}>EVENT</Text>
        <View style={styles.bookmark}>
          <Image style={styles.bookmarkIcon} source={require('./img/Path_33968.png')} />
        </View>

      </View>
      {/*Button Sự kiện sắp tới - Sự kiện đã qua */}
      <View style={[styles.fixedView,]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.upcommingBtn} onPress={showViewA}>
            <Text style={styles.upcommingText}>UPCOMMING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.upcommingBtn} onPress={showViewB}>
            <Text style={styles.upcommingText}>PASTEVENT</Text>
          </TouchableOpacity>
        </View>
      </View>
      {page === 'ViewA' && <EVENTS />}
      {page === 'ViewB' && <PASSED_EVENTS />}
      <View style={styles.overlay}></View>
      <View style={styles.buyticketBtn}>
        <Text style={styles.buyTicketText}>EXPLORE EVENTS</Text>
      </View>

    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF'
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