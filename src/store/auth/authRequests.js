const { default: axiosInstance } = require("../../api/axiosInstance");

export const requestLogin = (data) => {
  return axiosInstance.post("/auth/login", data);
};
