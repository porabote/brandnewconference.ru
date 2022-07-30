import {
  FETCH_FEED_REPORTS_DATA,
  FETCH_FEED_REPORTS_DATA_SUCCEEDED,
  FETCH_FEED_REPORTS_DATA_ERROR
} from './reports-types'

const fetchFeedData = () => {
  return { type: FETCH_FEED_REPORTS_DATA }
};

const fetchFeedDataSuccess = (data) => {
  return { type: FETCH_FEED_REPORTS_DATA_SUCCEEDED, payload: data }
};

const fetchFeedDataError = (error) => {
  return { type: 'FETCH_FEED_REPORTS_DATA_ERROR', payload: error }
};

const updateFeedFilters = (data) => {
  return {
    type: "UPDATE_FILTERS_REPORTS",
    payload: data
  }
}

export { fetchFeedData, fetchFeedDataSuccess, fetchFeedDataError, updateFeedFilters }