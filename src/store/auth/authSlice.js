const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  user: null,
  email: null,
  token: null,
  access_token: null,
  isLoading: false,
  isLoginSuccess: false,
  isRegisterSuccess: false,
  isResetPasswordSuccess: false,
  isUserChangePasswordSuccess: false,
  errorMessage: null,
  roles: [],
  permissions: [],
};
const authSlice = createSlice({
  name: "auth",
  initialState: { ...initialState },
  reducers: {
    onAuthInitialState: (state, action) => ({
      ...initialState,
    }),
    onLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    onLoginSuccess: (state, action) => ({
      ...state,
      isLoginSuccess: action.payload,
    }),
    onLogin: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    onRegister: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    onRegisterSuccess: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    onUpdateUserToken: (state, action) => ({
      ...state,
      user: action.payload.user,
      access_token: action.payload.access_token,
    }),
    onGetUser: (state, action) => ({
      ...state,
      access_token: action.payload,
    }),
    onRefreshToken: (state, action) => ({
      ...state,
      access_token: action.payload,
    }),
    onRemoveToken: (state, action) => ({
      ...initialState,
    }),
    onLoginOAuthStart: (state, action) => ({
      ...state,
      isLoading: true,
      errorMessage: undefined,
    }),
    onLoginOAuthSuccess: (state, action) => ({
      ...state,
      isLoginSuccess: true,
      isLoading: false,
      errorMessage: undefined,
    }),
    onLoginOAuthFailed: (state, action) => ({
      ...state,
      isLoginSuccess: false,
      isLoading: false,
      errorMessage: action.payload,
    }),
    onForgetPassword: (state, action) => ({
      ...state,
      email: action.payload.email,
    }),
    onResetPassword: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    onResetPasswordSuccess: (state, action) => ({
      ...state,
      isResetPasswordSuccess: action.payload,
    }),
    onUserChangePassword: (state, action) => ({
      ...state,
      isUserChangePasswordSuccess: false,
      isLoading: true,
    }),
    onUserChangePasswordSuccess: (state, action) => ({
      ...state,
      isUserChangePasswordSuccess: action.payload,
      isLoading: false,
    }),
    onUserUpdateProfile: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    onUserUpdateNoti: (state, action) => ({
      ...state,
    }),
    onLoadRole: (state, action) => ({
      ...state,
    }),
    onLoadRoleSuccess: (state, action) => ({
      ...state,
      roles: action.payload,
    }),
    onLoadPermission: (state, action) => ({
      ...state,
    }),
    onLoadPermissionSuccess: (state, action) => ({
      ...state,
      permissions: action.payload,
    }),
    onUpdatePermission: (state, action) => state,
    onUpdatePermissionSuccess: (state, action) => state,
  },
});

export const {
  onAuthInitialState,
  onLoading,
  onLoginSuccess,
  onLogin,
  onRegister,
  onRegisterSuccess,
  onUpdateUserToken,
  onGetUser,
  onRefreshToken,
  onRemoveToken,
  onLoginOAuthStart,
  onLoginOAuthSuccess,
  onLoginOAuthFailed,
  onForgetPassword,
  onResetPassword,
  onResetPasswordSuccess,
  onUserChangePassword,
  onUserChangePasswordSuccess,
  onUserUpdateProfile,
  onUserUpdateNoti,
  onLoadRole,
  onLoadRoleSuccess,
  onLoadPermission,
  onLoadPermissionSuccess,
  onUpdatePermission,
} = authSlice.actions;
// reducer
export default authSlice.reducer;
