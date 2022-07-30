import { FETCH_DATA, FETCH_DICTS } from "./spares-types";

const initialState = {
  alias: "spares",
  data: [],
  meta: {
    count: 0,
    limit: 0,
    offset: 0,
    page: 1,
    perPage: 0,
  },
  loading: true,
  filter: {
    where: {
      week: "",
      id: {
        operand: "like",
        pattern: "%T%",
        value: ""
      }
    },
    whereIn: {
    },
    seekString: ""
  },
  dictsRequired: [
    "departments",
    "users",
    "report_types"
  ],
  relationships: [
    "comments",
    "files",
    "history",
    "user",
    "equipments",
    "repairs",
  ],
};

const sparesReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case "FETCH_FEED_SPARES_DATA":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_FEED_SPARES_DATA_SUCCEEDED":
      return {
        ...state,
        data: [
          ...state.data,
          ...payload.data,
        ],
        meta: payload.meta,
        nextPage: ++state.nextPage,
        loading: false,
        error: false,
      };
    case "FETCH_FEED_SPARES_DATA_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default sparesReducer;
