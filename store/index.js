import { createStore, combineReducers } from "redux";

import musicReducer from "./music/reducer";

const reducer = combineReducers({
  musicReducer,
});

const store = createStore(reducer /* preloadedState, */);

export default store;
