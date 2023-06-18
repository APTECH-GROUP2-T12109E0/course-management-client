import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import {
  MESSAGE_FORGET_PASSWORD_SUCCESS,
  MESSAGE_GENERAL_FAILED,
} from "../../constants/config";
import { removeToken, setToken } from "../../utils/auth";
import { showMessageError } from "../../utils/helper";
import {
  requestForgetPassword,
  requestGetUser,
  requestLogin,
  requestRefreshToken,
  requestRegister,
  requestResetPassword,
} from "./authRequests";
import {
  onLoading,
  onLoginSuccess,
  onResetPasswordSuccess,
  onUpdateUserToken,
} from "./authSlice";

/**
 * *** Handler ***
 */
function* handleOnRegister(action) {
  try {
    const res = yield call(requestRegister, action.payload);
    if (res.data.type === "success") {
      toast.success(res.data.message);
    } else if (res.data.type === "warning") {
      toast.warning(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    showMessageError(error);
  }
}

function* handleOnLogin(action) {
  try {
    yield put(onLoading(true));
    const res = yield call(requestLogin, action.payload);
    if (res.data.type === "success") {
      yield put(onLoginSuccess(true));
      if (res.data.access_token && res.data.refresh_token) {
        setToken(res.data.access_token, res.data.refresh_token);
        yield call(handleOnGetUser, { payload: res.data.access_token });
      }
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    showMessageError(error);
  } finally {
    yield put(onLoading(false));
  }
}

function* handleOnGetUser({ payload: access_token }) {
  try {
    const res = yield call(requestGetUser, access_token);
    if (res.data.type === "success") {
      yield put(
        onUpdateUserToken({
          user: res.data,
          access_token,
        })
      );
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleOnRefreshToken(action) {
  try {
    const res = yield call(requestRefreshToken, action.payload);
    if (res.data.type === "success") {
      setToken(res.data.access_token, res.data.refresh_token);
      yield call(handleOnGetUser, { payload: res.data.access_token });
    } else {
      yield call(handleOnRemoveToken());
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleOnRemoveToken() {
  yield put(
    onUpdateUserToken({
      user: undefined,
      access_token: null,
    })
  );
  removeToken();
}

function* handleOnForgetPassword({ payload }) {
  try {
    yield put(onLoading(true));
    const res = yield call(requestForgetPassword, payload.email);
    if (res.status === 200) {
      toast.success(MESSAGE_FORGET_PASSWORD_SUCCESS, {
        autoClose: 10000,
      });
    } else {
      toast.error(MESSAGE_GENERAL_FAILED);
    }
  } catch (error) {
    showMessageError(error);
  } finally {
    yield put(onLoading(false));
  }
}

function* handleOnResetPassword({ payload }) {
  try {
    yield put(onLoading(true));
    const res = yield call(requestResetPassword, payload);
    if (res.data.type === "success") {
      toast.success(res.data.message);
      yield put(onResetPasswordSuccess(true));
    } else {
      toast.error(MESSAGE_GENERAL_FAILED);
    }
  } catch (error) {
    showMessageError(error);
  } finally {
    yield put(onLoading(false));
  }
}

export {
  handleOnRegister,
  handleOnLogin,
  handleOnGetUser,
  handleOnRefreshToken,
  handleOnRemoveToken,
  handleOnForgetPassword,
  handleOnResetPassword,
};
