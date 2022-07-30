import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions";
import {FETCH_FEED_DATA} from "./types";
import Api from '@services/api-service';

function* speakersWatcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {

      //let where = {...state.speakers.filter.where};

      return Api.get(`/api/speakers/get/`, {
        query: {
          // where: where,
          // whereIn: state.speakers.filter.whereIn,
          orWhereGrouped: state.speakers.filter.orWhereGrouped,
          include: state.speakers.relationships,
          page: state.speakers.meta.nextPage,
          limit: state.speakers.meta.limit,
          orderBy: {
            name: 'ASC'
          }
        }
      }).then((res) => res);
    });
    yield put(fetchFeedDataSuccess(data));
  } catch (error) {
    yield put(fetchFeedDataError(error));
  }
}

export default speakersWatcher;