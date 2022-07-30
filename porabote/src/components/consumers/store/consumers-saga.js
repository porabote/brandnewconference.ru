import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./consumers-actions"
import Api from '@services/api-service'

function* consumersWatcher() {//console.log(select(spares))
  yield takeEvery("FETCH_FEED_CONSUMERS_DATA", fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {

      let where = {...state.consumers.filter.where};
      delete where.account_id;

      return Api.get(`/api/consumers/get/`, {
        query: {
          where: where,
        //  whereIn: state.consumers.filter.whereIn,
          orWhereGrouped: state.consumers.filter.orWhereGrouped,
          include: state.consumers.relationships,
          page: state.consumers.meta.nextPage,
          limit: state.consumers.meta.limit,
          orderBy: {
            id: 'DESC'
          }
        }
      }).then((res) => res);
    });
    yield put(fetchFeedDataSuccess(data));
  } catch (error) {
    yield put(fetchFeedDataError(error));
  }
}

export default consumersWatcher;