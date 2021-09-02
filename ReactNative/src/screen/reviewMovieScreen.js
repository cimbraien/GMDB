
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import ReviewCardAll from '../component/ReviewCardAll';
import ReviewCardUser from '../component/ReviewCardUser';

const reviewMovieScreen = () => {
  return (
    <ScrollView>
      <View style={{ backgroundColor: 'black' }}>
        <ReviewCardAll/>
      </View>
    </ScrollView>
  )
};

export default reviewMovieScreen