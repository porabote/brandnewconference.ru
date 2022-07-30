import {
  FETCH_FEED_PLATFORMS_DATA,
  FETCH_FEED_PLATFORMS_DATA_SUCCEEDED,
  FETCH_FEED_PLATFORMS_DATA_ERROR
} from './platforms-types'

const fetchFeedData = () => {
  return { type: FETCH_FEED_PLATFORMS_DATA }
};

const fetchFeedDataSuccess = (data) => {
  return { type: FETCH_FEED_PLATFORMS_DATA_SUCCEEDED, payload: data }
};

const fetchFeedDataError = (error) => {
  return { type: 'FETCH_FEED_PLATFORMS_DATA_ERROR', payload: error }
};

export { fetchFeedData, fetchFeedDataSuccess, fetchFeedDataError }