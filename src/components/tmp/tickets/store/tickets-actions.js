import {
  FETCH_FEED_TICKETS_DATA,
  FETCH_FEED_TICKETS_DATA_SUCCEEDED,
  FETCH_FEED_TICKETS_DATA_ERROR
} from './tickets-types'

const fetchFeedData = () => {
  return { type: FETCH_FEED_TICKETS_DATA }
};

const fetchFeedDataSuccess = (data) => {
  return { type: FETCH_FEED_TICKETS_DATA_SUCCEEDED, payload: data }
};

const fetchFeedDataError = (error) => {
  return { type: 'FETCH_FEED_TICKETS_DATA_ERROR', payload: error }
};

const updateFeedFilters = (data) => {
  return {
    type: "UPDATE_FILTERS_TICKETS",
    payload: data
  }
}

export { fetchFeedData, fetchFeedDataSuccess, fetchFeedDataError, updateFeedFilters }