import axios from "axios";
import { BASE_URL_MOVIE_GMDB } from "./types";
import {
  GET_MOVIE_DETAIL_BEGIN,
  GET_MOVIE_DETAIL_SUCCESS,
  GET_MOVIE_DETAIL_FAIL,
} from "./types";

export const getMovieDetail = (id) => async (dispatch) => {
  dispatch({
    type: GET_MOVIE_DETAIL_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(`${BASE_URL_MOVIE_GMDB}/${id}`);
    dispatch({
      type: GET_MOVIE_DETAIL_SUCCESS,
      loading: false,
      payload: res.data,
      error: null,
    });
  } catch (err) {
    dispatch({
      type: GET_MOVIE_DETAIL_FAIL,
      error: err,
    });
  }
};
