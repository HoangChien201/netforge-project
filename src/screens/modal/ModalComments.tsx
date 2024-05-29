import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useState, useRef } from 'react'

const ModalComments = () => {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['25%', '50%', '70%', '100%'], []);
  return (
    <View >
      <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose = {true}
        >

        <View>
            <Text>Helloo xin chao cac ban</Text>
        </View>
      </BottomSheet>
    </View>
  )
}

export default ModalComments

const styles = StyleSheet.create({})