import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions";
import {FETCH_FEED_DATA} from "./types";
import Api from '@services/api-service';

function* faqWatcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {

      //let where = {...state.faq.filter.where};

      return Api.get(`/api/faq/get/`, {
        query: {
          // where: where,
          // whereIn: state.faq.filter.whereIn,
        //  orWhereGrouped: state.faq.filter.orWhereGrouped,
          include: state.faq.relationships,
          page: state.faq.meta.nextPage,
          limit: state.faq.meta.limit,
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

export default faqWatcher;