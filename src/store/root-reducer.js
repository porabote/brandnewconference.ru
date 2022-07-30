import { combineReducers } from "redux";
import { modalReducer } from "@components/common/modal";
import { confirmReducer } from "porabote/confirm";

const rootReducer = combineReducers({
  modal: modalReducer,
  confirm: confirmReducer,
});

export default rootReducer;
