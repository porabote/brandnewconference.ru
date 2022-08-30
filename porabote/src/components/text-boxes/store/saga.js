import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions";
import {FETCH_FEED_DATA} from "./types";
import Api from '@services/api-service';

function* textBoxesWatcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {

      let where = {...state.textBoxes.filter.where};
      delete where.account_id;

      return Api.get(`/api/text-boxes/get/`, {
        query: {
          // where: where,
          // whereIn: state.textBoxes.filter.whereIn,
          // orWhereGrouped: state.textBoxes.filter.orWhereGrouped,
          include: state.textBoxes.relationships,
          page: state.textBoxes.meta.nextPage,
          limit: state.textBoxes.meta.limit,
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

export default textBoxesWatcher;