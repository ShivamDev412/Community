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
  FORGOT_PASSWORD,
  YOUR_GROUPS,
  CREATE_EVENT,
  CREATE_GROUP,
  EDIT_GROUP,
  PROFILE,
  EDIT_PROFILE,
  PROFILE_INFO,
  ACCOUNT_MANAGEMENT,
  CHANGE_PASSWORD,
  INTERESTS,
  GROUP_DETAILS,
  GROUP_DETAILS_MEMBERS,
  GROUP_DETAILS_EVENTS,
  EVENT_DETAILS,
  EDIT_EVENT,
  RESET_PASSWORD,
  GOOGLE_SUCCESS_LOGIN,
  SEARCH,
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
const InterestsScreen = lazy(() => import("../screen/Settings/Interests"));
const ChangePasswordScreen = lazy(
  () => import("../screen/Settings/ChangePassword")
);
const GroupDetailsScreen = lazy(() => import("../screen/GroupDetails"))
const GroupDetailsMembersScreen = lazy(() => import("../screen/GroupDetails/GroupDetailsMembers"))
const GroupDetailsEventsScreen = lazy(() => import("../screen/GroupDetails/GroupDetailsEvents"))
const EventDetailsScreen = lazy(() => import("../screen/EventDetails"))
const ForgotPasswordScreen = lazy(() => import("../screen/ForgotPassword"))
const ResetPasswordScreen = lazy(() => import("../screen/ResetPassword"))
const GoogleSuccessLoginScreen = lazy(() => import("../screen/SocialLoginSuccess"))
const SearchScreen = lazy(() => import("../screen/Search"))
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path={LOGIN} element={<LoginScreen />} />
          <Route path={SIGNUP} element={<SignupScreen />} />
          <Route path={GOOGLE_SUCCESS_LOGIN} element={<GoogleSuccessLoginScreen />} />
          <Route path={FORGOT_PASSWORD} element={<ForgotPasswordScreen />} />
          <Route path={RESET_PASSWORD} element={<ResetPasswordScreen />} />
        </Route>
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path={HOME} element={<HomeScreen />} />
          <Route path={SEARCH} element={<SearchScreen />} />
          <Route path={INTERESTS} element={<InterestsScreen />} />
          <Route path={CHANGE_PASSWORD} element={<ChangePasswordScreen />} />
          <Route
            path={ACCOUNT_MANAGEMENT}
            element={<AccountManagementScreen />}
          />
          <Route path={PROFILE_INFO} element={<ProfileInfoScreen />} />
          <Route path={EDIT_PROFILE} element={<EditProfileScreen />} />
          <Route path={PROFILE} element={<ProfileScreen />} />
          <Route path={YOUR_GROUPS} element={<YourGroupsScreen />} />
          <Route path={EDIT_GROUP} element={<NewGroupScreen />} />
          <Route path={GROUP_DETAILS_MEMBERS} element={<GroupDetailsMembersScreen />} />
          <Route path={GROUP_DETAILS_EVENTS} element={<GroupDetailsEventsScreen />} />
          <Route path={GROUP_DETAILS} element={<GroupDetailsScreen />} />
          <Route path={CREATE_GROUP} element={<NewGroupScreen />} />
          <Route path={EVENT_DETAILS} element={<EventDetailsScreen />} />
          <Route path={YOUR_EVENTS} element={<YourEventsScreen />} />
          <Route path={EDIT_EVENT} element={<NewEventScreen />} />
          <Route path={CREATE_EVENT} element={<NewEventScreen />} />
          <Route path={HOME} element={<HomeScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
