import {
  FETCH_FEED_PLATFORMS_DATA,
  FETCH_FEED_PLATFORMS_DATA_SUCCEEDED,
  FETCH_FEED_PLATFORMS_DATA_ERROR,
} from "./platforms-types";

const initialState = {
  title: "Площадки/Объекты",
  event_ids: [1, 2, 3],
  alias: "platforms",
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
    "platforms",
    "objects",
  ],
  relationships: [
    "history",
    "objects",
    "objects.parent",
  ],
};

const platformsReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_FEED_PLATFORMS_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FEED_PLATFORMS_DATA_SUCCEEDED:
      return {
        ...state,
        data: [
         // ...state.data,
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
    case FETCH_FEED_PLATFORMS_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default platformsReducer;
