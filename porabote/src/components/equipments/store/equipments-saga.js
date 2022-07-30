import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataError, fetchFeedDataSuccess} from "./equipments-actions"
import Api from '@services/api-service'

function* equipmentsWatcher() {
  yield takeEvery("FETCH_FEED_EQUIPMENTS_DATA", fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {

    const data = yield call(() => {

    return Api.get(`/api/equipments/get/`, {
      query: {
        where: state.equipments.filter.where,
        include: state.equipments.relationships,
        page: state.equipments.meta.nextPage,
        limit: state.equipments.meta.limit,
        // whereIn: state.filters.equipments.whereIn,
      }
    }).then((res) => res);
    });
    yield put(fetchFeedDataSuccess(data));
  } catch (error) {console.log(error);
    yield put(fetchFeedDataError(error));
  }
}

export default equipmentsWatcher;