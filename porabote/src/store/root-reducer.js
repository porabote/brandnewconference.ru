import { combineReducers } from "redux";
import { modalReducer } from "porabote/modal";
import { confirmReducer } from "porabote/confirm";
import authReducer from "@components/auth/store/auth-reducer";
import dictsReducer from "@components/dicts/store/dicts-reducer";
import hashesReducer from "@components/hashes/store/reducer";
import feedbacksReducer from "@components/feedbacks/store/reducer";
import mailsPatternsReducer from "@components/mails-patterns/store/reducer";
import faqReducer from "@components/faq/store/reducer";
import filtersReducer from "@components/filters/store/filters-reducer";
import menusReducer from "@components/menus/store/reducer";
import questionnairesReducer from "@components/questionnaires/store/reducer";
import partnersReducer from "@components/partners/store/reducer";
import speakersReducer from "@components/speakers/store/reducer";
import timingsReducer from "@components/timings/store/reducer";
import textBoxesReducer from "@components/text-boxes/store/reducer";
import usersReducer from "@components/users/store/users-reducer";
import consumersReducer from "@components/consumers/store/consumers-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  feedbacks: feedbacksReducer,
  hashes: hashesReducer,
  mailsPatterns: mailsPatternsReducer,
  modal: modalReducer,
  dicts: dictsReducer,
  faq: faqReducer,
  filters: filtersReducer,
  menus: menusReducer,
  partners: partnersReducer,
  questionnaires: questionnairesReducer,
  speakers: speakersReducer,
  textBoxes: textBoxesReducer,
  timings: timingsReducer,
  users: usersReducer,
  confirm: confirmReducer,
  consumers: consumersReducer,
});

export default rootReducer;
