import { call, takeEvery, put } from 'redux-saga/effects'
import { fetchFeedDataSuccess, fetchFeedDataError } from "./auth-actions"
import Api from '@services/api-service'

function* authWatcher() {
  //yield takeEvery("CHECK_AUTH", checkAuth);
}

function* fetchFeedDataAsync() {
    // try {
    //   //console.log(select(spares))
    //   const data = yield call(() => {
    //     return Api.get(`/api/spares/get/`, {
    //       query: {
    //         // where: this.props.filter,
    //         // include: this.props.include,
    //         // page: this.props.meta.page
    //       }
    //     }).then((res) => res);
    //   });
    //   yield put(fetchFeedDataSuccess(data));
    // } catch (error) {
    //   yield put(fetchFeedDataError(error));
    // }
}

export default authWatcher;