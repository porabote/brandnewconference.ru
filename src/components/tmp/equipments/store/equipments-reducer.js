import {
  FETCH_FEED_EQUIPMENTS_DATA,
  FETCH_FEED_EQUIPMENTS_DATA_SUCCEEDED,
  FETCH_FEED_EQUIPMENTS_DATA_ERROR,
  UPDATE_FILTERS_EQUIPMENTS,
} from "./equipments-types";

const initialState = {
  title: "Оборудование",
  event_ids: [1, 2, 3],
  alias: "equipments",
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
      name: {
        operand: "like",
        pattern: "%T%",
        value: ""
      }
    },
    // whereIn: {
    // },
    seekString: ""
  },
  dictsRequired: [
    "organizations_own",
    "platforms",
    "objects",
    "equipments_types",
    "statuses",
    "users",
  ],
  relationships: [
    "organizations_own",
    "platform",
    "object",
    "hole",
    "comments",
    "files",
    "history",
    "user",
    "type",
    "status",
    "status_reason",
    "equipment_accidents",
    "equipment_repairs",
    "equipment_repairs.user",
    "equipment_repairs.doer",
    "equipment_repairs.spares",
    "equipment_repairs.spares.spare",
    "equipment_repairs.spares.spare.store",
  ],
};

const equipmentsReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_FEED_EQUIPMENTS_DATA:
      return {
        ...state,
        meta: {
          ...state.meta,
        },
        loading: true,
      };
    case FETCH_FEED_EQUIPMENTS_DATA_SUCCEEDED:
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
    case FETCH_FEED_EQUIPMENTS_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_FILTERS_EQUIPMENTS:
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

export default equipmentsReducer;
