import { UPDATE_FILTERS } from "./filters-types";

const initState = {
  equipments: {},
}

const filtersReducer = (state = initState, { type, payload } = {}) => {

  switch (type) {
    case UPDATE_FILTERS:
      console.log(state);
      state[payload.storeAlias] = payload.data;
      console.log(state[payload.storeAlias]);
      console.log(payload.storeAlias)
      return {
        ...state,
      };
    default:
      return state;
  }

}

export default filtersReducer;