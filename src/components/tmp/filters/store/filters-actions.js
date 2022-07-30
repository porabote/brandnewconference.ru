export const updateFeedFilters = (data, storeAlias) => {
  return {
    type: "UPDATE_FILTERS",
    payload: {
      data,
      storeAlias
    }
  }
}