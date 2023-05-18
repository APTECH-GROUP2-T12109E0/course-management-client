import authReducer from "./auth/authSlice";

/**
 * **** Reducer ****
 */
const { combineReducers } = require("@reduxjs/toolkit");
export const rootReducer = combineReducers({
  auth: authReducer,
});