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

export { fetchFeedData, fetchFeedDataSuccess, fetchFeedDataError }