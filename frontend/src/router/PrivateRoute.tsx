import { Endpoints } from "../utils/Endpoints";
import { Outlet, Navigate } from "react-router-dom";
import { Suspense } from "react";
import MainWrapper from "../Wrappers/MainWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
function PrivateRoute() {
  const token = useSelector((state: RootState) => state.auth);
  return token?.token ? (
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
