import {call, put, select, takeEvery} from "redux-saga/effects";
import { fetchFeedDataSuccess, fetchFeedDataError } from "./actions"
import Api from '@services/api-service'

function* paymentsSetsWatcher() {//console.log(select(paymentsSets))
  yield takeEvery("FETCH_FEED_PAYMENTS_SETS_DATA", fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

    try {
      const data = yield call(() => {
        return Api.get(`/api/payments-sets/get/`, {
          query: {
            where: state.paymentsSets.filter.where,
            orWhereGrouped: state.paymentsSets.filter.orWhereGrouped,
            whereIn: state.paymentsSets.filter.whereIn,
            include: state.paymentsSets.relationships,
            page: state.paymentsSets.meta.nextPage,
            limit: state.paymentsSets.meta.limit,
          }
        }).then((res) => res);
      });
      yield put(fetchFeedDataSuccess(data));
    } catch (error) {
      console.log(error);
      yield put(fetchFeedDataError(error));
    }
}

export default paymentsSetsWatcher;