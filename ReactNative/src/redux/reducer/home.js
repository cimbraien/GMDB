const initialState = {
    dataMovie: [],
    isLoading: false
}

const movie = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_MOVIE' :
            return {
                ...state,
                isLoading: true
            }
        case 'GET_MOVIE_SUCCESS' :
            return {
                ...state,
                dataMovie: action.data,
                isLoading: false
            }
        default :
            return state;
    }
}

export default movie;