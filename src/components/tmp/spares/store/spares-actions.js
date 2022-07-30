import {
  FETCH_FEED_SPARES_DATA,
  FETCH_FEED_SPARES_DATA_SUCCEEDED,
  FETCH_FEED_SPARES_DATA_ERROR
} from './spares-types'

const fetchFeedData = () => {
  return { type: FETCH_FEED_SPARES_DATA }
};

const fetchFeedDataSuccess = (data) => {
  return { type: FETCH_FEED_SPARES_DATA_SUCCEEDED, payload: data }
};

const fetchFeedDataError = (error) => {
  return { type: 'FETCH_FEED_SPARES_DATA_ERROR', payload: error }
};

const updateFeedFilters = (data) => {
  return {
    type: "UPDATE_FILTERS_SPARES",
    payload: data
  }
}

export { fetchFeedData, fetchFeedDataSuccess, fetchFeedDataError, updateFeedFilters }