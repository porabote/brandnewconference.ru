import { call, takeEvery, put } from 'redux-saga/effects'
import { fetchFeedDataSuccess, fetchFeedDataError } from "./platforms-actions"
import Api from '@services/api-service'

function* platformsWatcher() {
  yield takeEvery("FETCH_FEED_PLATFORMS_DATA", fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {
    try {
      const data = yield call(() => {
        return Api.get(`/api/platforms/get/`, {
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

export default platformsWatcher;