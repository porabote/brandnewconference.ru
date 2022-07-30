import {
  FETCH_FEED_DATA,
  FETCH_FEED_DATA_SUCCEEDED,
  FETCH_FEED_DATA_ERROR,
  UPDATE_FILTERS,
} from "./types";

const initialState = {
  title: "Вахты",
  event_ids: [],
  alias: "shifts",
  data: [],
  meta: {
    count: 0, // total count of records
    limit: 50,
    offset: 0,
    nextPage: 1,
    perPage: 0, // total count of loaded records
    lastId: 0,
  },
  filter: {
    where: {
      department_id: '',
      status: '',
    },
    orWhereGrouped: [
      {
        name: {
          operand: "like",
          pattern: "%T%",
          value: ""
        },
        post_name: {
          operand: "like",
          pattern: "%T%",
          value: ""
        },
      }
    ],
    whereIn: {
    },
    seekString: "",
  },
  dictsRequired: [
    "platforms",
    "api_users",
  ],
  relationships: [
    "head_user",
    "platform",
    "users",
  ],
};

const shiftsReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_FEED_DATA:
      return {
        ...state,
        meta: {
          ...state.meta,
        },
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
          nextPage: ++state.meta.nextPage,
        },
        loading: false,
        error: false,
      };
    case FETCH_FEED_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        ...payload,
        meta: {
          ...state.meta,
          nextPage: 1,
        },
        data: [],
      };
    default:
      return state;
  }
};

export default shiftsReducer;
