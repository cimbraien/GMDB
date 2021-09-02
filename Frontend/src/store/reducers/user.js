import {
  GET_USER_BEGIN,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
} from "../actions/types";

const initialState = {
  user: [],
  loading: false,
  error: null,
  isLogin: true,
};
const reducerUser = (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    default:
      return {
        ...state,
      };
    case GET_USER_BEGIN:
      return {
        ...state,
        loading: true,
        isLogin: true,
      };
    case GET_USER_SUCCESS:
      return {
        user: payload,
        loading: false,
        error: null,
      };
    case GET_USER_FAIL:
      return {
        user: [],
        loading: false,
        error: error,
      };
  }
};
export default reducerUser;
