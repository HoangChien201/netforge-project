import { View, ScrollView, Animated, StyleSheet, Image, Text, ImageProps, TouchableOpacity, FlatList } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'

interface ItemRenderProp {
  id?: number,
  image?: ImageProps,
  name: string,
  status: string,
  minute: string
}
const ItemRender: React.FC<ItemRenderProp> = ({ image, name, status, minute }) => {

  return (
    <TouchableOpacity style={styles.containerUser}>
      <Image style={styles.imageUser} source={image} />
      <View style={styles.containerText}>
        <View style={styles.ConStatus}>
          <View style={styles.location}>
            <Image style={styles.imgTime} source={require('../../../../media/quyet_icon/Location.png')} />
            <Text style={styles.Status}>{status}</Text>
          </View>
          <Text style={styles.NameUser}>{name}</Text>
          <View style={styles.location}>
            <Image style={styles.imgTime} source={require('../../../../media/quyet_icon/Location.png')} />
            <Text style={styles.textTime}>{minute}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

}
const ListEventsUpcomming = ({ EVENTS }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={EVENTS}
        renderItem={({ item }) => {
          return (
            <ItemRender image={item.image} name={item.name} status={item.status} minute={item.minute} />
          )
        }}
        keyExtractor={item => item.id.toString()} />
    </View>
  )
}

export default ListEventsUpcomming

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10

  },
  location: {
    flexDirection: 'row',
    alignItems:'center'
  },
  imgTime: {
    height: 14,
    width: 14,
    marginEnd:2
  },
  imageUser: {
    width: 80,
    height: 80,
    marginStart: 4
  },
  containerUser: {
    height: 106,
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white'

  },
  containerText: {
    flexDirection: 'row',
    width: 268,
    height: '100%',
    textAlign: 'center',
    alignItems: 'center'
  },
  NameUser: {
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
    lineHeight: 18.23,


  },
  Status: {
    fontSize: 14,
    color: '#3C3E56',
    lineHeight: 23,
  },
  textTime: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18.23,
    color: '#3C3E56',

  },
  ConStatus: {
    flexDirection: 'column',
    marginStart: 10,
    justifyContent: 'space-between',
    height: '80%',

  }
});