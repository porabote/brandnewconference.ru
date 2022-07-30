import {call, put, select, takeEvery} from "redux-saga/effects";
import { fetchFeedDataSuccess, fetchFeedDataError } from "./spares-actions"
import Api from '@services/api-service'

function* sparesWatcher() {//console.log(select(spares))
  yield takeEvery("FETCH_FEED_SPARES_DATA", fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

    try {
      const data = yield call(() => {
        return Api.get(`/api/spares/get/`, {
          query: {
            where: state.spares.filter.where,
            orWhereGrouped: state.spares.filter.orWhereGrouped,
            whereIn: state.spares.filter.whereIn,
            include: state.spares.relationships,
            page: state.spares.meta.nextPage,
            limit: state.spares.meta.limit,
          }
        }).then((res) => res);
      });
      yield put(fetchFeedDataSuccess(data));
    } catch (error) {
      console.log(error);
      yield put(fetchFeedDataError(error));
    }
}

export default sparesWatcher;