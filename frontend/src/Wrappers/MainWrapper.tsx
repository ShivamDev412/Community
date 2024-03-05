import { WrapperProps } from "@/Types";
import Header from "@/components/Header";
import { RootState } from "@/redux/RootReducer";
import { Backdrop, CircularProgress } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

const MainWrapper: FC<WrapperProps> = ({ children }) => {
  const { loading } = useSelector((state: RootState) => state.loading);
  return (
    <div className="flex flex-col justify-between h-screen overflow-x-hidden">
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <Header />
      <main className="font-display flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainWrapper;
