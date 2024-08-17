import { RouteEndpoints } from "../utils/Endpoints";
import { Outlet, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";

function PublicRoute() {
  const  token  = useSelector((state: RootState) => state.auth);
  return token?.token ? (
    <Navigate to={RouteEndpoints.HOME} />
  ) : (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Outlet />
    </Suspense>
  );
}

export default PublicRoute;
