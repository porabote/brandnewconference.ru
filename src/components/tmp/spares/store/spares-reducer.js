import { FETCH_DATA, FETCH_DICTS, UPDATE_FILTERS_EQUIPMENTS } from "./spares-types";

const initialState = {
  alias: "spares",
  data: [],
  meta: {
    count: 0, // total count of records
    limit: 50,
    offset: 0,
    nextPage: 1,
    perPage: 0, // total count of loaded records
    lastId: 0,
  },
  loading: true,
  filter: {
    where: {
      store_id: "",
    },
    orWhereGrouped: [
      {
        name: {
          operand: "like",
            pattern: "%T%",
            value: ""
        },
        vendor_code: {
          operand: "like",
            pattern: "%T%",
            value: ""
        },
      }
    ],
    whereIn: {
      status_id: [66, 67],
    },
    seekString: ""
  },
  dictsRequired: [
    "objects",
    "users",
    "spares_types",
    "statuses",
  ],
  relationships: [
    "comments",
    "files",
    "history",
    "user",
    "equipment",
    "repairs",
    "store",
    "spares_type",
    "remains",
    "status",
  ],
};

const sparesReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case "FETCH_FEED_SPARES_DATA":
      return {
        ...state,
        meta: {
          ...state.meta,
        },
        loading: true,
      };
    case "FETCH_FEED_SPARES_DATA_SUCCEEDED":
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
