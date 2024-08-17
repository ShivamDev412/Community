import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Drawer } from "@mui/material";
import LogoSection from "./LogoSection";
import CloseIcon from "@mui/icons-material/Close";
import { ResponsiveMenu } from "@/utils/Constant";
import { Link } from "react-router-dom";
import SearchSection from "../HeaderSearch";
import { useUserQuery } from "@/redux/slice/api/userSlice";
const ResponsiveHeader = () => {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const drawerClose = () => {
    setOpen(false);
  };
  const drawerOpen = () => {
    setOpen(true);
  };
  const handleSearch = () => {
    setOpenSearch(!openSearch);
  };
  const { data: user } = useUserQuery("");
  return (
    <div
      className={`border-b border-gray-200  ${
        openSearch ? "h-[130px]" : "h-[70px] overflow-auto"
      } transition-all duration-300`}
    >
      <div className="p-4 bg-white flex justify-between items-center mx-auto z-50 ">
        <MenuIcon
          className="h-[2rem] w-[2rem] hover:cursor-pointer"
          onClick={drawerOpen}
        />
        <Drawer open={open} onClose={drawerClose}>
          <div className="w-screen flex flex-col h-screen">
            <button className="flex justify-end  p-3">
              <CloseIcon onClick={drawerClose} className="h-10 w-10" />
            </button>
            <div className="flex flex-col justify-between flex-1">
              <div className="flex gap-4 flex-col mt-5  p-3">
                {ResponsiveMenu.map((item) => {
                  const { id, Logo, title, path } = item;
                  return (
                    <div key={id} className="flex gap-2 items-center">
                      {Logo && <Logo className="h-8 w-8 fill-gray-700" />}
                      <Link to={path} className="text-[1.3rem]">
                        {title}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center p-4 bg-slate-100">
                <div className="flex gap-2 items-center">
                  <Avatar className="bg-primary">{`${
                    user?.data?.name?.split(" ")[0]?.split("")[0]
                  }${user?.data?.name?.split(" ")[1]?.split("")[0]}`}</Avatar>
                  <div>
                    <p className="font-bold text-[1.2rem]">{user?.data.name}</p>
                    <button className="text-[1.1rem]">Your Profile</button>
                  </div>
                </div>
                <button className="text-[1.1rem] font-semibold">Log Out</button>
              </div>
            </div>
          </div>
        </Drawer>
        <LogoSection />
        <button onClick={handleSearch}>
          {" "}
          <SearchIcon className="h-[2rem] w-[2rem]" />
        </button>
      </div>

      <div
        className={`px-4 pb-3 ${
          openSearch ? "opacity-100" : "opacity-0"
        } transition-all duration-200`}
      >
        <SearchSection />
      </div>
    </div>
  );
};

export default ResponsiveHeader;
