import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { COLOR } from '../../constant/color';
import Animated, { useSharedValue, runOnUI } from 'react-native-reanimated';

const ViewBottomSheet = () => {
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const reduceMotion = useSharedValue(1); // Sử dụng useSharedValue thay cho plain object

  useEffect(() => {
    // Chạy runOnUI trong useEffect để thiết lập giá trị ban đầu một cách an toàn
    runOnUI(() => {
      'worklet';
      reduceMotion.value = 1;
    })();
  }, []);

  const handClose = () => bottomSheetRef.current?.close();
  const handOpen = () => bottomSheetRef.current?.present();

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <TouchableOpacity onPress={handOpen}>
          <Text>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handClose}>
          <Text>Close</Text>
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
          style={styles.contentContainer}
          enablePanDownToClose={true}
        >
          <View style={styles.content}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
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

export default memo(ViewBottomSheet);
