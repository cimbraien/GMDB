import {
  GET_MOVIES_BANNER_BEGIN,
  GET_MOVIES_BANNER_FAIL,
  GET_MOVIES_BANNER_SUCCESS,
} from "../actions/types";

const initialState = {
  playing: [],
  loading: false,
  error: null,
};

const reducerMovieBanner = (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    default:
      return {
        ...state,
      };
    case GET_MOVIES_BANNER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIES_BANNER_SUCCESS:
      return {
        playing: payload,
        loading: false,
        error: null,
      };
    case GET_MOVIES_BANNER_FAIL:
      return {
        playing: [],
        loading: false,
        error: error,
      };
  }
};
export default reducerMovieBanner;
