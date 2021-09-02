import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* getMovie(action) {
    // console.log (action.value)
    try {
        const resMovie = yield axios.get("https://api.themoviedb.org/3/movie/popular?api_key=1e38bb29c52806c0d87d4319f69486a9&language=en-US&page=1")
        console.log(resMovie)
        yield put({type: 'GET_MOVIE_SUCCESS', data: resMovie.data.results })
        
        
    } catch (err) {
        console.log(err);
    }
}

function* homeSaga() {
    yield takeLatest('GET_MOVIE', getMovie)
}

export default homeSaga;