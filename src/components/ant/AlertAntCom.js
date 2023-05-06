import { message } from "antd";
import { useEffect } from "react";
import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import { Button, Divider, Space, notification } from "antd";
import React, { useMemo } from "react";

const AlertAntCom = ({
  type = "success",
  message = "Successfully",
  children = "",
}) => {
  const Context = React.createContext({
    name: "Nofitication Context",
  });
  // const [messageApi, contextHolder] = message.useMessage();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (type === "success") {
      api.success({
        message,
        description: (
          <Context.Consumer>
            {({ name }) => `Hello, ${name} ${children}!`}
          </Context.Consumer>
        ),
        placement: "topRight",
      });
    } else if (type === "error") {
      api.error({
        message,
        description: (
          <Context.Consumer>
            {({ name }) => `Hello, ${name} ${children}!`}
          </Context.Consumer>
        ),
        placement: "topRight",
      });
    } else if (type === "warning") {
      api.warning({
        message,
        description: (
          <Context.Consumer>
            {({ name }) => `Hello, ${name} ${children}!`}
          </Context.Consumer>
        ),
        placement: "topRight",
      });
    }
  }, [type, message, api, children]);

  const contextValue = useMemo(
    () => ({
      name: "Ric Pham",
    }),
    []
  );

  return (
    <Context.Provider value={contextValue}>{contextHolder}</Context.Provider>
  );
};
export default AlertAntCom;
