import React from "react";
import { Outlet } from "react-router-dom";
import { FooterMod } from "../modules/footer";
import { HomeSidebarMod, HomeTopbarMod } from "../modules/sidebar";

const LayoutHome = () => {
  return (
    // <div className="layout-home px-10 py-6 bg-tw-light text-black min-h-screen">
    <>
      <div className="px-10 py-6 bg-tw-light text-black min-h-screen">
        <HomeTopbarMod></HomeTopbarMod>
        <div className="flex gap-x-10 items-start">
          <HomeSidebarMod></HomeSidebarMod>
          <div className="w-full xl:max-w-[1080px] 2xl:max-w-full mx-auto">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <FooterMod />
    </>
  );
};

export default LayoutHome;
