// App.js
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import { RouteEndpoints } from "@/utils/Endpoints";
import PrivateRoute from "./PrivateRoute";
const {
  LOGIN,
  SIGNUP,
  HOME,
  YOUR_EVENTS,
  YOUR_GROUPS,
  CREATE_EVENT,
  CREATE_GROUP,
  PROFILE,
  EDIT_PROFILE,
  PROFILE_INFO,
  ACCOUNT_MANAGEMENT,
  CHANGE_PASSWORD
} = RouteEndpoints;
const LoginScreen = lazy(() => import("../screen/Login"));
const SignupScreen = lazy(() => import("../screen/Signup"));
const HomeScreen = lazy(() => import("../screen/Home/Index"));
const YourGroupsScreen = lazy(() => import("../screen/YourGroups"));
const NewGroupScreen = lazy(() => import("../screen/YourGroups/NewGroup"));
const YourEventsScreen = lazy(() => import("../screen/YourEvents"));
const NewEventScreen = lazy(() => import("../screen/YourEvents/NewEvent"));
const ProfileScreen = lazy(() => import("../screen/Profile"));
const EditProfileScreen = lazy(() => import("../screen/Settings/EditProfile"));
const ProfileInfoScreen = lazy(() => import("../screen/Settings/ProfileInfo"));
const AccountManagementScreen = lazy(
  () => import("../screen/Settings/AccountManagement")
);
const ChangePasswordScreen = lazy(() => import("../screen/Settings/ChangePassword"));
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
        <Route path={CHANGE_PASSWORD} element={<ChangePasswordScreen />} />
          <Route
            path={ACCOUNT_MANAGEMENT}
            element={<AccountManagementScreen />}
          />
          <Route path={PROFILE_INFO} element={<ProfileInfoScreen />} />
          <Route path={EDIT_PROFILE} element={<EditProfileScreen />} />
          <Route path={PROFILE} element={<ProfileScreen />} />
          <Route path={YOUR_GROUPS} element={<YourGroupsScreen />} />
          <Route path={CREATE_GROUP} element={<NewGroupScreen />} />
          <Route path={YOUR_EVENTS} element={<YourEventsScreen />} />
          <Route path={CREATE_EVENT} element={<NewEventScreen />} />
          <Route path={HOME} element={<HomeScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
