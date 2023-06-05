import { createSelector } from "@reduxjs/toolkit";

const selectUserReducer = (state) => state.auth; //store in rootReducer

export const selectUserId = createSelector(
  [selectUserReducer],
  (authSlice) => authSlice.user.id
);

// export const selectUserIsSuccess = createSelector(
//   [selectUserReducer],
//   (userSlice) => userSlice.isSuccess
// );

// export const selectUserFailed = createSelector(
//   [selectUserReducer],
//   (userSlice) => userSlice.error
// );
