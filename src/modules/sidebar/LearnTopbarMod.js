import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ButtonCom } from "../../components/button";
import {
  IconLoginCom,
  IconLogoutCom,
  IconRegisterCom,
  IconUserCom,
} from "../../components/icon";
import NotificationListPopup from "../../components/mui/NotificationListPopup";
import { onRemoveToken } from "../../store/auth/authSlice";
import {
  onAddNotification,
  onCourseInitalState,
} from "../../store/course/courseSlice";
import { BASE_API_URL } from "../../constants/config";

const LearnTopbarMod = () => {
  const { user } = useSelector((state) => state.auth);
  const { progress } = useSelector((state) => state.course);

  const userName = user?.email.split("@")[0];
  const userItems = [
    {
      icon: <IconUserCom />,
      title: "Profile",
      url: `/profile/${userName}`,
    },
    {
      icon: <IconRegisterCom />,
      title: "Register",
      url: "/register",
    },
    {
      icon: <IconLoginCom />,
      title: "Log in",
      url: "/login",
    },
    {
      icon: <IconLogoutCom />,
      title: "Log out",
      url: "/logout",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    let url = BASE_API_URL + "/push-notifications/" + user.id;
    const sse = new EventSource(url);

    sse.addEventListener("user-list-event", (event) => {
      const data = JSON.parse(event.data);
      dispatch(onAddNotification(data));
    });

    sse.onerror = () => {
      sse.close();
    };
    return () => {
      sse.close();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="topbar flex items-center justify-between mb-8">
      <div>
        <Link to="/" className="inline-block">
          <img
            srcSet="/logo_click_thumb_light.png"
            className="w-12 h-12"
            alt="Click and Learn Logo"
          />
        </Link>
      </div>
      <div className="flex items-center justify-between gap-x-5">
        {progress ? <p>Progress: {progress}%</p> : <p>Progress: 0%</p>}
        <ButtonCom to="/my-courses" className="flex items-center">
          <span className="text-sm font-medium">My Coursess</span>
        </ButtonCom>
        <NotificationListPopup />

        <ul className="nav-menus">
          <li className="profile-nav onhover-dropdown p-0 me-0 relative">
            <div className="profile-nav-bridge absolute h-5 -bottom-2 w-full"></div>
            <div className="media profile-media gap-x-2">
              <img
                className="object-cover rounded-full w-12 h-12"
                src={`${
                  user
                    ? user.image ??
                      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                }`}
                alt="User Avatar"
              />
              {/* https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg */}
              <div className="media-body flex-1">
                <span className="text-tw-primary font-medium font-tw-third">
                  {user ? user.name : "Welcome"}
                </span>
                <p className="mb-0 font-roboto flex items-center gap-x-2">
                  {user ? user.role : "Guest"}
                  <i className="middle fa fa-angle-down flex-1"></i>
                </p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div active top-14 w-36">
              {userItems.map((item, index) => {
                // If user is login, exclude "/register" and "/login" URLs
                if (
                  user &&
                  (item.url === "/register" || item.url === "/login")
                ) {
                  return null;
                }
                // If user is not login, exclude "/logout" URL
                if (
                  !user &&
                  (item.url === "/logout" || item.url.includes("/profile"))
                ) {
                  return null;
                }
                const rest =
                  item.url === "/logout"
                    ? {
                        onClick: () => {
                          dispatch(onRemoveToken());
                          dispatch(onCourseInitalState());
                        },
                      }
                    : {};

                return (
                  <UserItems
                    key={item.title}
                    url={item.url}
                    title={item.title}
                    icon={item.icon}
                    {...rest}
                  ></UserItems>
                );
              })}
              {/* <UserItems url={`/profile/${user.email}`} title="Profile"></UserItems>
              <UserItems url={`/logout`} title="Logout" icon={}></UserItems> */}
            </ul>
          </li>
        </ul>
        {/*
        <IconBellCom></IconBellCom>
        <img
          srcSet="assets/images/user/default.jpg"
          className="object-cover rounded-full w-12 h-12"
          alt="User Default"
          referrerPolicy="no-referrer"
        />
        <button onClick={() => navigate("/login")}>Login</button> */}
      </div>
    </div>
  );
};

const UserItems = ({
  url = "/",
  title = "",
  icon = <IconUserCom />,
  ...rest
}) => {
  return (
    <li>
      <Link
        to={url}
        className="flex items-center gap-x-2 py-2 px-3 hover:border-l-8  hover:border-tw-primary duration-200 transition-all hover:bg-tw-light hover:text-tw-primary"
        {...rest}
      >
        {icon}
        <span className="flex-1">{title}</span>
      </Link>
    </li>
  );
};

export default LearnTopbarMod;
