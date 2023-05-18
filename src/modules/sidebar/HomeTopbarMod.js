import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ButtonCom } from "../../components/button";
import { IconBellCom } from "../../components/icon";
import HomeSearchMod from "../HomeSearchMod";

const HomeTopbarMod = () => {
  const navigate = useNavigate();
  return (
    <div className="topbar flex items-center justify-between mb-8 pl-[14px]">
      <div>
        <Link to="/" className="inline-block">
          <img
            srcSet="/logo192.png"
            className="w-12 h-12"
            alt="Course Management Logo"
          />
        </Link>
      </div>
      <div className="w-full max-w-[458px]">
        <HomeSearchMod></HomeSearchMod>
      </div>

      <div className="flex items-center justify-between gap-x-5">
        <ButtonCom to="/my-courses" className="flex items-center">
          <span className="text-sm font-medium">My Courses</span>
        </ButtonCom>
        <IconBellCom></IconBellCom>
        <img
          srcSet="assets/images/user/default.jpg"
          className="object-cover rounded-full w-12 h-12"
          alt="User Default"
          referrerPolicy="no-referrer"
        />
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
      {/* <div className="flex items-center justify-between gap-x-10 flex-1">
        <img
          srcSet="logo192.png"
          className="w-12 h-12"
          alt="Course Management Logo"
        />
        <div className="w-full max-w-[458px]">
          <HomeSearchMod></HomeSearchMod>
        </div>
      </div>

      <div className="flex items-center gap-x-6 flex-1 justify-end">
        <span className="text-base font-medium text-gray-500">My course</span>
        <IconBellCom></IconBellCom>
        <img srcSet="assets/images/user/default.jpg" className="object-cover rounded-full w-12 h-12" alt="User Default" />
      </div> */}
    </div>
  );
};

export default HomeTopbarMod;
