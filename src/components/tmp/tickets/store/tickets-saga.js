import {call, put, select, takeEvery} from "redux-saga/effects";
import { fetchFeedDataSuccess, fetchFeedDataError } from "./tickets-actions"
import Api from '@services/api-service'

function* ticketsWatcher() {//console.log(select(tickets))
  yield takeEvery("FETCH_FEED_TICKETS_DATA", fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

    try {
      const data = yield call(() => {
        return Api.get(`/api/ticketsRequests/get/`, {
          query: {
            where: state.tickets.filter.where,
            orWhereGrouped: state.tickets.filter.orWhereGrouped,
            whereIn: state.tickets.filter.whereIn,
            include: state.tickets.relationships,
            page: state.tickets.meta.nextPage,
            limit: state.tickets.meta.limit,
          }
        }).then((res) => res);
      });
      yield put(fetchFeedDataSuccess(data));
    } catch (error) {
      console.log(error);
      yield put(fetchFeedDataError(error));
    }
}

export default ticketsWatcher;