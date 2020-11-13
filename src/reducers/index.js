// # reducers
// handles the data / action calling for redux

"use strict";

// import dependencies
import { combineReducers } from "redux";

// import reducers
import versionReducer from "./version";

// export the reducer
const rootReducer = combineReducers({
  "version": versionReducer
});

export default rootReducer;
