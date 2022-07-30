import {call, put, select, takeEvery} from "redux-saga/effects";
import { fetchFeedDataSuccess, fetchFeedDataError } from "./reports-actions"
import Api from '@services/api-service'

function* reportsWatcher() {//console.log(select(reports))
  yield takeEvery("FETCH_FEED_REPORTS_DATA", fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

    try {
      const data = yield call(() => {
        return Api.get(`/api/reports/get/`, {
          query: {
            where: state.reports.filter.where,
            whereIn: state.reports.filter.whereIn,
            include: state.reports.relationships,
            page: state.reports.meta.nextPage,
            limit: state.reports.meta.limit,
          }
        }).then((res) => res);
      });
      yield put(fetchFeedDataSuccess(data));
    } catch (error) {
      console.log(error);
      yield put(fetchFeedDataError(error));
    }
}

export default reportsWatcher;