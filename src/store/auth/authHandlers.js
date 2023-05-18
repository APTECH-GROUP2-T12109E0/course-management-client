import { toast } from "react-toastify";
import { call } from "redux-saga/effects";
import { requestLogin } from "./authRequests";

// Step 4: Sau step2,3 chạy, thì hàm này xử lý tiếp event onLogin, và nhận được action từ step2 trả về là cái payload mới của step1 truyền vào
function* handleOnLogin(action) {
  // Call Api
  try {
    const res = yield call(requestLogin, action.payload);
    if (res.data.type === "success") {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
    console.log("handleOnLogin: ", res);
  } catch (error) {
    toast.error("Something was wrong!");
  }
}

export { handleOnLogin };
