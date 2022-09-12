import {
  FETCH_FEED_DATA,
  FETCH_FEED_DATA_SUCCEEDED,
  FETCH_FEED_DATA_ERROR,
  UPDATE_FILTERS,
} from "./consumers-types";

const initialState = {
  title: "Участники",
  event_ids: [],
  alias: "consumers",
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
      // department_id: '',
      // status: '',
      // account_id: '',
    },
    orWhereGrouped: [
      {
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
        post_name: {
          operand: "like",
          pattern: "%T%",
          value: ""
        },
        company_name: {
          operand: "like",
          pattern: "%T%",
          value: ""
        },
        user_id: {
          operand: "like",
          pattern: "%T%",
          value: ""
        },
      }
    ],
    whereIn: {
      department_id: [],
    },
    seekString: "",
  },
  dictsRequired: [
    //"statuses",
  ],
  relationships: [
    //"avatar",
  ],
};

const consumersReducer = (state = initialState, { type, payload } = {}) => {
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

export default consumersReducer;
