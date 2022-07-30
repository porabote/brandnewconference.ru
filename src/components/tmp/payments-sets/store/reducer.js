import { FETCH_DATA, FETCH_DICTS, UPDATE_FILTERS_PAYMENTS_SETS } from "./types";

const initialState = {
  alias: "paymentsSets",
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
      week: '',
      id: {
        operand: 'like',
        pattern: '%T%',
        value: ''
      }
    },
    whereIn: {
    },
    seekString: "",
  },
  dictsRequired: [
    "objects",
    "users",
    "spares_types",
    "statuses",
  ],
  relationships: [
    "payments"
    // "comments",
    // "files",
    // "history",
    // "user",
    // "equipment",
    // "repairs",
    // "store",
    // "spares_type",
    // "remains",
    // "status",
  ],
};

const paymentsSetsReduser = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case "FETCH_FEED_PAYMENTS_SETS_DATA":
      return {
        ...state,
        meta: {
          ...state.meta,
        },
        loading: true,
      };
    case "FETCH_FEED_PAYMENTS_SETS_DATA_SUCCEEDED":
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
    case "FETCH_FEED_PAYMENTS_SETS_DATA_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default paymentsSetsReduser;
