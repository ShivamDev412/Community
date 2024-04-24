import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, MenuItem } from "@mui/material";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuDataProps } from "@/Types";
import { RouteEndpoints } from "@/utils/Endpoints";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/RootReducer";
import { useHeader } from "./useHeader";

const MenuData: FC<MenuDataProps> = ({ menu, link, setShowDropdown }) => {
  return (
    <MenuItem className="px-6 hover:bg-white hover:text-primary text-gray-600">
      <Link to={link} onClick={() => setShowDropdown(false)} className="w-full">
        {menu}
      </Link>
    </MenuItem>
  );
};
const ProfileSection = () => {
  const { name, image } = useSelector((state: RootState) => state.user);
  const { logoutHandler } = useHeader();
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div>
      <Dropdown open={showDropdown}>
        <MenuButton>
          {image ? (
            <Avatar
              alt={`${name}_profile_picture`}
              src={image}
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-[3rem] w-[3rem]"
            />
          ) : (
            <Avatar
              className="bg-primary h-[3rem] w-[3rem]"
              onClick={() => setShowDropdown(!showDropdown)}
            >{`${name?.split(" ")[0]?.split("")[0]}${
              name?.split(" ")[1]?.split("")[0]
            }`}</Avatar>
          )}
        </MenuButton>
        <Menu className="bg-white rounded-lg border w-[2in] shadow-md py-3 z-10">
          <MenuData
            menu="Your Groups"
            link={RouteEndpoints.YOUR_GROUPS}
            setShowDropdown={setShowDropdown}
          />
          <MenuData
            menu="Your Events"
            link={RouteEndpoints.YOUR_EVENTS}
            setShowDropdown={setShowDropdown}
          />
          <div className="w-full h-[1px] bg-slate-200 my-2"></div>
          <MenuData
            menu="Profile"
            link={RouteEndpoints.PROFILE}
            setShowDropdown={setShowDropdown}
          />
          <MenuData
            menu="Settings"
            link={RouteEndpoints.EDIT_PROFILE}
            setShowDropdown={setShowDropdown}
          />
          <MenuItem
            className="px-6 hover:bg-white hover:text-primary text-gray-600"
            onClick={logoutHandler}
          >
            <p>Logout</p>
          </MenuItem>
        </Menu>
      </Dropdown>
    </div>
  );
};

export default ProfileSection;
