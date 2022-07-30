import { FETCH_DATA, FETCH_DICTS, UPDATE_FILTERS_TICKETS } from "./tickets-types";

const initialState = {
  title: "Закупка билетов",
  alias: "tickets",
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
      //status_id: [66, 67],
    },
    seekString: ""
  },
  dictsRequired: [
    "users",
    "statuses",
    "cities",
    "shifts",
  ],
  relationships: [
    "city_from",
    "city_to",
    "comments",
    "files",
    "history",
    "user.passport",
    "user.passport_foreign",
    "tickets",
    "status",
    "steps",
  ],
};

const ticketsReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case "FETCH_FEED_TICKETS_DATA":
      return {
        ...state,
        meta: {
          ...state.meta,
        },
        loading: true,
      };
    case "FETCH_FEED_TICKETS_DATA_SUCCEEDED":
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
    case "FETCH_FEED_TICKETS_DATA_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default ticketsReducer;
