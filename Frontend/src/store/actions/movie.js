import axios from "axios";
import {
  GET_MOVIES_BEGIN,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAIL,
  BASE_URL_MOVIE_GMDB,
  SEARCH_BEGIN,
  SEARCH_FAIL,
  SEARCH_SUCCESS,
  CLEAR,
  BASE_URL_SEARCH_TITLE_GMDB,
  GET_MOVIES_BANNER_BEGIN,
  GET_MOVIES_BANNER_SUCCESS,
  GET_MOVIES_BANNER_FAIL,
} from "./types";

export const getMovie = (offset) => async (dispatch) => {
  dispatch({
    type: GET_MOVIES_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(`${BASE_URL_MOVIE_GMDB}?offset=${offset}`);
    dispatch({
      type: GET_MOVIES_SUCCESS,
      loading: false,
      payload: res.data,
      error: null,
    });
  } catch (err) {
    dispatch({
      type: GET_MOVIES_FAIL,
      error: err.response,
    });
  }
};

export const getMovieBanner = () => async (dispatch) => {
  dispatch({
    type: GET_MOVIES_BANNER_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(`${BASE_URL_MOVIE_GMDB}?offset=0&limit=5`);
    dispatch({
      type: GET_MOVIES_BANNER_SUCCESS,
      loading: false,
      payload: res.data,
      error: null,
    });
  } catch (err) {
    dispatch({
      type: GET_MOVIES_BANNER_FAIL,
      error: err.response,
    });
  }
};

export const searchItem = (body) => async (dispatch) => {
  dispatch({
    type: SEARCH_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(`${BASE_URL_SEARCH_TITLE_GMDB}${body}`);
    dispatch({
      type: SEARCH_SUCCESS,
      loading: false,
      payload: res.data,
      error: null,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_FAIL,
      error: err.response,
    });
  }
};

export const clearItem = () => {
  return {
    type: CLEAR,
  };
};
