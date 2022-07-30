import initialState from "./initial-state";
import {
  FETCH_FEED_DATA,
  FETCH_FEED_DATA_SUCCEEDED,
  FETCH_FEED_DATA_ERROR,
  UPDATE_FILTERS,
} from "./types";

const samplesReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_FEED_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FEED_DATA_SUCCEEDED:
      return {
        ...state,
        data: [
          ...state.data,
          ...payload.data,
        ],
        meta: {
          ...state.meta,
          ...payload.meta,
        },
        nextPage: ++state.nextPage,
        loading: false,
        error: false,
      };
    case FETCH_FEED_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default samplesReducer;
