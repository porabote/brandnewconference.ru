import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions";
import {FETCH_FEED_DATA} from "./types";
import Api from '@services/api-service';

function* hashesWatcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {

      let where = {...state.hashes.filter.where};
      delete where.account_id;

      return Api.get(`/api/hashes/get/`, {
        query: {
          // where: where,
          // whereIn: state.hashes.filter.whereIn,
          // orWhereGrouped: state.hashes.filter.orWhereGrouped,
          include: state.hashes.relationships,
          page: state.hashes.meta.nextPage,
          limit: state.hashes.meta.limit,
          orderBy: {
            id: 'DESC'
          }
        }
      }).then((res) => res);
    });
    yield put(fetchFeedDataSuccess(data));
  } catch (error) {
    yield put(fetchFeedDataError(error));
  }
}

export default hashesWatcher;