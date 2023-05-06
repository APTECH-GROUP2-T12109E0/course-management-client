import { useEffect } from "react";
import { notification } from "antd";
import React from "react";

const AlertAntCom = ({
  type = "success",
  message = "Successfully",
}) => {
  const Context = React.createContext({
    name: "Nofitication Context",
  });
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (type === "success") {
      api.success({
        message,
        placement: "topRight",
      });
    } else if (type === "error") {
      api.error({
        message,
        placement: "topRight",
      });
    } else if (type === "warning") {
      api.warning({
        message,
        placement: "topRight",
      });
    }
  }, [type, message, api]);

  return (
    <Context.Provider>{contextHolder}</Context.Provider>
  );
};
export default AlertAntCom;
