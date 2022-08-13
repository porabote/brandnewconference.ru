import createSagaMiddleware from "redux-saga";
import { all } from 'redux-saga/effects';
import authWatcher from '@components/auth/store/auth-saga';
import consumersWatcher from '@components/consumers/store/consumers-saga';
import dictsWatcher from '@components/dicts/store/dicts-saga';
import feedbacksWatcher from '@components/feedbacks/store/saga';
import faqWatcher from '@components/faq/store/saga';
import mailsPatternsWatcher from '@components/mails-patterns/store/saga';
import menusWatcher from '@components/menus/store/saga';
import speakersWatcher from '@components/speakers/store/saga';
import usersWatcher from '@components/users/store/users-saga';

const sagaMiddleware = createSagaMiddleware();

function* rootWatcher() {
  yield all([
    authWatcher(),
    dictsWatcher(),
    faqWatcher(),
    feedbacksWatcher(),
    mailsPatternsWatcher(),
    menusWatcher(),
    speakersWatcher(),
    usersWatcher(),
    consumersWatcher(),
  ])
}

export default sagaMiddleware;
export { rootWatcher };
