import Cookies from "js-cookie";
import { COOKIE_EXPIRED_BLOG_DAYS, COOKIE_VIEW_COUNT_KEY } from "../constants/config";


const objBlogCookies = {
  expires: COOKIE_EXPIRED_BLOG_DAYS,
  domain: process.env.REACT_APP_COOKIE_DOMAIN,
};


export const setBlogViewCount = (blogId, view_count) => {
  if (view_count) {
    const viewCountObjString = Cookies.get(COOKIE_VIEW_COUNT_KEY);
    console.log("COOKIE_VIEW_COUNT_KEY",COOKIE_VIEW_COUNT_KEY)
    let viewCountObj = {};
    if (viewCountObjString) {
      viewCountObj = JSON.parse(viewCountObjString);
    }console.log("viewCountObj",viewCountObj);
    console.log("viewCountObjString",viewCountObjString)
    if (!viewCountObj[blogId]) {
      viewCountObj[blogId] = true;
      Cookies.set(COOKIE_VIEW_COUNT_KEY, JSON.stringify(viewCountObj), {
        ...objBlogCookies,
      });
    }
  } else {
    Cookies.remove(COOKIE_VIEW_COUNT_KEY, {
      ...objBlogCookies,
      path: "/",
      domain: process.env.REACT_APP_COOKIE_DOMAIN,
    });
  }
};

export const getBlogViewCount = (blogId) => {
  const viewCountObjString = Cookies.get(COOKIE_VIEW_COUNT_KEY);
  if (viewCountObjString) {
    const viewCountObj = JSON.parse(viewCountObjString);
    return viewCountObj[blogId] || 0;
  }
  return 0;
};

export const removeBlogViewCount = () => {
  if (Cookies.get(COOKIE_VIEW_COUNT_KEY)) {
    Cookies.remove(COOKIE_VIEW_COUNT_KEY, {
      ...objBlogCookies,
      path: "/",
      domain: process.env.REACT_APP_COOKIE_DOMAIN,
    });
  }
};
