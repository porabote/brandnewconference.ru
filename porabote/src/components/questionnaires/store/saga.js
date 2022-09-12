import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions";
import {FETCH_FEED_DATA} from "./types";
import Api from '@services/api-service';

function* questionnairesWatcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {

      let where = {...state.questionnaires.filter.where};
      delete where.account_id;

      return Api.get(`/api/questionnaires/get/`, {
        query: {
         // where: where,
          // whereIn: state.questionnaires.filter.whereIn,
          // orWhereGrouped: state.questionnaires.filter.orWhereGrouped,
          include: state.questionnaires.relationships,
          page: state.questionnaires.meta.nextPage,
          limit: state.questionnaires.meta.limit,
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

export default questionnairesWatcher;