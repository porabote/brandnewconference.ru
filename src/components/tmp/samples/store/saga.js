import { call, takeEvery, put } from "redux-saga/effects";
import Api from "@services/api-service";
import { fetchFeedDataSuccess, fetchFeedDataError } from "./actions";
import { FETCH_FEED_DATA } from "./types";

function* sampleComponentWatcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {
    try {
      //console.log(select(spares))
      const data = yield call(() => {
        return Api.get(`/api/samples/get/`, {
          query: {
            // where: this.props.filter,
            // include: this.props.include,
            // page: this.props.meta.page
          }
        }).then((res) => res);
      });
      yield put(fetchFeedDataSuccess(data));
    } catch (error) {
      yield put(fetchFeedDataError(error));
    }
}

export default sampleComponentWatcher;