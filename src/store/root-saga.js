import createSagaMiddleware from "redux-saga";
import { all } from 'redux-saga/effects';
import dictsWatcher from '@components/dicts/store/dicts-saga';

const sagaMiddleware = createSagaMiddleware();

function* rootWatcher() {
  yield all([
    dictsWatcher(),
  ])
}

export default sagaMiddleware;
export { rootWatcher };
