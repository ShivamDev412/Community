import { RouteEndpoints } from "../utils/Endpoints";
import { Outlet, Navigate } from "react-router-dom";
import { Suspense } from "react";
import useAuth from "../Hooks/useAuth";
function PublicRoute() {
  const { isAuth } = useAuth();
  return isAuth ? (
    <Navigate to={RouteEndpoints.HOME} />
  ) : (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Outlet />
    </Suspense>
  );
}

export default PublicRoute;
