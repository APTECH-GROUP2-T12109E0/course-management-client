import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  IconAdminCom,
  IconAuthorCom,
  IconBlogCom,
  IconCategoryCom,
  IconHomeCom,
  IconLearnCom,
} from "../../components/icon";
import { ALLOWED_ADMIN_MANAGER_EMPLOYEE } from "../../constants/permissions";

const sidebarItems = [
  {
    icon: <IconHomeCom className="mx-auto" />,
    title: "Home",
    url: "/",
  },
  {
    icon: <IconAuthorCom className="mx-auto text-2xl" />,
    title: "Author",
    url: "/authors",
  },
  {
    icon: <IconCategoryCom className="mx-auto" />,
    title: "Cate",
    url: "/categories",
  },
  {
    icon: <IconLearnCom className="mx-auto" />,
    title: "Course",
    url: "/courses",
  },
  {
    icon: <IconBlogCom className="mx-auto" />,
    title: "Blog",
    url: "/blogs",
  },
  {
    icon: <IconAdminCom className="mx-auto" />,
    title: "Admin",
    url: "/admin",
  },
  // {
  //   icon: <IconMoonCom className="mx-auto" />,
  //   title: "Mode",
  //   url: "/mode",
  //   onClick: () => {},
  // },
];

const HomeSidebarMod = () => {
  const { user } = useSelector((state) => state.auth);

  const [isScrolled, setIsScrolled] = useState(false);
  const navLinkClass =
    "tw-transition-all text-center block p-3 rounded-xl last:mt-auto last:shadow-primary bg-tw-light text-tw-primary hover:text-tw-light-pink bg-transparent";

  useEffect(() => {
    function handleScroll() {
      const sidebar = document.querySelector(".sidebar");
      if (!sidebar) return;
      const { top } = sidebar.getBoundingClientRect();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const actualTop = top + scrollY;
      if (actualTop > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="sidebar-hidden w-full md:w-[76px]"></div>
      <div
        className={`${
          isScrolled
            ? "sidebar fixed animate-slide-in w-full md:w-[76px] rounded-3xl bg-tw-light shadow-2xl text-center text-xs flex flex-col flex-shrink-0 bg-transparent z-10"
            : "sidebar fixed w-full md:w-[76px] rounded-3xl bg-tw-light shadow-primary text-center text-xs flex flex-col flex-shrink-0 bg-transparent z-10"
        }`}
      >
        {sidebarItems.map((item) => {
          if (item.url === "/admin") {
            if (user && ALLOWED_ADMIN_MANAGER_EMPLOYEE.includes(user.role)) {
              return (
                <NavLink
                  key={item.title}
                  className={({ isActive }) =>
                    isActive
                      ? `active ${navLinkClass} bg-gray-200 !text-tw-light-pink`
                      : navLinkClass
                  }
                  to={item.url}
                >
                  <span>{item.icon}</span>
                  <div className="mt-1">{item.title}</div>
                </NavLink>
              );
            }
          } else {
            return (
              <NavLink
                key={item.title}
                className={({ isActive }) =>
                  isActive
                    ? `active ${navLinkClass} bg-gray-200 !text-tw-light-pink`
                    : navLinkClass
                }
                to={item.url}
              >
                <span>{item.icon}</span>
                <div className="mt-1">{item.title}</div>
              </NavLink>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default HomeSidebarMod;
