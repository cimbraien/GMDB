import axios from "axios";
import {
  CHANGE_REVIEW_BEGIN,
  CHANGE_REVIEW_SUCCESS,
  CHANGE_REVIEW_FAIL,
  BASE_URL_REVIEW,
} from "./types";

export const changeReview =
  ({ id, content, headline, rating }, callback) =>
  async (dispatch) => {
    // console.log(id, content, headline, rating);

    const token = localStorage.getItem("Token");
    dispatch({
      type: CHANGE_REVIEW_BEGIN,
      loading: true,
      error: null,
    });
    try {
      const res = await axios.put(
        `${BASE_URL_REVIEW}/${id}`,
        {
          content,
          headline,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      callback(res);

      // console.log(res);
      dispatch({
        type: CHANGE_REVIEW_SUCCESS,
        loading: false,
        error: null,
      });
    } catch (err) {
      dispatch({
        type: CHANGE_REVIEW_FAIL,
        error: err.response,
      });
    }
  };
