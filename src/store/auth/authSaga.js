import { takeLatest } from "redux-saga/effects";
import { handleOnLogin } from "./authHandlers";
import { onLogin } from "./authSlice";

/**
 * Saga
 * after declare a Saga, assign into rootSaga
 */
// Step 2: saga Sẽ hứng đc event khi user gọi dispatch tới nó, nó sẽ map event lại sau đó call tới Handlers để xử lý tiếp event onLogin qua hàm handleOnLogin
export default function* authSaga() {
  yield takeLatest(onLogin.type, handleOnLogin);
}
