import axios from "axios";
import {
  BASE_URL_ME_GMDB,
  GET_USER_BEGIN,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
} from "./types";

export const getUser = (Token) => async (dispatch) => {
  dispatch({
    type: GET_USER_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(`${BASE_URL_ME_GMDB}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    dispatch({
      type: GET_USER_SUCCESS,
      loading: false,
      payload: res.data,
      error: null,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_FAIL,
      error: err.response,
    });
  }
};
