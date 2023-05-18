import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoaderCom from "./components/common/LoaderCom.js";
import OAuth2RedirectPage from "./pages/auth/OAuth2RedirectPage.js";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import LayoutAuthentication from "./layouts/LayoutAuthentication.js";
import LayoutHome from "./layouts/LayoutHome.js";

const RegisterPage = lazy(() => import("./pages/auth/RegisterPage.js"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage.js"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage.js"));

const HomePage = lazy(() => import("./pages/HomePage.js"));

const ErrorPage = lazy(() => import("./pages/ErrorPage.js"));

const CoursePage = lazy(() => import("./pages/course/CoursePage.js"));
const MyCoursePage = lazy(() => import("./pages/course/MyCoursePage.js"));
const CourseDetailPage = lazy(() =>
  import("./pages/course/CourseDetailPage.js")
);
const CreateCoursePage = lazy(() =>
  import("./pages/course/CreateCoursePage.js")
);
const BlogPage = lazy(() => import("./pages/blog/BlogPage.js"));
const BlogDetailsPage = lazy(() => import("./pages/blog/BlogDetailsPage.js"));
const CheckoutPage = lazy(() => import("./pages/checkout/CheckoutPage.js"));

const customStyles = {
  content: {},
};

Modal.setAppElement("#root");
Modal.defaultStyles = {};

function App() {

  return (
    <Suspense fallback={<LoaderCom></LoaderCom>}>
      <Routes>
        <Route element={<LayoutHome></LayoutHome>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/courses" element={<CoursePage></CoursePage>}></Route>
          <Route
            path="/courses/:slug"
            element={<CourseDetailPage></CourseDetailPage>}
          ></Route>
          <Route
            path="/my-courses"
            element={<MyCoursePage></MyCoursePage>}
          ></Route>
          <Route
            path="/checkout/:slug"
            element={<CheckoutPage></CheckoutPage>}
          ></Route>

          {/* ********* Error ********* */}
          <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
          {/* ********* END Error ********* */}
          <Route
            path="/oauth2/redirect"
            element={<OAuth2RedirectPage></OAuth2RedirectPage>}
          ></Route>
          <Route path="/blogs" element={<BlogPage></BlogPage>}></Route>
          <Route
            path="/blogs/:id"
            element={<BlogDetailsPage></BlogDetailsPage>}
          />
          {/* ********* ADMIN ********* */}
          <Route path="/admin" element={<AdminPage></AdminPage>}></Route>
          <Route
            path="/admin/create-course"
            element={<CreateCoursePage></CreateCoursePage>}
          ></Route>
          {/* ******* END ADMIN ******* */}
        </Route>

        {/* ********* Authentication ********* */}
        <Route element={<LayoutAuthentication></LayoutAuthentication>}>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route
            path="/login"
            render
            element={<LoginPage></LoginPage>}
          ></Route>
        </Route>
        {/* ********* END Authentication ********* */}
      </Routes>
    </Suspense>
  );
}

export default App;
