import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions";
import {FETCH_FEED_DATA} from "./types";
import Api from '@services/api-service';

function* menusWatcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {

      let where = {...state.menus.filter.where};
      delete where.account_id;

      return Api.get(`/api/menus/get/`, {
        query: {
          // where: where,
          // whereIn: state.menus.filter.whereIn,
          // orWhereGrouped: state.menus.filter.orWhereGrouped,
          include: state.menus.relationships,
          page: state.menus.meta.nextPage,
          limit: state.menus.meta.limit,
          orderBy: {
            name: 'ASC'
          }
        }
      }).then((res) => res);
    });
    yield put(fetchFeedDataSuccess(data));
  } catch (error) {
    yield put(fetchFeedDataError(error));
  }
}

export default menusWatcher;