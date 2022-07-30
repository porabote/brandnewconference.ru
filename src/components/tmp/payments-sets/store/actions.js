import {
  FETCH_FEED_PAYMENTS_SETS_DATA,
  FETCH_FEED_PAYMENTS_SETS_DATA_SUCCEEDED,
  FETCH_FEED_PAYMENTS_SETS_DATA_ERROR
} from './types'

const fetchFeedData = () => {
  return { type: FETCH_FEED_PAYMENTS_SETS_DATA }
};

const fetchFeedDataSuccess = (data) => {
  return { type: FETCH_FEED_PAYMENTS_SETS_DATA_SUCCEEDED, payload: data }
};

const fetchFeedDataError = (error) => {
  return { type: 'FETCH_FEED_PAYMENTS_SETS_DATA_ERROR', payload: error }
};

const updateFeedFilters = (data) => {
  return {
    type: "UPDATE_FILTERS_PAYMENTS_SETS",
    payload: data
  }
}

export { fetchFeedData, fetchFeedDataSuccess, fetchFeedDataError, updateFeedFilters }