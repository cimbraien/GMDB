import {
  GET_REVIEW_BEGIN,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  CHANGE_REVIEW_BEGIN,
  CHANGE_REVIEW_SUCCESS,
  CHANGE_REVIEW_FAIL,
} from "../actions/types";

const initialState = {
  review: [],
  loading: false,
  error: null,
};
const reducerReview = (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    default:
      return {
        ...state,
      };
    case GET_REVIEW_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_REVIEW_SUCCESS:
      return {
        ...state,
        review: payload,
        loading: false,
        error: null,
      };
    case GET_REVIEW_FAIL:
      return {
        review: [],
        loading: false,
        error: error,
      };
    case CHANGE_REVIEW_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CHANGE_REVIEW_FAIL:
      return {
        review: [],
        loading: false,
        error: error,
      };
  }
};
export default reducerReview;
