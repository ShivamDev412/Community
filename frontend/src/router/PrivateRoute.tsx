import { Endpoints } from "../utils/endpoints";
import { Outlet, Navigate } from "react-router-dom";
import { Suspense } from "react";
import MainWrapper from "../Wrappers/MainWrapper";
import useAuth from "../Hooks/UseAuth";
function PrivateRoute() {
  const { isAuth } = useAuth();
  return isAuth ? (
    <MainWrapper>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Outlet />
      </Suspense>
    </MainWrapper>
  ) : (
    <Navigate to={Endpoints.LOGIN} />
  );
}

export default PrivateRoute;
