import {
  FETCH_FEED_USERS_DATA,
  FETCH_FEED_USERS_DATA_SUCCEEDED,
  FETCH_FEED_USERS_DATA_ERROR,
  UPDATE_FILTERS_USERS,
} from "./users-types";

const initialState = {
  title: "Пользователи",
  event_ids: [],
  alias: "users",
  data: [],
  meta: {
    count: 0, // total count of records
    limit: 20,
    offset: 0,
    nextPage: 1,
    perPage: 0, // total count of loaded records
    lastId: 0,
  },
  filter: {
    orWhere: {
      name: {
        operand: "like",
        pattern: "%T%",
        value: ""
      },
      last_name: {
        operand: "like",
        pattern: "%T%",
        value: ""
      },
    },
    whereIn: {
    },
    seekString: "",
  },
  dictsRequired: [
    "departments"
  ],
  relationships: [
  ],
};

const usersReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case "FETCH_FEED_USERS_DATA":
      return {
        ...state,
        meta: {
          ...state.meta,
        },
        loading: true,
      };
    case "FETCH_FEED_USERS_DATA_SUCCEEDED":
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
    case "FETCH_FEED_USERS_DATA_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_FILTERS_USERS:
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

export default usersReducer;
