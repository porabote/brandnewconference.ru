const initialState = {
  title: "Акцепт-лист",
  alias: "accept-lists",
  dictsRequired: [
    "api_users",
  ],
  relationships: [
  ],
};

const acceptListsReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    default:
      return state;
  }
};

export default acceptListsReducer;
