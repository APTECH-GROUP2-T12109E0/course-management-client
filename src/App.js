import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoaderCom from "./components/common/LoaderCom.js";
import LayoutAuthentication from "./layouts/LayoutAuthentication.js";
import LayoutHome from "./layouts/LayoutHome.js";

const RegisterPage = lazy(() => import("./pages/auth/RegisterPage.js"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage.js"));

const HomePage = lazy(() => import("./pages/HomePage.js"));
const CoursePage = lazy(() => import("./pages/course/CoursePage.js"));
const MyCoursePage = lazy(() => import("./pages/course/MyCoursePage.js"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage.js"));
const CreateCoursePage = lazy(() =>
  import("./pages/course/CreateCoursePage.js")
);

function App() {
  return (
    <Suspense fallback={<LoaderCom></LoaderCom>}>
      <Routes>
        <Route element={<LayoutHome></LayoutHome>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/courses" element={<CoursePage></CoursePage>}></Route>
          <Route
            path="/my-courses"
            element={<MyCoursePage></MyCoursePage>}
          ></Route>

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
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          {/* Backup */}
        </Route>
        {/* ********* END Authentication ********* */}
      </Routes>
    </Suspense>
  );
}

export default App;
