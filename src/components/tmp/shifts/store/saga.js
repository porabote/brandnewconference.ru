import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions"
import Api from '@services/api-service';
import { FETCH_FEED_DATA } from "./types";

function* shiftsWatcher() {//console.log(select(spares))
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {
      return Api.get(`/api/shifts/get/`, {
        query: {
          // where: state.shifts.filter.where,
          // orWhereGrouped: state.shifts.filter.orWhereGrouped,
          include: state.shifts.relationships,
          page: state.shifts.meta.nextPage,
          limit: state.shifts.meta.limit,
          // orderBy: {
          //   name: 'ASC'
          // }
        }
      }).then((res) => res);
    });
    yield put(fetchFeedDataSuccess(data));
  } catch (error) {
    yield put(fetchFeedDataError(error));
  }
}

export default shiftsWatcher;