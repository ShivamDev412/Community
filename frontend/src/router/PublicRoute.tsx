import { Endpoints } from "../utils/endpoints";
import { Outlet, Navigate } from "react-router-dom";
import { Suspense } from "react";
import MainWrapper from "../Wrappers/MainWrapper";
import useAuth from "../Hooks/UseAuth";
function PublicRoute() {
  const { isAuth } = useAuth();
  return isAuth ? (
    <Navigate to={Endpoints.HOME} />
  ) : (
    <MainWrapper>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Outlet />
      </Suspense>
    </MainWrapper>
  );
}

export default PublicRoute;
