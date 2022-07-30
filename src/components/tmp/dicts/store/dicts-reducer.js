import { REQUEST_DICTS, REQUEST_DICTS_SUCCEEDED, REQUEST_DICTS_ERROR } from "./dicts-types";

const initialState = {
  dicts: {},
  requiredList: [],
  components: {}
};

const dictsReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case REQUEST_DICTS:
      return {
        ...state,
        requiredList: [...new Set([
          ...payload.dictsRequired,
        ])],
      };
    case REQUEST_DICTS_SUCCEEDED:

      let components = state.components;

      components[payload.componentAlias] = true;
      return {
        ...state,
        dicts: {
          ...state.dicts,
          ...payload.data,
        },
        components: {
          ...components,
        },
        error: false,
      };
    case REQUEST_DICTS_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default dictsReducer;
