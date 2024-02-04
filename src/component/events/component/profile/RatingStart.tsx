import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AirbnbRating, Rating} from 'react-native-ratings';

const RatingStart = () => {
  return (
    <View style={styles.container}>
      <AirbnbRating
        // reviews={['Poor', 'Very Bad', 'Bad', 'Ok', 'Good']}
        reviews={['']}
        count={5}
        defaultRating={0}
        selectedColor="yellow"
        size={20}
        reviewSize={0}
        showRating={false}
        // unSelectedColor="lightgray"
        // reviewColor="yellow"
        //ratingContainerStyle={{marginVertical: 0}}
        // isDisabled
        // starContainerStyle={{ backgroundColor:"red" }}
        // starImage={require('../../../../media/icon/star.png')}
        // onFinishRating={(rating) => alert(rating)}
      />

      {/* <Rating //rating thập phân
        type="star" // heart, star, bell, rocket
        ratingCount={5}
        showRating={true}
        ratingTextColor="red"
        // readonly
        // showReadOnlyText={false}
        fractions={1} // 0-20
        jumpValue={0.5}
        startingValue={0}
      /> */}
    </View>
  );
};

export default RatingStart;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
});
