import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions";
import {FETCH_FEED_DATA} from "./types";
import Api from '@services/api-service';

function* timingsWatcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {

      let where = {...state.timings.filter.where};
      delete where.account_id;

      return Api.get(`/api/timings/get/`, {
        query: {
          // where: where,
          // whereIn: state.timings.filter.whereIn,
          // orWhereGrouped: state.timings.filter.orWhereGrouped,
          include: state.timings.relationships,
          page: state.timings.meta.nextPage,
          limit: state.timings.meta.limit,
          orderBy: {
            id: 'ASC'
          }
        }
      }).then((res) => res);
    });
    yield put(fetchFeedDataSuccess(data));
  } catch (error) {
    yield put(fetchFeedDataError(error));
  }
}

export default timingsWatcher;