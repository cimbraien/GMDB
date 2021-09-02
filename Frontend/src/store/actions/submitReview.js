import axios from "axios";
import {
  SUBMIT_REVIEW_BEGIN,
  SUBMIT_REVIEW_SUCCESS,
  SUBMIT_REVIEW_FAIL,
  BASE_URL_REVIEW,
} from "./types";

export const addReview = (item) => async (dispatch) => {
  // const { item, token, id } = action;
  const nData = {
    headline: item.headline,
    content: item.reviews,
    rating: item.rating,
  };
  dispatch({
    type: SUBMIT_REVIEW_BEGIN,
    loading: true,
    error: null,
  });
  try {
    // eslint-disable-next-line no-unused-vars
    const res = await axios.post(`${BASE_URL_REVIEW}/${item.id}`, nData, {
      headers: {
        Authorization: `Bearer ${item.token}`,
      },
    });
    dispatch({
      type: SUBMIT_REVIEW_SUCCESS,
      loading: false,
      error: null,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: SUBMIT_REVIEW_FAIL,
      error: err.response,
    });
  }
};
