import {
  GET_MOVIES_BEGIN,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAIL,
  GET_MOVIE_DETAIL_BEGIN,
  GET_MOVIE_DETAIL_SUCCESS,
  GET_MOVIE_DETAIL_FAIL,
  SEARCH_BEGIN,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  CLEAR,
} from "../actions/types";

const initialState = {
  listMovie: {
    movie: [],
    loading: false,
    error: null,
  },
  detailMovie: {
    detail: [],
    loading: false,
    error: null,
  },
  searchResult: {
    result: [],
    loading: false,
    error: null,
  },
};

const reducerMovie = (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    default:
      return {
        ...state,
      };
    case GET_MOVIES_BEGIN:
      return {
        ...state,
        listMovie: {
          loading: true,
          error: null,
        },
      };
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        listMovie: {
          movie: payload,
          loading: false,
        },
      };
    case GET_MOVIES_FAIL:
      return {
        listMovie: {
          movie: [],
          loading: false,
          error: error,
        },
      };
    case GET_MOVIE_DETAIL_BEGIN:
      return {
        ...state,
        detailMovie: {
          loading: true,
          error: null,
        },
      };
    case GET_MOVIE_DETAIL_SUCCESS:
      return {
        ...state,
        detailMovie: {
          detail: payload,
          loading: false,
          error: null,
        },
      };
    case GET_MOVIE_DETAIL_FAIL:
      return {
        ...state,
        detailMovie: {
          detail: [],
          loading: false,
          error: error,
        },
      };
    case SEARCH_BEGIN:
      return {
        ...state,
        searchResult: {
          result: [],
          loading: true,
          error: null,
        },
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchResult: {
          result: payload,
          loading: false,
          error: null,
        },
      };
    case SEARCH_FAIL:
      return {
        ...state,
        searchResult: {
          result: [],
          loading: false,
          error: error,
        },
      };
    case CLEAR:
      return {
        ...state,
        result: [],
        loading: false,
        error: null,
      };
  }
};

export default reducerMovie;
