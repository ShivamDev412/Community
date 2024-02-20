// App.js
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import { Endpoints } from "@/utils/Endpoints";
import PrivateRoute from "./PrivateRoute";
const { LOGIN, SIGNUP, HOME } = Endpoints;
const LoginScreen = lazy(() => import("../screen/Login"));
const SignupScreen = lazy(() => import("../screen/Signup"));
const HomeScreen = lazy(() => import("../screen/Home"));
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path={LOGIN} element={<LoginScreen />} />
          <Route path={SIGNUP} element={<SignupScreen />} />
        </Route>
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path={HOME} element={<HomeScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
