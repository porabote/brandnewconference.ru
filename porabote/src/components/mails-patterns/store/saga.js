import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions";
import {FETCH_FEED_DATA} from "./types";
import Api from '@services/api-service';

function* mailsPatternsWatcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {

      //let where = {...state.mails.filter.where};

      return Api.get(`/api/mails-patterns/get/`, {
        query: {
          // where: where,
          // whereIn: state.mails.filter.whereIn,
          orWhereGrouped: state.mailsPatterns.filter.orWhereGrouped,
       //   include: state.mails.relationships,
          page: state.mailsPatterns.meta.nextPage,
          limit: state.mailsPatterns.meta.limit,
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

export default mailsPatternsWatcher;