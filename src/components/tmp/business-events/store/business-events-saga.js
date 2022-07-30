import { call, takeEvery, put } from 'redux-saga/effects'
import { fetchFeedDataSuccess, fetchFeedDataError } from "./spares-actions"
import Api from '@services/api-service'

function* sparesWatcher() {//console.log(select(spares))
  yield takeEvery("FETCH_FEED_SPARES_DATA", fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {
    try {
      //console.log(select(spares))
      const data = yield call(() => {
        return Api.get(`/api/spares/get/`, {
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

export default sparesWatcher;