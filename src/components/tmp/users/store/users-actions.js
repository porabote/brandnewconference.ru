import {
  FETCH_FEED_USERS_DATA,
  FETCH_FEED_USERS_DATA_SUCCEEDED,
  FETCH_FEED_USERS_DATA_ERROR
} from './users-types'

const fetchFeedData = () => {
  return { type: FETCH_FEED_USERS_DATA }
};

const fetchFeedDataSuccess = (data) => {
  return { type: FETCH_FEED_USERS_DATA_SUCCEEDED, payload: data }
};

const fetchFeedDataError = (error) => {
  return { type: 'FETCH_FEED_USERS_DATA_ERROR', payload: error }
};

const updateFeedFilters = (data) => {
  return {
    type: "UPDATE_FILTERS_USERS",
    payload: data
  }
}

export { fetchFeedData, fetchFeedDataSuccess, fetchFeedDataError, updateFeedFilters }