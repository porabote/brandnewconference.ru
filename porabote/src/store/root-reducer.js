import { combineReducers } from "redux";
import { modalReducer } from "porabote/modal";
import { confirmReducer } from "porabote/confirm";
import authReducer from "@components/auth/store/auth-reducer";
import dictsReducer from "@components/dicts/store/dicts-reducer";
import faqReducer from "@components/faq/store/reducer";
import filtersReducer from "@components/filters/store/filters-reducer";
import menusReducer from "@components/menus/store/reducer";
import speakersReducer from "@components/speakers/store/reducer";
import usersReducer from "@components/users/store/users-reducer";
import consumersReducer from "@components/consumers/store/consumers-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  dicts: dictsReducer,
  faq: faqReducer,
  filters: filtersReducer,
  menus: menusReducer,
  speakers: speakersReducer,
  users: usersReducer,
  confirm: confirmReducer,
  consumers: consumersReducer,
});

export default rootReducer;
