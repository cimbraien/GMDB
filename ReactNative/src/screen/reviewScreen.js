
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
import ReviewCardUser from '../component/ReviewCardUser';

const reviewScreen = () => {
  return (
    <ScrollView>
      <View style={{ backgroundColor: 'black' }}>
        <ReviewCardUser/>
      </View>
    </ScrollView>
  )
};

export default reviewScreen