import { FETCH_DATA, FETCH_DICTS, UPDATE_FILTERS_REPORTS } from "./reports-types";

const initialState = {
  alias: "reports",
  data: [],
  meta: {
    count: 0, // total count of records
    limit: 20,
    offset: 0,
    nextPage: 1,
    perPage: 0, // total count of loaded records
    lastId: 0,
  },
  loading: true,
  filter: {
    where: {
      object_id: '',
      type_id: ''
    },
    seekString: ''
  },
  dictsRequired: [
    "departments",
    "report_types",
    "objects",
    "users",
  ],
  relationships: [
    "comments",
    "files",
    "history",
    "user",
    "departments",
    "types",
    "object",
  ],
};

const reportsReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case "FETCH_FEED_REPORTS_DATA":
      return {
        ...state,
        meta: {
          ...state.meta,
        },
        loading: true,
      };
    case "FETCH_FEED_REPORTS_DATA_SUCCEEDED":
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
    case "FETCH_FEED_REPORTS_DATA_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}

export default reportsReducer