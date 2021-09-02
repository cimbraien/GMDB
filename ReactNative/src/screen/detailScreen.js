import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { SearchBar } from 'react-native-elements';
import ReviewForm from '../component/ReviewForm';
import DetailCard from '../component/DetailCard';

function detailScreen(props) {
  
  // console.log(props.route.params.item)
  return (

    <View style={{ backgroundColor:'black',flex: 1}}>

      <SearchBar placeholder="Search movies" round='true' containerStyle={{ backgroundColor: 'black' }} inputContainerStyle={{ backgroundColor: 'white' }} />
      <DetailCard
        title={props.route.params.item.title}
        overview={props.route.params.item.overview}
        release={props.route.params.item.release_date}
        poster={props.route.params.item.poster_path}
        vote={props.route.params.item.vote_count}
        onClickIcon={() => props.navigation.navigate('ReviewAll')} />
      
    </View>
  );
}

export default detailScreen;