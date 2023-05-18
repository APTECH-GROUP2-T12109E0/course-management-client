const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    access_token: null,
  },
  reducers: {
    // Step 3: onLogin nhận được action chứa payload từ step1, destructuring action ra sẽ nhận đc payload và type
    onLogin: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { onLogin } = authSlice.actions;
// authReducer
export default authSlice.reducer;
