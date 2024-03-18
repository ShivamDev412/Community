import { WrapperProps } from "@/Types";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RootState } from "@/redux/RootReducer";
import { Backdrop, CircularProgress } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

const MainWrapper: FC<WrapperProps> = ({ children }) => {
  const { loading } = useSelector((state: RootState) => state.loading);
  
  return (
    <div className="flex flex-col min-h-screen">
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <Header />
      <main className="flex-1 overflow-y-auto bg-gray-50 py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainWrapper;
