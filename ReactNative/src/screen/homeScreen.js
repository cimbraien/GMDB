
import React, { useState, useEffect } from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import HomeCard from '../component/HomeCard';
import axios from 'axios';
import { connect } from 'react-redux';

const Homescreen = (props) => {
    const urlPop = "https://api.themoviedb.org/3/movie/popular?api_key=1e38bb29c52806c0d87d4319f69486a9&language=en-US&page=1"
    const urlTren = "https://api.themoviedb.org/3/trending/all/day?api_key=1e38bb29c52806c0d87d4319f69486a9"
    const [popular, setPopular] = useState([]);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genre, setGenre] = useState('Action')



    
    useEffect(() => {
        props.getMovie()
    }, [])

    const handleDetail = (item) => {
        props.navigation.navigate('Detail', { item })
    }

    const changeGenreRomance = () => {
        setGenre('Romance')
    }

    const changeGenreThriller = () => {
        setGenre('Thriller')
    }

    const changeGenreComedy = () => {
        setGenre('Comedy')
    }

    const changeGenreAction = () => {
        setGenre('Action')
    }

    return (
        <ScrollView>
            <View style={{ backgroundColor: 'black' }}>
                <SearchBar placeholder="Search movies" round='true' containerStyle={{ backgroundColor: 'black', }} inputContainerStyle={{ backgroundColor: 'white', }} />
                <View style={{ padding: 5, justifyContent: 'space-between', flexDirection: 'row', }}>
                    <Text style={{ color: 'white' }}>Best Genre</Text>
                    <TouchableOpacity><Text style={{ color: 'white' }}>more {'>>'}</Text></TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'space-around', flexDirection: 'row', padding: 10, flexWrap: 'wrap', display: 'flex' }}>
                    <TouchableOpacity style={styles.genre} onPress={() => changeGenreAction()}>
                        <Icon name="film" size={20} color="black" />
                        <Text style>Action</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.genre} onPress={() => changeGenreRomance()}>
                        <Icon name="film" size={20} color="black" />
                        <Text>Romance</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.genre} onPress={() => changeGenreThriller()}>
                        <Icon name="film" size={20} color="black" />
                        <Text>Thriller</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.genre} onPress={() => changeGenreComedy()}>
                        <Icon name="film" size={20} color="black" />
                        <Text>Comedy</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'white', padding: 10 }}>Hot {genre} Movies</Text>
                {/* <TouchableOpacity onPress={() => handleDetail()}>
                    <HomeCard title={popular[0].title}
                            overview={popular[0].overview}
                            release={popular[0].release}
                            poster={popular[0].poster_path}/>
                </TouchableOpacity> */}
                {props.reduxMovie.map((item, index) => (
                    <TouchableOpacity onPress={() => handleDetail(item)}>
                        <HomeCard
                            id={index}
                            title={item.title}
                            overview={item.overview}
                            release={item.release_date}
                            poster={item.poster_path}
                            vote={item.vote_count}
                            onClickIcon={()=>props.navigation.navigate('ReviewAll')}
                        />
                    </TouchableOpacity>
                ))}

            </View>
        </ScrollView>
    )
};

const mapStateToProps = (state) => {
    console.log (state)
    return ({
        reduxMovie: state.movie.dataMovie
    })
}

const mapDispatchToProps = (dispatch) => ({
    getMovie: (data) => dispatch({ type: 'GET_MOVIE' })
})



export default connect(mapStateToProps, mapDispatchToProps)(Homescreen)

const styles = StyleSheet.create({
    genre: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 6,
        padding: 5,
    }
})