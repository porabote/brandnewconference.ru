import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions";
import {FETCH_FEED_DATA} from "./types";
import Api from '@services/api-service';

function* partnersWatcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {

      let where = {...state.partners.filter.where};
      delete where.account_id;
console.log(where);
      return Api.get(`/api/partners/get/`, {
        query: {
          where: where,
          // whereIn: state.partners.filter.whereIn,
          // orWhereGrouped: state.partners.filter.orWhereGrouped,
          include: state.partners.relationships,
          page: state.partners.meta.nextPage,
          limit: state.partners.meta.limit,
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

export default partnersWatcher;