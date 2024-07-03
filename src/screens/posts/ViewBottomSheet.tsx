import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { COLOR } from '../../constant/color';

const ViewBottomSheet = () => {
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <View style={styles.container}>
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheet>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLOR.primary300,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
});

export default ViewBottomSheet;
