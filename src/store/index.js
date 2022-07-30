import { compose, applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import sagaMiddleware, { rootWatcher } from "./root-saga";
import rootReducer from "./root-reducer";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(rootWatcher);

export default store;
